import { Subscriptions } from 'razorpay/dist/types/subscriptions';
import Stripe from 'stripe';
import { GatewayProvider } from '../../../common/types/providers.types';
import { QueryRazorpaySubscriptionDto } from '../../../gateways/razorpay/subscriptions/dto/querySubscription.dto';
import { QueryStripeSubscriptionDto } from '../../../gateways/stripe/subscriptions/dto/querySubscription.dto';

export type MergerGetAllSubscription = {
    [GatewayProvider.Razorpay]: {
        payload: QueryRazorpaySubscriptionDto;
        returnType: {
            entity: string;
            count: number;
            items: Array<Subscriptions.RazorpaySubscription>;
        };
    };
    [GatewayProvider.Stripe]: {
        payload: QueryStripeSubscriptionDto;
        returnType: Stripe.ApiList<Stripe.Subscription>;
    };
};
