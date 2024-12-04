import Razorpay from 'razorpay';
import { CreateRazorPayOrderDto } from './dto/createOrder.dto';
import { GetOneOrderDto, QueryOrderDto } from './dto/queryOrder.dto';
import { UpdateOrderDto } from './dto/upateOrder.dto';
import { convertDateToUnix } from '../../common/helpers/convertDateToUnix';
import { Orders } from 'razorpay/dist/types/orders';
import { Payments } from 'razorpay/dist/types/payments';

export class RazorPayOrders {
    private razorpay: Razorpay;
    constructor(razorPayInstance: Razorpay) {
        this.razorpay = razorPayInstance;
    }
    async createOrder(payload: CreateRazorPayOrderDto): Promise<{
        orderData: Orders.RazorpayOrder;
        checkoutSessionData: any;
    }> {
        try {
            const {
                amount,
                apiKey,
                currency,
                businessName,
                callBackUrl,
                customerInfo,
                description,
                imageUrl,
                notes,
                theme,
            } = payload;
            this.validateOrder(payload);
            const orderData = await this.razorpay.orders.create(payload);

            const checkoutSessionData = {
                key: apiKey,
                name: businessName,
                description,
                image: imageUrl,
                callback_url: callBackUrl,
                prefill: customerInfo,
                order_id: orderData.id,
                amount,
                currency,
                notes,
                theme,
            };

            return { orderData, checkoutSessionData };
        } catch (error) {
            throw error;
        }
    }

    async getAllOrders(payload: QueryOrderDto): Promise<{
        entity: string;
        count: number;
        items: Array<Orders.RazorpayOrder>;
    }> {
        try {
            const { orderFromTime, orderUntilTime, authorized, ordersToFetch, receipt, skipOrders } = payload;
            const formattedDates = convertDateToUnix({ from: orderFromTime, to: orderUntilTime });
            const queryData = {
                receipt,
                authorized,
                count: ordersToFetch,
                from: skipOrders,
                ...formattedDates,
            };
            const orders = await this.razorpay.orders.all(queryData);
            return orders;
        } catch (error) {
            throw error;
        }
    }

    async getOrderById(payload: GetOneOrderDto): Promise<Orders.RazorpayOrder> {
        try {
            const { orderId } = payload;
            const order = await this.razorpay.orders.fetch(orderId);
            return order;
        } catch (error) {
            throw error;
        }
    }

    async getOrderPayments(payload: GetOneOrderDto): Promise<{
        entity: string;
        count: number;
        items: Array<Payments.RazorpayPayment>;
    }> {
        try {
            const { orderId } = payload;
            const payments = await this.razorpay.orders.fetchPayments(orderId);
            return payments;
        } catch (error) {
            throw error;
        }
    }

    async updateOrder(payload: UpdateOrderDto): Promise<Orders.RazorpayOrder> {
        try {
            const { orderId, notes } = payload;
            const order = await this.razorpay.orders.edit(orderId, { notes: notes });
            return order;
        } catch (error) {
            throw error;
        }
    }

    private validateOrder(payload: CreateRazorPayOrderDto) {
        const { receipt, partialPayment, first_payment_min_amount } = payload;
        if (receipt && receipt.length > 40) {
            throw new Error('Receipt should be of max 40 characters');
        }

        if (partialPayment && !first_payment_min_amount) {
            throw new Error('first_payment_min_amount is required when partialPayment is true');
        }
    }
}
