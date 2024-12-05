import Razorpay from 'razorpay';
import { Orders } from 'razorpay/dist/types/orders';
import { RazorPayCredentials } from '../../common/types/credentials.types';
import { CreateRazorPayOrderDto } from '../razorpay/orders/dto/createOrder.dto';
import { GetOneOrderDto, QueryOrderDto } from '../razorpay/orders/dto/queryOrder.dto';
import { UpdateOrderDto } from '../razorpay/orders/dto/upateOrder.dto';
import { RazorPayOrders } from '../razorpay/orders/razorpay.orders';
import { RazorpayCheckoutSession } from '../razorpay/orders/types/CheckoutSession.types';
import { VerifySignatureDto } from '../razorpay/payments/dto/verifySignature.dto';
import { RazorpayPayment } from '../razorpay/payments/razorpay.payment';
import { CreatePlanDto } from '../razorpay/plans/dto/createPlan.dto';
import { RazorpayPlan } from '../razorpay/plans/razorpay.plan';
import { RazorPaySubscription } from '../razorpay/subscription/razorpay.subscription';
export class RazorpayProvider {
    private razorPayOrder: RazorPayOrders;
    private razorPayPayment: RazorpayPayment;
    private razorPaySubscription: RazorPaySubscription;
    private razorPayPlans: RazorpayPlan;
    constructor(private credentials: RazorPayCredentials) {
        const instance = new Razorpay({
            key_id: credentials.keyId,
            key_secret: credentials.keySecret,
        });
        this.razorPayOrder = new RazorPayOrders(instance);
        this.razorPayPayment = new RazorpayPayment(instance);
        this.razorPaySubscription = new RazorPaySubscription(instance);
        this.razorPayPlans = new RazorpayPlan(instance);
        this.razorPaySubscription = new RazorPaySubscription(instance);
    }

    // order methods
    async createOrder(payload: CreateRazorPayOrderDto): Promise<{
        orderData: Orders.RazorpayOrder;
        checkoutSessionData: RazorpayCheckoutSession;
    }> {
        return await this.razorPayOrder.createOrder(payload);
    }

    async getAllOrders(payload: QueryOrderDto) {
        return await this.razorPayOrder.getAllOrders(payload);
    }

    async getOrderById(payload: GetOneOrderDto) {
        return await this.razorPayOrder.getOrderById(payload);
    }

    async updateOrder(payload: UpdateOrderDto) {
        return await this.razorPayOrder.updateOrder(payload);
    }

    // payment methods
    async verifyPaymentSignature(payload: VerifySignatureDto, secret: string) {
        return await this.razorPayPayment.verifyPaymentSignature(payload, secret);
    }

    //plan methods
    async createPlan(payload: CreatePlanDto) {
        return await this.razorPayPlans.createPlan(payload);
    }
}
