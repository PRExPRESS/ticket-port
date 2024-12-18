import { Request, Response } from "express";
import UserService from "../services/user.service";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import sendMail from "../utils/sendMail";
import { verificationEmail } from "../utils/emailTemplates";
import path from "path";


interface LoggedUserAttributes {
    userId: number;
    username: string;
    roles: string;
    code: string;
    token: string;

}

class UserController {

    private secret = 'Enigma@ESkulls';

    constructor() {
        // Ensure JWT_SECRET is loaded
        this.secret = process.env.JWT_SECRET as string;
        //console.log("JWT_SECRET: ", process.env.JWT_SECRET);

        if (!this.secret) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }
    }
    //create user
    public async createUser(req: Request, res: Response): Promise<void> {
        const secret = process.env.JWT_SECRET as string;
        try {
            const { name, email, password, role, nic, phone } = req.body;
            const isEmailExists = await UserService.getUserByEmail(email);

            if (isEmailExists) {
                res.status(400).json({ message: "Email already exists" });
                return;
            }
            const user = await UserService.createUser({ name, email, password, role, code: nic, phone });
            if (!user) {
                res.status(400).json({ message: "Invalid user data" });
                return;
            }
            const token = Jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: "7d" });
            const fromEmail = 'enigma@besthub.me';
            const toEmail = user.email;
            const subject: string = 'Welcome to Enigma';
            const htmlContent: string = verificationEmail(user.name, token, user.id);

            const emailResponse = await sendMail(fromEmail, toEmail, subject, htmlContent);
            if (!emailResponse) {
                res.status(500).json({ message: "Failed to send verification email" });
                console.log(emailResponse);
                return;
            }

            res.status(201).json(user);
        } catch (error: any) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    }

    //get user by id
    public async getUserById(req: Request, res: Response): Promise<void> {
        try {
            const user = await UserService.getUserById(+req.params.id);
            res.status(200).json(user);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    //get all users
    public async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await UserService.getAllUsers();
            res.status(200).json(users);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    //update user
    public async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const user = await UserService.updateUser(+req.params.id, req.body);
            res.status(200).json(user);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    //delete user
    public async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            await UserService.deleteUser(+req.params.id);
            res.status(204).json();
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    //login user
    public async login(req: Request, res: Response): Promise<LoggedUserAttributes | void> {
        //console.log('secrete', this.secret);
        const secret = process.env.JWT_SECRET as string;
        try {
            const { email, password } = req.body;
            const user = await UserService.getUserByEmail(email);
            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                res.status(400).json({ message: "Invalid password" });
                return;
            }


            const token = Jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: "1h" });

            const loggedUser = {
                userId: user.id,
                username: user.name,
                roles: user.role,
                code: user.code,
                token: token,
                email: user.email,
                is_verified: user.is_verified

            }
            res.status(200).json(loggedUser);
        } catch (error: any) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    }

    //verify user
    public async verifyUser(req: Request, res: Response): Promise<void> {
        const secret = process.env.JWT_SECRET as string;
        try {
            const { id } = req.params;
            const { token } = req.query;
            const decoded = Jwt.verify(token as string, secret);
            if (!decoded) {
                res.status(400).json({ message: "Invalid token" });
                return;
            }
            const user = await UserService.VerifyEmail(+id);
            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }
            res.sendFile(path.join(__dirname, 'src/static', 'index.html'));
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default new UserController();