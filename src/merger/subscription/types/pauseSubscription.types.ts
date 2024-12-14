import { Subscriptions } from 'razorpay/dist/types/subscriptions';
import Stripe from 'stripe';
import { GatewayProvider } from '../../../common/types/providers.types';
import { PauseRazorpaySubscriptionDto } from '../../../gateways/razorpay/subscriptions/dto/updateSubscription.dto';
import { PauseStripeSubscriptionDto } from '../../../gateways/stripe/subscriptions/dto/updateSubcription.dto';

export type MergerPauseSubscription = {
    [GatewayProvider.Razorpay]: {
        payload: PauseRazorpaySubscriptionDto;
        returnType: Subscriptions.RazorpaySubscription;
    };
    [GatewayProvider.Stripe]: {
        payload: PauseStripeSubscriptionDto;
        returnType: Stripe.Subscription;
    };
};
