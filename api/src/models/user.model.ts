import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db.config";

// User attributes interface
interface UserAttributes {
    id: number;
    code: string;
    name: string;
    email: string;
    phone: string;
    password: string;
    role: 'admin' | 'client';
    is_verified?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

// Extends User attributes for creation
interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

// User model class definition
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public code!: string;
    public name!: string;
    public email!: string;
    public phone!: string;
    public password!: string;
    public role!: 'admin' | 'client';
    public is_verified!: boolean;
    
}

// Define User model
User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    code: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    phone: {
        type: DataTypes.STRING(15),
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('admin', 'client'),
        allowNull: false
    },
    is_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    sequelize,
    tableName: "users",
    timestamps: true
});

export default User;
