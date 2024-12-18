import { Router } from 'express';
import PurchaseController from '../controllers/purchase.controller';
import {authenticateToken} from "../middlewares/auth.middleware";
import{uploadFile2 as uploadMiddleware} from "../middlewares/upload.middleware";

const PurchaseRouter = Router();

PurchaseRouter.route('/dashboard').get(authenticateToken, PurchaseController.getDashboardIndicators);
PurchaseRouter.route('/').post(authenticateToken, PurchaseController.createPurchase).get(PurchaseController.getAllPurchases);
PurchaseRouter.route('/:id').get(authenticateToken, PurchaseController.getPurchaseById).delete(authenticateToken, PurchaseController.deletePurchase);
PurchaseRouter.route('/verify/:id').put(authenticateToken,uploadMiddleware, PurchaseController.verifyPurchase);
PurchaseRouter.route('/user/:id').get(authenticateToken, PurchaseController.getPurchaseByUserId);
PurchaseRouter.route('/scan/:code').get(authenticateToken, PurchaseController.getPurchaseBySecreteCode);
PurchaseRouter.route('/status/:id').put(authenticateToken, PurchaseController.updateStatusById);
PurchaseRouter.route('/at-the-gate').post(PurchaseController.atTheGatePurchase);
PurchaseRouter.route('/generate-qr').post(PurchaseController.generateQrCodeForPayload);

export default PurchaseRouter;