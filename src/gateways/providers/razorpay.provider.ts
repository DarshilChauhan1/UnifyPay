import Razorpay from 'razorpay';
import { Orders } from 'razorpay/dist/types/orders';
import { RazorPayCredentials } from '../../common/types/credentials.types';
import { CreateRazorPayOrderDto } from '../razorpay/orders/dto/createOrder.dto';
import { QueryRazorpayOneOrderDto, QueryRazorpayOrderDto } from '../razorpay/orders/dto/queryOrder.dto';
import { UpdateRazorpayOrderDto } from '../razorpay/orders/dto/upateOrder.dto';
import { RazorPayOrders } from '../razorpay/orders/razorpay.orders';
import { RazorpayCheckoutSession } from '../razorpay/orders/types/CheckoutSession.types';
import { VerifySignatureDto } from '../razorpay/payments/dto/verifySignature.dto';
import { RazorpayPayment } from '../razorpay/payments/razorpay.payment';
import { CreateRazorpayPlanDto } from '../razorpay/plans/dto/createPlan.dto';
import { RazorpayPlan } from '../razorpay/plans/razorpay.plan';
import { RazorPaySubscription } from '../razorpay/subscription/razorpay.subscription';
import { QueryRazorpayOnePlanDto, QueryRazorpayPlanDto } from '../razorpay/plans/dto/queryPlan.dto';
import { CreateRazorpaySubscriptionDto } from '../razorpay/subscription/dto/createSubscription.dto';
import {
    QueryRazorpayOneSubscriptionDto,
    QueryRazorpaySubscriptionDto,
} from '../razorpay/subscription/dto/querySubscription.dto';
import {
    CancelRazorpaySubscriptionDto,
    DeleteOfferOfRazorpaySubscriptionDto,
    PauseRazorpaySubscriptionDto,
    ResumeRazorpaySubscriptionDto,
    UpdateRazorpaySubscriptionDto,
} from '../razorpay/subscription/dto/updateSubscription.dto';
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

    async getAllOrders(payload: QueryRazorpayOrderDto) {
        return await this.razorPayOrder.getAllOrders(payload);
    }

    async getOrderById(payload: QueryRazorpayOneOrderDto) {
        return await this.razorPayOrder.getOrderById(payload);
    }

    async updateOrder(orderId: string, payload: UpdateRazorpayOrderDto) {
        return await this.razorPayOrder.updateOrder(orderId, payload);
    }

    // payment methods
    async verifyPaymentSignature(payload: VerifySignatureDto, secret: string) {
        return await this.razorPayPayment.verifyPaymentSignature(payload, secret);
    }

    //plan methods
    async createPlan(payload: CreateRazorpayPlanDto) {
        return await this.razorPayPlans.createPlan(payload);
    }

    async getAllPlans(payload: QueryRazorpayPlanDto) {
        return await this.razorPayPlans.getAllPlans(payload);
    }

    async getPlanById(payload: QueryRazorpayOnePlanDto) {
        return await this.razorPayPlans.getOnePlan(payload);
    }

    // subscription methods
    async createSubscription(payload: CreateRazorpaySubscriptionDto) {
        return await this.razorPaySubscription.createRazorPaySubscription(payload);
    }

    async getAllSubscriptions(payload: QueryRazorpaySubscriptionDto) {
        return await this.razorPaySubscription.getAllSubscriptions(payload);
    }

    async getSubscriptionById(payload: QueryRazorpayOneSubscriptionDto) {
        return await this.razorPaySubscription.getSubscriptionById(payload);
    }

    async updateSubscription(subscriptionId: string, payload: UpdateRazorpaySubscriptionDto) {
        return await this.razorPaySubscription.updateSubscription(subscriptionId, payload);
    }

    async cancelSubscription(payload: CancelRazorpaySubscriptionDto) {
        return await this.razorPaySubscription.cancelSubscription(payload);
    }

    async pauseSubscription(payload: PauseRazorpaySubscriptionDto) {
        return await this.razorPaySubscription.pauseSubscription(payload);
    }

    async resumeSubscription(payload: ResumeRazorpaySubscriptionDto) {
        return await this.razorPaySubscription.resumeSubscription(payload);
    }

    async deleteOfferOfSubscription(payload: DeleteOfferOfRazorpaySubscriptionDto) {
        return await this.razorPaySubscription.deleteOfferOfSubscription(payload);
    }
}
