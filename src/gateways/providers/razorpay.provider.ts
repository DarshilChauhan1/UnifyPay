import Razorpay from 'razorpay';
import { Orders } from 'razorpay/dist/types/orders';
import { RazorPayCredentials } from '../../common/types/credentials.types';
import { MergerGateways } from '../../merger/interfaces/merger.gateways.interface';
import { RazorpaySpecificMethods } from '../../merger/interfaces/razorpaySpecific.interface';
import { CreateRazorPayOrderDto } from '../razorpay/orders/dto/createOrder.dto';
import { QueryRazorpayOneOrderDto, QueryRazorpayOrderDto } from '../razorpay/orders/dto/queryOrder.dto';
import { UpdateRazorpayOrderDto } from '../razorpay/orders/dto/upateOrder.dto';
import { RazorPayOrders } from '../razorpay/orders/razorpay.orders';
import { RazorpayCheckoutSession } from '../razorpay/orders/types/CheckoutSession.types';
import { VerifySignatureDto } from '../razorpay/payments/dto/verifySignature.dto';
import { RazorpayPayment } from '../razorpay/payments/razorpay.payment';
import { CreateRazorpayPlanDto } from '../razorpay/plans/dto/createPlan.dto';
import { QueryRazorpayOnePlanDto, QueryRazorpayPlanDto } from '../razorpay/plans/dto/queryPlan.dto';
import { RazorpayPlan } from '../razorpay/plans/razorpay.plan';
import { CreateRazorpaySubscriptionDto } from '../razorpay/subscriptions/dto/createSubscription.dto';
import {
    QueryRazorpayOneSubscriptionDto,
    QueryRazorpaySubscriptionDto,
} from '../razorpay/subscriptions/dto/querySubscription.dto';
import {
    CancelRazorpaySubscriptionDto,
    DeleteOfferOfRazorpaySubscriptionDto,
    PauseRazorpaySubscriptionDto,
    ResumeRazorpaySubscriptionDto,
    UpdateRazorpaySubscriptionDto,
} from '../razorpay/subscriptions/dto/updateSubscription.dto';
import { RazorPaySubscription } from '../razorpay/subscriptions/razorpay.subscription';
export class RazorpayProvider implements MergerGateways, RazorpaySpecificMethods {
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
    }

    // order methods
    async createOrder(payload: CreateRazorPayOrderDto): Promise<{
        orderData: Orders.RazorpayOrder;
        checkoutSessionData: RazorpayCheckoutSession;
    }> {
        return this.razorPayOrder.createOrder(payload);
    }

    async getAllOrders(payload?: QueryRazorpayOrderDto) {
        return this.razorPayOrder.getAllOrders(payload);
    }

    async getOrderById(payload: QueryRazorpayOneOrderDto) {
        return this.razorPayOrder.getOrderById(payload);
    }

    async updateOrder(payload: UpdateRazorpayOrderDto) {
        return this.razorPayOrder.updateOrder(payload);
    }

    //plan methods
    async createPlan(payload: CreateRazorpayPlanDto) {
        return this.razorPayPlans.createPlan(payload);
    }

    async getAllPlans(payload?: QueryRazorpayPlanDto) {
        return this.razorPayPlans.getAllPlans(payload);
    }

    async getPlanById(payload: QueryRazorpayOnePlanDto) {
        return this.razorPayPlans.getOnePlan(payload);
    }

    // subscription methods
    async createSubscription(payload: CreateRazorpaySubscriptionDto) {
        return this.razorPaySubscription.createRazorPaySubscription(payload);
    }

    async getAllSubscriptions(payload?: QueryRazorpaySubscriptionDto) {
        return this.razorPaySubscription.getAllSubscriptions(payload);
    }

    async getSubscriptionById(payload: QueryRazorpayOneSubscriptionDto) {
        return this.razorPaySubscription.getSubscriptionById(payload);
    }

    async updateSubscription(payload: UpdateRazorpaySubscriptionDto) {
        return this.razorPaySubscription.updateSubscription(payload);
    }

    async cancelSubscription(payload: CancelRazorpaySubscriptionDto) {
        return this.razorPaySubscription.cancelSubscription(payload);
    }

    async pauseSubscription(payload: PauseRazorpaySubscriptionDto) {
        return this.razorPaySubscription.pauseSubscription(payload);
    }

    async resumeSubscription(payload: ResumeRazorpaySubscriptionDto) {
        return this.razorPaySubscription.resumeSubscription(payload);
    }

    async deleteOfferOfSubscription(payload: DeleteOfferOfRazorpaySubscriptionDto) {
        return this.razorPaySubscription.deleteOfferOfSubscription(payload);
    }

    /* Razorpay Specific methods */
    // payment methods
    async verifyPaymentSignature(payload: VerifySignatureDto) {
        return this.razorPayPayment.verifyPaymentSignature(payload);
    }
}
