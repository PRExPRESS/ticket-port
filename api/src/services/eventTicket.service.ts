
import EventTicket from "../models/eventTicket.model";
class EventTicketService {

    public async createTicket(data: any) {  
        return EventTicket.create(data);
    }

    public async getTicketById(id: number) {
        return EventTicket.findByPk(id);
    }

    public async getAllTickets() {
        return EventTicket.findAll();
    }

    public async deleteTicket(id: number) {
        const ticket = await EventTicket.findByPk(id);
        if(!ticket) return;
        await ticket.destroy();
    }

    public async updateTicket(id: number, data: any) {
        const ticket = await EventTicket.findByPk(id);
        if(!ticket) return; 
        return ticket.update(data);
    }
}

export default new EventTicketService();