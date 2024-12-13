import moment from 'moment';
import Razorpay from 'razorpay';
import { Orders } from 'razorpay/dist/types/orders';
import { Payments } from 'razorpay/dist/types/payments';
import { convertDateToUnix } from '../../../common/helpers/convertDateToUnix';
import { CreateRazorPayOrderDto } from './dto/createOrder.dto';
import { QueryRazorpayOneOrderDto, QueryRazorpayOrderDto } from './dto/queryOrder.dto';
import { UpdateRazorpayOrderDto } from './dto/upateOrder.dto';
import { RazorpayCheckoutSession } from './types/CheckoutSession.types';
export class RazorPayOrders {
    private razorpay: Razorpay;
    constructor(razorPayInstance: Razorpay) {
        this.razorpay = razorPayInstance;
    }
    async createOrder(payload: CreateRazorPayOrderDto): Promise<{
        orderData: Orders.RazorpayOrder;
        checkoutSessionData: RazorpayCheckoutSession;
    }> {
        try {
            const { imageUrl, businessName, callBackUrl, description, customerInfo, theme, ...orderPayload } = payload;
            this.validateOrder(payload);
            const orderData = await this.razorpay.orders.create(orderPayload);

            const checkoutSessionData = {
                name: businessName,
                description: description,
                image: imageUrl,
                callback_url: callBackUrl,
                prefill: customerInfo,
                order_id: orderData.id,
                amount: payload.amount,
                currency: orderData.currency,
                notes: orderData.notes,
                theme: theme,
            };

            return { orderData, checkoutSessionData };
        } catch (error) {
            throw error;
        }
    }

    async getAllOrders(payload?: QueryRazorpayOrderDto): Promise<{
        entity: string;
        count: number;
        items: Array<Orders.RazorpayOrder>;
    }> {
        try {
            let formattedDates: Record<string, number> = {};

            if (payload?.ordersFromDate || payload?.ordersTillDate) {
                formattedDates = convertDateToUnix({
                    ordersFromDate: payload?.ordersFromDate,
                    ordersTillDate: payload?.ordersTillDate
                        ? moment(payload.ordersTillDate).add(1, 'days').toDate()
                        : undefined,
                });
            }

            const queryData = {
                ...(payload?.receipt && { receipt: payload.receipt }),
                ...(payload?.ordersToFetch && { count: payload.ordersToFetch }),
                ...(payload?.skipOrders && { skip: payload.skipOrders }),
                ...(formattedDates['ordersFromDate'] && { from: formattedDates['ordersFromDate'] }),
                ...(formattedDates['ordersTillDate'] && { to: formattedDates['ordersTillDate'] }),
            };

            const orders = await this.razorpay.orders.all(queryData);
            return orders;
        } catch (error) {
            throw error;
        }
    }

    async getOrderById(payload: QueryRazorpayOneOrderDto): Promise<Orders.RazorpayOrder> {
        try {
            const { orderId } = payload;
            const order = await this.razorpay.orders.fetch(orderId);
            return order;
        } catch (error) {
            throw error;
        }
    }

    async getOrderPayments(payload: QueryRazorpayOneOrderDto): Promise<{
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

    async updateOrder(payload: UpdateRazorpayOrderDto): Promise<Orders.RazorpayOrder> {
        try {
            const { notes, orderId } = payload;
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
