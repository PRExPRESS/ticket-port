import { Association, DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db.config";
import User from "./user.model";
import Payment from "./payment.model";
import Ticket from "./ticket.model";

// Purchases attributes interface
interface PurchaseAttributes {
    id: number;
    user_id: number;
    code: string;
    ticket_id: number;
    secret_code: string;
    price: number;
    payment_id: number;
    status: string;
    createdAt?: Date;
    updatedAt?: Date;
    ticket?: Ticket;
    user?: User;
}

// Purchases creation attributes interface
interface PurchaseCreationAttributes extends Optional<PurchaseAttributes, "id"> {}

// Purchases model class definition
class Purchase extends Model<PurchaseAttributes, PurchaseCreationAttributes> implements PurchaseAttributes {
    public id!: number;
    public user_id!: number;
    public code!: string;
    public ticket_id!: number;
    public secret_code!: string;
    public price!: number;
    public payment_id!: number;
    public status!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
    public readonly ticket?: Ticket;
    public readonly user?: User;

    public static associations:{
        ticket : Association<Ticket, Purchase>;
        user: Association< User, Purchase>;
    }
}

// Define Purchases model
Purchase.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    code: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    ticket_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    secret_code: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    payment_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING(50),
        defaultValue: 'pending'
    }
}, {
    sequelize,
    tableName: "purchases",
    timestamps: true
});

User.hasMany(Purchase, { foreignKey: 'user_id' });
Payment.hasMany(Purchase, { foreignKey: 'payment_id' });
Purchase.belongsTo(User, { foreignKey: 'user_id' , as : 'user'});
Purchase.belongsTo(Payment, { foreignKey: 'payment_id' });
Purchase.belongsTo(Ticket, { foreignKey: 'ticket_id', as: 'ticket' });
Ticket.hasMany(Purchase, { foreignKey: 'ticket_id' });

export default Purchase;
