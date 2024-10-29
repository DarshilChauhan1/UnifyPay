import { RazorPayCredentials } from '../common/interfaces/credentials.types'
import { RazorPayOrders } from '../razorpay/orders/razorpay.orders'
import { CombinedOrderAndCheckoutSessionDto, CreateOrderDto } from '../razorpay/orders/dto/createOrder.dtot';
import { QueryOrderDto } from '../razorpay/orders/dto/queryOrder.dto';
import { UpdateOrderDto } from '../razorpay/orders/dto/upateOrder.dto';
import { RazorPaySubscription } from '../razorpay/subscription/razorpay.subscription';
import { RazorpayPayment } from '../razorpay/payments/razorpay.payment';
import { VerifySignatureDto } from '../razorpay/payments/dto/verifySignature.dto';
export class RazorPayPayment {
    private razorPayOrder: RazorPayOrders;
    private razorPayPayment: RazorpayPayment;
    private razorPaySubscription: RazorPaySubscription;
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

}