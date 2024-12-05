import { Orders } from 'razorpay/dist/types/orders';
import Stripe from 'stripe';
import { CreateRazorPayOrderDto } from '../../gateways/razorpay/orders/dto/createOrder.dto';
import { RazorpayCheckoutSession } from '../../gateways/razorpay/orders/types/CheckoutSession.types';
import { CreateStripeOrderDto } from '../../gateways/stripe/orders/dto/createOrder.dto';

export interface MergerGateways {
    // Orders
    createOrder(payload: CreateRazorPayOrderDto | CreateStripeOrderDto): Promise<
        | {
              orderData: Orders.RazorpayOrder;
              checkoutSessionData: RazorpayCheckoutSession;
          }
        | Stripe.Checkout.Session
    >;

    // getAllOrders(payload: any): Promise<{
    //     entity: string;
    //     count: number;
    //     items: Array<Orders.RazorpayOrder>;
    // }>;
}
