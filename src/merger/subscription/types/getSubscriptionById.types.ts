import { Subscriptions } from 'razorpay/dist/types/subscriptions';
import Stripe from 'stripe';
import { GatewayProvider } from '../../../common/types/providers.types';
import { QueryRazorpayOneSubscriptionDto } from '../../../gateways/razorpay/subscription/dto/querySubscription.dto';
import { QueryStripeOneSubscriptionDto } from '../../../gateways/stripe/subscription/dto/querySubscription.dto';

export type MergerGetSubscriptionById = {
    [GatewayProvider.Razorpay]: {
        payload: QueryRazorpayOneSubscriptionDto;
        returnType: Subscriptions.RazorpaySubscription;
    };
    [GatewayProvider.Stripe]: {
        payload: QueryStripeOneSubscriptionDto;
        returnType: Stripe.Subscription;
    };
};
