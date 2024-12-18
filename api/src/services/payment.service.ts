import Payment from "../models/payment.model";
import User from "../models/user.model";

class PaymentService {
    async create(data: any) {
        return Payment.create(data);
    }

    async getPaymentById(id: number) {
        return Payment.findByPk(id,{
            include: [{ model: User , as: 'user' , attributes: [ 'code' ] }],
        });
    }

    async getAllPayments() {
        return Payment.findAll({
            include: [{ model: User , as: 'user' , attributes: [ 'code' ] }],
        });
    }

    async updatePayment(id: number,user_id: number, data: any) {
        const payment = await Payment.findOne({
            where:{'user_id': user_id,id}
        });
        if (!payment) return null;
        return payment.update(data);
    }
    //verify payment
    async verifyPayment(id: number) {
        const payment = await Payment.findByPk(id);
        if (!payment) return;
        return payment.update({ status: 'approved' });
    }

    async deletePayment(id: number) {
        const payment = await Payment.findByPk(id);
        if (!payment) return;
        return payment.destroy();
    }

    //get unpaid payments by user id
    async getUnpaidPaymentByUserId(id: number): Promise<Payment[] | null> {
        try {
            return await Payment.findAll({ where: { user_id: id, status: 'pending' } });
        } catch (error: any) {
            throw new Error(error);
        }
    }
}

export default new PaymentService();