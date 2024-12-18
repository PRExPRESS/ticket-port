
import Ticket from "../models/ticket.model";
class TicketService {

    public async createTicket(data: any) {  
        return Ticket.bulkCreate(data);
    }

    public async getTicketById(id: number) {
        return Ticket.findByPk(id);
    }

    public async getAllTickets() {
        return Ticket.findAll();
    }

    public async deleteTicket(id: number) {
        const ticket = await Ticket.findByPk(id);
        if(!ticket) return;
        await ticket.destroy();
    }

    public async updateTicket(id: number, data: any) {
        const ticket = await Ticket.findByPk(id);
        if(!ticket) return; 
        return ticket.update(data);
    }
}

export default new TicketService();