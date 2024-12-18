import { Op } from "sequelize";
import Purchase from "../models/purchase.model";
import Ticket from "../models/ticket.model";
import User from "../models/user.model";

class PurchaseService {

    public async createPurchase(data: any): Promise<Purchase[] | null> {
        try {
            return await Purchase.bulkCreate(data);

        } catch (error: any) {
            throw new Error(error);
        }
    }

    //get all purchases
    public async getAllPurchases(): Promise<Purchase[]> {
        return await Purchase.findAll();
    }

    //get purchase by id
    public async getPurchaseById(id: number): Promise<Purchase | null> {
        return await Purchase.findByPk(id);
    }

    //get purchase by user id
    public async getPurchaseByUserId(id: number): Promise<Purchase[] | null> {
        try {
            return await Purchase.findAll({
                where: { user_id: id },
                include: [{ model: Ticket, as: 'ticket', attributes: ['type', 'price',] }]
            });

        } catch (error: any) {
            throw new Error(error);
        }
    }

    //get purchase by payment id
    public async getPurchaseByPaymentId(id: number): Promise<Purchase[] | null> {
        return await Purchase.findAll({ where: { payment_id: id, status: 'pending' } });
    }

    //get purchase by code
    public async getPurchaseByCode(code: string): Promise<Purchase | null> {
        return await Purchase.findOne({ where: { code } });
    }

    //get purchase by secret_code
    public async getPurchaseBySecreteCode(code: string): Promise<Purchase | null> {
        return await Purchase.findOne({
            where: { 'secret_code': code },
            include: [{ model: User, as: 'user', attributes: ['code', 'name'] }]
        });
    }

    //get purchase by status
    public async getPurchaseByStatus(status: string): Promise<Purchase | null> {
        return await Purchase.findOne({ where: { status } });
    }

    public async changeStatus(pId: number, status: any): Promise<number> {
        const [affectedCount] = await Purchase.update(
            { status }, // The fields to update
            {
                where: {

                    payment_id: pId  // Add payment_id to the where clause
                }
            }
        );
        return affectedCount;  // Return the number of rows affected
    }

    //get puchase by ticket id
    public async getPurchaseByTicketId(id: number): Promise<Purchase[] | null> {
        return await Purchase.findAll({ where: { ticket_id: id, status: 'verified' } });
    }

    //update status by id
    public async updateStatusById(id: number, status: string): Promise<number> {
        const [affectedCount] = await Purchase.update(
            { status }, // The fields to update
            {
                where: { id } // Add the where clause
            }
        );
        return affectedCount;  // Return the number of rows affected
    }


    //delete purchase
    public async deletePurchase(id: number): Promise<number> {
        const affectedCount = await Purchase.destroy({ where: { id } });
        return affectedCount;  // Return the number of rows affected
    }

    //get all purchases count
    public async getPurchasesCount(): Promise<number> {
        const count = await Purchase.count();
        return count;
    }

    //get verified purchases count
    
public async getVerifiedPurchasesCount(): Promise<number> {
    const count = await Purchase.count({
        where: {
            status: {
                [Op.or]: ['verified', 'deactivated']
            }
        }
    });

    return count;
}

    //total verified purchases amount
    public async getTotalVerifiedPurchasesAmount(): Promise<number> {
        const total = await Purchase.sum('price', { where: { status: 'verified' } });
        return total;
    }

    //total pending purchases
    public async getTotalPendingPurchases(): Promise<number> {
        const total = await Purchase.count({ where: { status: 'pending' } });
        return total;
    }
}

export default new PurchaseService();