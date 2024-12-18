import { Association, DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.config';
import User from './user.model';

// Define the attributes for the Payment model
interface PaymentAttributes {
    id: number;
    user_id: number;
    amount: number;
    path: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

// Define the Payment class model
class Payment extends Model<PaymentAttributes> implements PaymentAttributes {
    public id!: number;
    public user_id!: number;
    public amount!: number;
    public path!: string;
    public status!: string;
    public createdAt!: Date;
    public updatedAt!: Date;

    public readonly user?: User;  // Association to User

    public static associations: {
        user: Association<Payment, User>;
    };
}

// Initialize the Payment model
Payment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        path: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize, // Pass the Sequelize instance
        tableName: 'payments', // Specify the table name explicitly
        timestamps: true, // Ensure Sequelize will use createdAt/updatedAt
    }
);

// Define the association with User
Payment.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user', // Alias for the association
});
User.hasMany(Payment, {
    foreignKey: 'user_id',
    as: 'payments',
})

export default Payment;
