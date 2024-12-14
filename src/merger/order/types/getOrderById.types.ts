import { Orders } from 'razorpay/dist/types/orders';
import { GatewayProvider } from '../../../common/types/providers.types';
import { QueryRazorpayOneOrderDto } from '../../../gateways/razorpay/orders/dto/queryOrder.dto';
import { QueryStripeOneOrderDto } from '../../../gateways/stripe/orders/dto/queryOrder.dto';
import Stripe from 'stripe';

export type MergerGetOrderById = {
    [GatewayProvider.Razorpay]: {
        payload: QueryRazorpayOneOrderDto;
        returnType: Orders.RazorpayOrder;
    };
    [GatewayProvider.Stripe]: {
        payload: QueryStripeOneOrderDto;
        returnType: Stripe.Checkout.Session;
    };
};
