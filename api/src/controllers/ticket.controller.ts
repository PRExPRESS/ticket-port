import { Request, Response } from "express";
import ticketService from "../services/ticket.service";
import purchaseService from "../services/purchase.service";
import path from 'path';
import fs from 'fs';

class TicketController {
    public async getAllTickets(req: Request, res: Response): Promise<void> {
        try {
            const tickets = await ticketService.getAllTickets();

            if (!tickets || tickets.length === 0) {
                res.status(400).json({ message: "Invalid tickets" });
                return;
            }

            const ticketsWithPurchases = await Promise.all(
                tickets.map(async (ticket) => {
                    const purchase = await purchaseService.getPurchaseByTicketId(ticket.id);

                    // Calculate remaining tickets
                    const remaining = ticket.qty - (purchase ? purchase.length : 0);

                    // Return the plain object with the remaining count
                    return { ...ticket.toJSON(), remaining };
                })
            );

            res.status(200).json(ticketsWithPurchases);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }



    public async createTicket(req: Request, res: Response): Promise<void> {
        try {
            // Check if a file was uploaded
            if (!req.file) {
                res.status(400).json({ error: 'Please upload an image file.' });
                return;
            }

            // Access the unique file name from multer
            const imagePath = req.file.filename;

            // Create a new ticket using the provided data and the image path
            const ticketData = {
                type: req.body.type,
                price: req.body.price,
                qty: req.body.qty,
                path: imagePath
            };

            const ticket = await ticketService.createTicket(ticketData);
            res.status(201).json({ message: "Ticket created" });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    //get ticket by id
    public async getTicketById(req: Request, res: Response): Promise<void> {
        try {
            const ticket = await ticketService.getTicketById(+req.params.id);
            if (!ticket) {
                res.status(400).json({ message: "Invalid ticket" });
                return;
            }
            const imgPath = path.join(__dirname, '../assets/template/', ticket.path);
            console.log('imgPath: ', imgPath);
            fs.readFile(imgPath, (err: any, data: any) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: 'Failed to read image file' });
                    return;
                }
                // Convert image to base64
                const base64Image = `data:image/png;base64,${data.toString('base64')}`;

                // Return ticket data along with the base64-encoded image
                res.status(200).json({
                    ...ticket.toJSON(), // Convert Sequelize model to plain object
                    image: base64Image
                });

            })
            
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async deleteTicket(req: Request, res: Response): Promise<void> {
        try {
            await ticketService.deleteTicket(+req.params.id);
            res.status(204).json();
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async updateTicket(req: Request, res: Response): Promise<void> {

        try {
            console.log(req.body);
            const {type, price, qty} = req.body;
            // Check if a file was uploaded
            if (!req.file) {
                const ticket = await ticketService.updateTicket(+req.params.id, req.body);
                res.status(200).json({ message: "Ticket updated" });
                return;
            }else{
                const filename = req.file.filename;
                const ticket = await ticketService.updateTicket(+req.params.id, {type, price, qty, path:filename});
                res.status(200).json({ message: "Ticket updated" });
                return;
            }

        } catch (error: any) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }
}

export default new TicketController();
