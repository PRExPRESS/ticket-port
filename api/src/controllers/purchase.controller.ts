import { Request, Response } from 'express';
import PurchaseService from "../services/purchase.service";
import paymentService from '../services/payment.service';

//qr and canvas
import QRCode from 'qrcode';
import { createCanvas, loadImage } from 'canvas';
import fs, { stat } from 'fs';

import path from 'path';
import ticketService from '../services/ticket.service';

import userService from '../services/user.service';
import { paymentVerificationEmail } from '../utils/emailTemplates';
import sendMail from '../utils/sendMail';
import purchaseService from '../services/purchase.service';

export const generateSecretCode = (code: string): string => {
    console.log('fn called: ', code);
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let secretCode = code; // Start with the provided code

    // Append random characters to make the total length 15
    for (let i = code.length; i < 15; i++) {
        secretCode += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    const timestamp = Date.now(); // Gets the current timestamp in milliseconds
    secretCode += timestamp.toString();
    return secretCode;  // The final secret code will be 15 characters long
}


interface MergeOptions {
    ticketPath: string;   // Path to the ticket image
    qrCodeText: string;   // Text to be encoded in the QR code
    qrCodeSize: number;   // Size of the QR code
    logoPath: string;     // Path to the logo to place in the QR code
    outputPath: string;   // Path to save the final merged image
    qrPosition: { x: number, y: number }; // Position to place the QR code on the ticket
}
class PurchaseController {

    //create purchase
    public createPurchase = async (req: Request, res: Response): Promise<void> => {
        try {
            const data = req.body;
            let totalPrice = 0;
            let user_Id = null;

            if (!Array.isArray(data)) {
                console.log("Data is not an array");
                res.status(400).json({ error: "Data not an Array" });
                return;
            }

            // Loop through each item to generate secret code and modify the data
            const purchases = data.map(item => {
                const secret_code = generateSecretCode(item.code);

                // Ensure item.price is a number
                const itemPrice = parseFloat(item.price);

                if (isNaN(itemPrice)) {
                    throw new Error(`Invalid price for item ${item.item}`);
                }

                totalPrice += itemPrice;
                user_Id = item.user_id;

                return {
                    ...item,
                    secret_code,
                    status: 'pending'
                };
            });

            // Create payment
            const payment = await paymentService.create({
                user_id: user_Id,
                amount: totalPrice,
                status: 'pending',
                path: ''
            });

            const paymentId = payment.id;

            //update purchases array
            const updatedPurchases = purchases.map((purchase: any) => {
                purchase.payment_id = paymentId;
                return purchase;
            });

            // Perform bulk purchase creation
            const createdPurchases = await PurchaseService.createPurchase(updatedPurchases);

            if (!createdPurchases || createdPurchases.length === 0 || !payment) {
                console.log("Failed to create purchases");
                res.status(400).json({ error: "Failed to create purchases" });
                return;
            }

            res.status(201).json({ message: "Purchases created successfully", createdPurchases });

        } catch (error: any) {
            res.status(500).json({ error: error.message });
            console.log(error);
        }
    };

    //get all purchases
    public async getAllPurchases(req: Request, res: Response): Promise<void> {
        try {
            const purchases = await PurchaseService.getAllPurchases();
            if (!purchases) {
                res.status(400).json({ message: "Invalid purchases" });
                return;
            }
            res.status(200).json(purchases);

        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    //get purchase by status
    public async getPurchaseByStatus(req: Request, res: Response): Promise<void> {
        try {
            const status = req.params.status;
            const purchase = await PurchaseService.getPurchaseByStatus(status);
            if (!purchase) {
                res.status(400).json({ message: "Invalid purchase" });
                return;
            }
            res.status(200).json(purchase);

        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    //get purchase by id
    public async getPurchaseById(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const purchase = await PurchaseService.getPurchaseById(+id);
            if (!purchase) {
                res.status(400).json({ message: "Invalid purchase" });
                return;
            }
            res.status(200).json(purchase);

        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    //verify purchase
    public verifyPurchase = async (req: Request, res: Response): Promise<void> => {
        try {
            const paymentId = req.params.id;
            const status = 'verified';

            // Fetch all purchases related to the payment
            const purchases = await PurchaseService.getPurchaseByPaymentId(+paymentId) || [];
            //console.log(purchases);
            if (purchases.length === 0) {
                res.status(400).json({ message: "Invalid purchases" });
                return;
            }

            //get the user
            const user = await userService.getUserById(purchases[0].user_id);
            if (!user) {
                res.status(400).json({ message: "Invalid user" });
                return;
            }


            // Iterate over each purchase
            for (let i = 0; i < purchases.length; i++) {
                let ticket: any;
                ticket = await ticketService.getTicketById(+purchases[i].ticket_id);

                const secretCode = purchases[i].secret_code;
                const options: MergeOptions = {
                    ticketPath: path.join(__dirname, `../assets/template/${ticket.path}`),      // Path to ticket image
                    qrCodeText: secretCode,                             // QR code content
                    qrCodeSize: 250,                                               // QR code size in pixels
                    logoPath: path.join(__dirname, '../assets/logo/logo.png'),     // Path to logo image
                    outputPath: path.join(__dirname, `../assets/qrcodes/${secretCode}.png`),  // Output path
                    qrPosition: { x: 450, y: 25 }                                  // Position on the ticket (top-left corner of QR)
                };

                // Generate QR code
                const qr = this.generateQrCode(options);
                if (!qr) {
                    console.log("Error generating QR code");
                    res.status(500).json({ message: "Error generating QR code" });
                    return;
                }
                console.log('QR code generated for purchase:', purchases[i].id);

            }
            // Update purchase status
            const updatedPurchase = await PurchaseService.changeStatus(+paymentId, status);
            if (!updatedPurchase) {
                res.status(400).json({ message: "Purchase validation failed" });
                return;
            }

            // After all purchases are processed, update the payment status
            const updatePayment = await paymentService.verifyPayment(+paymentId);
            if (!updatePayment) {
                res.status(400).json({ message: "Payment verification failed" });
                return;
            }

            //send Email
            const fromEmail = 'enigma@besthub.me';
            const toEmail = user.email;
            const subject: string = 'Payment Verified';
            const htmlContent = paymentVerificationEmail(user.name)
            const emailResponse = await sendMail(fromEmail, toEmail, subject, htmlContent);
            if (!emailResponse) {
                res.status(400).json({ message: "Email sending failed" });
                return;
            }

            // Send response after all iterations
            res.status(200).json('All purchases and payment verified successfully');

        } catch (error: any) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    };

    //get purchase by secret code
    public async getPurchaseBySecreteCode(req: Request, res: Response): Promise<void> {
        try {
            const code = req.params.code;
            const purchase = await PurchaseService.getPurchaseBySecreteCode(code);
            if (!purchase) {
                res.status(404).json({ message: "Invalid secret code" });
                return;
            }
            res.status(200).json(purchase);
        }
        catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }


    //update status by id
    public async updateStatusById(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const status = req.body.status;
            const purchase = await PurchaseService.updateStatusById(+id, status);
            console.log(purchase);
            if (!purchase) {
                res.status(400).json({ message: "Invalid purchase" });
                return;
            }
            res.status(200).json(purchase);

        } catch (error: any) {
            console.log(error);
            res.status(500).json({ message: error.message });

        }
    }


    //delete purchase
    public async deletePurchase(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const purchase = await PurchaseService.deletePurchase(+id);
            if (!purchase) {
                res.status(400).json({ message: "Invalid purchase" });
                return;
            }
            res.status(204).json();

        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }


    }

    //get purchase by user id
    public async getPurchaseByUserId(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const purchase = await PurchaseService.getPurchaseByUserId(+id);
            if (!purchase) {
                res.status(404).json({ message: "Invalid user id" });
                return;
            }
            res.status(200).json(purchase);
        }
        catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    //dashboard indicators
    public async getDashboardIndicators(req: Request, res: Response): Promise<void> {
        try {
            const totalPurchases = await PurchaseService.getPurchasesCount();
            const totalVerifiedPurchases = await PurchaseService.getVerifiedPurchasesCount();
            const totalRevenue = await PurchaseService.getTotalVerifiedPurchasesAmount();
            const totalPending = await PurchaseService.getTotalPendingPurchases();

            res.status(200).json({
                totalPurchases: totalPurchases,
                totalVerifiedPurchases: totalVerifiedPurchases,
                totalRevenue: totalRevenue,
                totalPending: totalPending
            });
        }
        catch (error: any) {
            res.status(500).json({ message: error.message });
            console.log(error);
            return
        }
    }

    //generate ticket at the gate
    public atTheGatePurchase = async (req: Request, res: Response): Promise<void> => {
        try {
            
            console.log(req.body);
            const { name, email, role, nic, phone, ticketId } = req.body;
            const isEmailExists = await userService.getUserByEmail(email);
            //get ticket by id
            const ticket = await ticketService.getTicketById(ticketId);
            if (!ticket) {
                res.status(404).json({ message: "Invalid ticket" });
                return;
            }
            const secretCode = generateSecretCode(nic);

            const options: MergeOptions = {
                ticketPath: path.join(__dirname, `../assets/template/${ticket.path}`),      // Path to ticket image
                qrCodeText: secretCode,                             // QR code content
                qrCodeSize: 250,                                               // QR code size in pixels
                logoPath: path.join(__dirname, '../assets/logo/logo.png'),     // Path to logo image
                outputPath: path.join(__dirname, `../assets/qrcodes/${secretCode}.png`),  // Output path
                qrPosition: { x: 450, y: 25 }                                  // Position on the ticket (top-left corner of QR)
            };

            let userId;

            
            if (!isEmailExists) {
                const newUser = await userService.createUser({ name, email, password:'123456', role:'client', code: nic, phone });
                if (!newUser) {
                    res.status(400).json({ message: "Invalid user data" });
                    return;
                }
                userId = newUser.id;
                
                
            }else{

                userId = isEmailExists.id;
                
            }
            // Generate QR code
            const qr = this.generateQrCode(options);
            if (!qr) {
                console.log("Error generating QR code");
                res.status(500).json({ message: "Error generating QR code" });
                return;
            }
            //create paymet
            const payment = await paymentService.create({
                user_id: userId,
                amount: ticket.price,
                status: 'approved',
                path:''
                
            })
            //create purchase
            const purchase = await purchaseService.createPurchase([{ 
                user_id: userId, 
                ticket_id: ticketId, 
                secret_code: secretCode,
                code: nic,
                price: ticket.price,
                payment_id: payment.id,
                status: 'pending'
            }]);
            console.log('purchase',purchase);
            if (!purchase) {
                res.status(400).json({ message: "New purchase creation failed" });
                return;
            }

            //send Email
            const fromEmail = 'enigma@besthub.me';
            const toEmail = email;
            const subject: string = 'Payment Verified';
            const htmlContent = paymentVerificationEmail(name)
            const emailResponse = await sendMail(fromEmail, toEmail, subject, htmlContent);
            if (!emailResponse) {
                res.status(400).json({ message: "Email sending failed" });
                return;
            }

            // Send response after all iterations
            res.status(200).json({path: `${process.env.BASE_URL}/api/download/ticket/${secretCode}`});

        } catch (error: any) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    };

    // generate qr code for any payload
    public generateQrCodeForPayload = async (req: Request, res: Response): Promise<void> => {
        try {
            const { payload, size, title } = req.body;
            const outputDir = path.join(__dirname, '../assets/qrcodes');
            // Ensure the output directory exists, create if it doesn't
            if (!fs.existsSync(outputDir)) {
              fs.mkdirSync(outputDir, { recursive: true });
            }
        
            // Ensure file name has .png extension
            const outputFile = path.join(outputDir, `${title}.png`);
        
            // Generate and save QR code as a PNG file with size and color options
            await QRCode.toFile(outputFile, payload, {
              width: size, // Set the size of the QR code
              color: {
                dark: '#000000',  // Dark color (default black)
                light: '#ffffff'  // Light color (default white)
              }
            });
        
            console.log(`QR Code saved at: ${outputFile}`);
            res.status(200).json({ message: 'QR Code generated successfully',url: `${process.env.BASE_URL}/api/download/ticket/${title}` });
          } catch (error) {
            console.error('Error generating and saving QR code:', error);
            res.status(500).json({ message: 'Error generating and saving QR code' });
          }
    }




    //generate secret code as private fn




    //generate qr code
    private generateQrCode = async ({ ticketPath, qrCodeText, qrCodeSize, logoPath, outputPath, qrPosition }: MergeOptions) => {
        try {
            // Load the ticket image
            const ticket = await loadImage(ticketPath);

            // Create a canvas based on the ticket image size
            const canvas = createCanvas(ticket.width, ticket.height);
            const ctx = canvas.getContext('2d');

            // Draw the ticket image onto the canvas
            ctx.drawImage(ticket, 0, 0);

            // Generate the QR code with the logo on a separate canvas
            const qrCanvas = createCanvas(qrCodeSize, qrCodeSize);
            const qrCtx = qrCanvas.getContext('2d');
            await QRCode.toCanvas(qrCanvas, qrCodeText, {
                width: qrCodeSize,
                margin: 0 // No margin
            });

            // Load the logo image
            const logo = await loadImage(logoPath);

            // Calculate the logo's size and position in the QR code (e.g., 20% of QR code size)
            const logoSize = qrCodeSize * 0.1;
            const logoX = (qrCodeSize - logoSize) / 2;
            const logoY = (qrCodeSize - logoSize) / 2;

            // Draw a white circle in the middle of the QR code to ensure the logo is clear
            qrCtx.beginPath();
            qrCtx.arc(qrCodeSize / 2, qrCodeSize / 2, logoSize * 0.9, 0, Math.PI * 2, false); // White circle for logo
            qrCtx.fillStyle = 'white';
            qrCtx.fill();
            qrCtx.closePath();

            // Draw the logo at the center of the QR code
            qrCtx.drawImage(logo, logoX, logoY, logoSize, logoSize);

            // Draw the QR code (with logo) onto the ticket image at the specified position
            ctx.drawImage(qrCanvas, qrPosition.x, qrPosition.y, qrCodeSize, qrCodeSize);

            // Save the final image to the specified output path
            const buffer = canvas.toBuffer('image/png');
            fs.writeFileSync(outputPath, buffer);

            console.log('Ticket merged with QR code and logo, saved to:', outputPath);
        } catch (err) {
            console.error('Error merging ticket with QR code and logo:', err);
        }
    };





}

export default new PurchaseController();