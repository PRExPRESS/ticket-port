import { Request, Response } from "express";
import eventTicketService from "../services/eventTicket.service";

class EventTicketController {
    public async getAllTickets(req: Request, res: Response): Promise<void> {
        try {
            const tickets = await eventTicketService.getAllTickets();
            res.status(200).json(tickets);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async getTicketById(req: Request, res: Response): Promise<void> {
        try {
            const ticket = await eventTicketService.getTicketById(+req.params.id);
            if (!ticket) {
                res.status(400).json({ message: "Invalid ticket" });
                return;
            }
            res.status(200).json(ticket);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async createTicket(req: Request, res: Response): Promise<void> {
        try {
           
            const ticket = await eventTicketService.createTicket(req.body);
            res.status(201).json({ message: "Ticket created" });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async updateTicket(req: Request, res: Response): Promise<void> {
        try {
            const ticket = await eventTicketService.updateTicket(+req.params.id, req.body);
            res.status(200).json({ message: "Ticket updated" });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async deleteTicket(req: Request, res: Response): Promise<void> {
        try {
            await eventTicketService.deleteTicket(+req.params.id);
            res.status(204).json();
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default new EventTicketController();