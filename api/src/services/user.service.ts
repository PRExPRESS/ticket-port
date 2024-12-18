import User from "../models/user.model";
import bcrypt from "bcrypt";



interface LoggedUserAttributes {
    userId: number;
    username: string;
    roles: string;
    code: string;
    token: string;

}
class UserService {
    
    //create user
    public async createUser(data:any): Promise<User> {
        if(!data.password){
            return User.create(data);
        }
        
        const hashedPassword = await bcrypt.hash(data.password, 10);
        return User.create({...data, password: hashedPassword});
    }

    //get user by id
    public async getUserById(id: number): Promise<User | null> {
        return User.findByPk(id);
    }

    //get all users
    public async getAllUsers(): Promise<User[]> {
        return User.findAll();
    }

    //update user
    public async updateUser(id: number, data: any): Promise<User | null> {
        const user = await User.findByPk(id);
        if(!user) return null;
        return user.update(data);
    }
    
    //delete user
    public async deleteUser (id: number): Promise<void> {
        const user = await User.findByPk(id);
        if(!user) return;
        await user.destroy();
    }

    //login user
    

    //get user by email
    public async getUserByEmail(email: string): Promise<User | null> {
        return User.findOne({ where: { email } });
        
    }


    public async VerifyEmail(id: number): Promise<User | null> {
        const user = await User.findByPk(id);
        if(!user) return null;
        return user.update({is_verified: true});
    }

    //forget password

    //rest password

    //generate code
    private generateCode = (email: string): string => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let hash = 0;
    
        // Create a simple hash from the email string
        for (let i = 0; i < email.length; i++) {
            hash = email.charCodeAt(i) + ((hash << 5) - hash);
        }
    
        // Convert hash to a string of letters and numbers
        let code = '';
        for (let i = 0; i < 7; i++) { // Using first 7 characters from hash
            code += chars[Math.abs((hash >> i) % chars.length)];
        }
    
        // Fill the remaining characters with random ones
        for (let i = code.length; i < 10; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
    
        return code;
    };
    
    
    
    
    
}

export default new UserService();