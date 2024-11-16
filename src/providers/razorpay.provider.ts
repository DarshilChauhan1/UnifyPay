import { RazorPayCredentials } from '../common/types/credentials.types'
import { RazorPayOrders } from '../razorpay/orders/razorpay.orders'
import { CombinedOrderAndCheckoutSessionDto, CreateOrderDto } from '../razorpay/orders/dto/createOrder.dtot';
import { QueryOrderDto } from '../razorpay/orders/dto/queryOrder.dto';
import { UpdateOrderDto } from '../razorpay/orders/dto/upateOrder.dto';
import { RazorPaySubscription } from '../razorpay/subscription/razorpay.subscription';
import { RazorpayPayment } from '../razorpay/payments/razorpay.payment';
import { VerifySignatureDto } from '../razorpay/payments/dto/verifySignature.dto';
import { RazorpayPlan } from '../razorpay/plans/razorpay.plan';
import { CreatePlanDto } from '../razorpay/plans/dtos/createPlan.dto';
export class RazorPayPayment {
    private razorPayOrder: RazorPayOrders;
    private razorPayPayment: RazorpayPayment;
    private razorPaySubscription: RazorPaySubscription;
    private razorPayPlans: RazorpayPlan
    constructor(private credentials: RazorPayCredentials) {
        this.razorPayOrder = new RazorPayOrders({
            keyId: credentials.keyId,
            keySecret: credentials.keySecret
        })

        this.razorPayPayment = new RazorpayPayment({
            keyId: credentials.keyId,
            keySecret: credentials.keySecret
        })

        this.razorPaySubscription = new RazorPaySubscription({
            keyId: credentials.keyId,
            keySecret: credentials.keySecret
        })

        this.razorPayPlans = new RazorpayPlan({
            keyId: credentials.keyId,
            keySecret: credentials.keySecret
        })
    }

    // order methods
    async createOrder(payload: CreateOrderDto) {
        return await this.razorPayOrder.createRazorPayOrder(payload)
    }

    async getAllOrders(payload: QueryOrderDto) {
        return await this.razorPayOrder.getAllOrders(payload)
    }

    async updateOrder(payload: UpdateOrderDto) {
        return await this.razorPayOrder.updateOrder(payload)
    }

    async createCheckoutSessionWithOrder(payload: CombinedOrderAndCheckoutSessionDto) {
        return await this.razorPayOrder.createCheckoutSessionWithOrder(payload)
    }

    // payment methods
    async verifyPaymentSignature(payload: VerifySignatureDto, secret: string) {
        return await this.razorPayPayment.verifyPaymentSignature(payload, secret)
    }

    //plan methods
    async createRazorPayPlans(payload: CreatePlanDto) {
        return await this.razorPayPlans.createPlan(payload)
    }

}