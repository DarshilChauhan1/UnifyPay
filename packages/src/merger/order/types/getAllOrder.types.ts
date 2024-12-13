import { Orders } from 'razorpay/dist/types/orders';
import { GatewayProvider } from '../../../common/types/providers.types';
import { QueryRazorpayOrderDto } from '../../../gateways/razorpay/orders/dto/queryOrder.dto';
import { QueryStripeOrderDto } from '../../../gateways/stripe/orders/dto/queryOrder.dto';
import Stripe from 'stripe';

export type MergerGetAllOrders = {
    [GatewayProvider.Razorpay]: {
        payload: QueryRazorpayOrderDto;
        returnType: {
            entity: string;
            count: number;
            items: Array<Orders.RazorpayOrder>;
        };
    };
    [GatewayProvider.Stripe]: {
        payload: QueryStripeOrderDto;
        returnType: Stripe.ApiList<Stripe.Checkout.Session>;
    };
};
