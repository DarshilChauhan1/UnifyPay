import { Orders } from 'razorpay/dist/types/orders';
import Stripe from 'stripe';
import { CreateRazorPayOrderDto } from '../../gateways/razorpay/orders/dto/createOrder.dto';
import { QueryRazorpayOneOrderDto, QueryRazorpayOrderDto } from '../../gateways/razorpay/orders/dto/queryOrder.dto';
import { UpdateRazorpayOrderDto } from '../../gateways/razorpay/orders/dto/upateOrder.dto';
import { RazorpayCheckoutSession } from '../../gateways/razorpay/orders/types/CheckoutSession.types';
import { CreateStripeOrderDto } from '../../gateways/stripe/orders/dto/createOrder.dto';
import { QueryStripeOneOrderDto, QueryStripeOrderDto } from '../../gateways/stripe/orders/dto/queryOrder.dto';
import { UpdateStripeOrderDto } from '../../gateways/stripe/orders/dto/updateOrder.dto';

export interface MergerOrdersInterface {
    create(payload: CreateRazorPayOrderDto | CreateStripeOrderDto): Promise<
        | {
              orderData: Orders.RazorpayOrder;
              checkoutSessionData: RazorpayCheckoutSession;
          }
        | Stripe.Checkout.Session
    >;

    getAll(payload: QueryRazorpayOrderDto | QueryStripeOrderDto): Promise<
        | {
              entity: string;
              count: number;
              items: Array<Orders.RazorpayOrder>;
          }
        | Stripe.ApiList<Stripe.Checkout.Session>
    >;

    get(
        payload: QueryRazorpayOneOrderDto | QueryStripeOneOrderDto,
    ): Promise<Orders.RazorpayOrder | Stripe.Checkout.Session>;

    updateOrder(
        orderId: string,
        payload: UpdateRazorpayOrderDto | UpdateStripeOrderDto,
    ): Promise<Orders.RazorpayOrder | Stripe.Checkout.Session>;
}
