import { Router } from "express";
import { authenticateToken } from "../middlewares/auth.middleware";
import eventTicketController from "../controllers/eventTicket.controller";

const EventRouter = Router();

EventRouter.route("/").get(authenticateToken, eventTicketController.getAllTickets).post(authenticateToken, eventTicketController.createTicket);

EventRouter.route("/:id").get(authenticateToken, eventTicketController.getTicketById).delete(authenticateToken, eventTicketController.deleteTicket);

export default EventRouter;