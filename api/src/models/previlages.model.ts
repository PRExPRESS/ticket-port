import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db.config";
import User from "./user.model";

// Privileges attributes interface
interface PrivilegesAttributes {
    id: number;
    user_id: number;
    can_create_admin_user: boolean;
    can_view_purchases: boolean;
    can_verify_purchases: boolean;
    can_scan: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

// Privileges creation attributes interface
interface PrivilegesCreationAttributes extends Optional<PrivilegesAttributes, "id"> {}

// Privileges model class definition
class Privileges extends Model<PrivilegesAttributes, PrivilegesCreationAttributes> implements PrivilegesAttributes {
    public id!: number;
    public user_id!: number;
    public can_create_admin_user!: boolean;
    public can_view_purchases!: boolean;
    public can_verify_purchases!: boolean;
    public can_scan!: boolean;
    public createdAt!: Date;
    public updatedAt!: Date;
}

// Define Privileges model
Privileges.init({
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
    can_create_admin_user: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    can_view_purchases: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    can_verify_purchases: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    can_scan: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    sequelize,
    tableName: "privileges",
    timestamps: true
});

User.hasOne(Privileges, { foreignKey: 'user_id' });
Privileges.belongsTo(User, { foreignKey: 'user_id' });

export default Privileges;
