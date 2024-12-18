import { Router } from "express";
import { authenticateToken } from "../middlewares/auth.middleware";
import paymentController from "../controllers/payment.controller";
import { uploadFile2 as uploadMiddleware } from "../middlewares/upload.middleware";

const PaymentRouter = Router();

PaymentRouter.route("/").post(authenticateToken, paymentController.createPayment).get(authenticateToken, paymentController.getAllPayments);
PaymentRouter.route("/:id").get(authenticateToken, paymentController.getPaymentById).put(authenticateToken,uploadMiddleware, paymentController.updatePayment).delete(authenticateToken, paymentController.deletePayment);
PaymentRouter.route("/unpaid/:id").get(authenticateToken, paymentController.getUnpaidPaymentByUserId);

export default PaymentRouter;