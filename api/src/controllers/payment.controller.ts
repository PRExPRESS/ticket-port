import { Request, Response } from 'express';
import paymentService from "../services/payment.service";
import path from 'path';
import fs from 'fs';
import { AdminPaymentNotification } from '../utils/emailTemplates';
import sendMailMulti from '../utils/sendMailMulti';

class PaymentController {
    //create payment
    public async createPayment(req: Request, res: Response) {
        try {
            const payment = await paymentService.create(req.body);
            res.status(201).json({message: "Payment created"});
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    //get all payments
    public async getAllPayments(req: Request, res: Response) {
        try {
            const payments = await paymentService.getAllPayments();
            res.status(200).json(payments);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    //get payment by id
    public async getPaymentById(req: Request, res: Response) {
        try {
            const payment = await paymentService.getPaymentById(+req.params.id);
            if (!payment) {
                res.status(400).json({ message: "Invalid payment" });
                return;
            }
            let base64Image = '';
            const imgPath = path.join(__dirname, '../assets/payments/', payment.path  );
            console.log('imgPath: ', imgPath);
            fs.readFile(imgPath, (err: any, data: any) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: 'Failed to read image file' });
                    return;
                }
                // Convert image to base64
                base64Image = `data:image/png;base64,${data.toString('base64')}`;
                

                // Return ticket data along with the base64-encoded image
                

                if (!payment) {
                    res.status(400).json({ message: "Invalid payment" });
                    return;
                }
                res.status(200).json({...payment.toJSON(), slip: base64Image});
                return;
            })
        } catch (error: any) {
            res.status(500).json({ error: error.message });
            return;
        }
    }

    //update payment
    public async updatePayment(req: Request, res: Response) {
        const { id } = req.params;
        const{user_id} = req.body;
        if (!req.file) {
            res.status(400).json({ error: 'Please upload an image file.' });
            return;
        }
        const path = req.file.filename;
        try {
            const payment = await paymentService.updatePayment(+id,+user_id, { path,status:'paid' });
            
            //send email for admins
            const fromEmail = 'hitsmf@besthub.me';
            const toEmail = ['sudarshanamadu299@gmail.com','withanagethilan2001@gmail.com','tharindumahesh45@gmail.com','nethminichandrasiri99@gmail.com'];
            const subject: string = 'Payment Confirmation';
            const link: string = 'https://hitsmf.besthub.me/admin/payment/'+id;
            const htmlContent: string = AdminPaymentNotification(link);
            const emailResponse = await sendMailMulti(fromEmail, toEmail, subject, htmlContent);
            res.status(200).json({ message: "Payment updated" });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    //delete payment
    public async deletePayment(req: Request, res: Response) {
        try {
            await paymentService.deletePayment(+req.params.id);
            res.status(204).json();
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    //get all unpaid payments by user id
    public async getUnpaidPaymentByUserId(req: Request, res: Response) {
        try {
            const payments = await paymentService.getUnpaidPaymentByUserId(+req.params.id);
            res.status(200).json(payments);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default new PaymentController();