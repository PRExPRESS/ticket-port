import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db.config'; // Assuming your Sequelize instance is configured here
import Purchase from './purchase.model';


// Define the attributes for the Ticket model
interface TicketAttributes {
  id: number;
  type: string;
  price: number;
  path: string;
  status: string;
  qty: number;
  createdAt: Date;
  updatedAt: Date;
}

// Optional fields for creation (id will be auto-incremented)
interface TicketCreationAttributes extends Optional<TicketAttributes, 'id'> {}

// Define the Ticket class model
class Ticket extends Model<TicketAttributes, TicketCreationAttributes> implements TicketAttributes {
  public id!: number;
  public type!: string;
  public price!: number;
  public path!: string;
  public status!: string;
  public qty!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
}

// Initialize the Ticket model
Ticket.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    
    price: {
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
    qty: {
      type: DataTypes.INTEGER,
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
    tableName: 'tickets', // Specify the table name explicitly
    timestamps: true, // Ensure Sequelize will use createdAt/updatedAt
  }
);

//Ticket.hasMany(Purchase, { foreignKey: 'ticket_id', as: 'ticketPurchases' });

export default Ticket;
