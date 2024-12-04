import { Orders } from 'razorpay/dist/types/orders';
import { CreateRazorPayOrderDto } from '../../razorpay/orders/dto/createOrder.dto';
import { CreateStripeOrderDto } from '../../stripe/orders/dto/createOrder.dto';
import Stripe from 'stripe';

export interface MergerGateways {
    // Orders
    createOrder(payload: CreateRazorPayOrderDto | CreateStripeOrderDto): Promise<
        | {
              orderData: Orders.RazorpayOrder;
              checkoutSessionData: any;
          }
        | Stripe.Checkout.Session
    >;
}
