import { Orders } from 'razorpay/dist/types/orders';
import Stripe from 'stripe';
import { CreateRazorPayOrderDto } from '../../gateways/razorpay/orders/dto/createOrder.dto';
import { RazorpayCheckoutSession } from '../../gateways/razorpay/orders/types/CheckoutSession.types';
import { CreateStripeOrderDto } from '../../gateways/stripe/orders/dto/createOrder.dto';
import { QueryRazorpayOneOrderDto, QueryRazorpayOrderDto } from '../../gateways/razorpay/orders/dto/queryOrder.dto';
import { QueryStripeOneOrderDto, QueryStripeOrderDto } from '../../gateways/stripe/orders/dto/queryOrder.dto';

export interface MergerGateways {
    // Orders
    createOrder(payload: CreateRazorPayOrderDto | CreateStripeOrderDto): Promise<
        | {
              orderData: Orders.RazorpayOrder;
              checkoutSessionData: RazorpayCheckoutSession;
          }
        | Stripe.Checkout.Session
    >;

    getAllOrders(payload: QueryRazorpayOrderDto | QueryStripeOrderDto): Promise<
        | {
              entity: string;
              count: number;
              items: Array<Orders.RazorpayOrder>;
          }
        | Stripe.ApiList<Stripe.Checkout.Session>
    >;

    getOrderById(
        payload: QueryStripeOneOrderDto | QueryRazorpayOneOrderDto,
    ): Promise<Orders.RazorpayOrder | Stripe.Checkout.Session>;
}
