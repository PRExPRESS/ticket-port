import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db.config'; // Assuming your Sequelize instance is configured here

// Define the attributes for the Ticket model
interface TicketAttributes {
  id: number;
  name: string;
  price: number;
  createdAt: Date;
 
}

// Optional fields for creation (id will be auto-incremented)
interface TicketCreationAttributes extends Optional<TicketAttributes, 'id'> {}

// Define the Ticket class model
class EventTicket extends Model<TicketAttributes, TicketCreationAttributes> implements TicketAttributes {
  public id!: number;
  public name!: string;
  public price!: number;

  public createdAt!: Date;
  
}

// Initialize the Ticket model
EventTicket.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    
  },
  {
    sequelize, // Pass the Sequelize instance
    tableName: 'event_tickets', // Specify the table name explicitly
    timestamps: true, // Ensure Sequelize will use createdAt/updatedAt
  }
);

export default EventTicket;
