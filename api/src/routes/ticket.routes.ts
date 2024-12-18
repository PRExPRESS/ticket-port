import { Router } from "express";
import TicketController from "../controllers/ticket.controller";
import { authenticateToken } from "../middlewares/auth.middleware";
import {uploadFile as uploadMiddleware} from "../middlewares/upload.middleware";

const TicketRouter = Router();

TicketRouter.route("/").get(TicketController.getAllTickets).post(authenticateToken,uploadMiddleware,TicketController.createTicket);
TicketRouter.route("/:id").get(authenticateToken,TicketController.getTicketById).put(authenticateToken,uploadMiddleware,TicketController.updateTicket).delete(authenticateToken,TicketController.deleteTicket);

export default TicketRouter