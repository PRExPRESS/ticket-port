import { Router } from 'express';
import UserController from '../controllers/user.controller';
import { UserCreateSchema, loginUserSchema } from '../validations/user.validation';
import {authenticateToken} from "../middlewares/auth.middleware";

const UserRouter = Router();

UserRouter.route('/').get(authenticateToken,UserController.getAllUsers).post(UserCreateSchema, UserController.createUser);

UserRouter.route('/login').post(loginUserSchema, UserController.login);

UserRouter.route('/:id').get(authenticateToken,UserController.getUserById).put(authenticateToken,UserCreateSchema, UserController.updateUser).delete(authenticateToken,UserController.deleteUser);
UserRouter.route('/verify/:id').get(UserController.verifyUser);
export default UserRouter;
