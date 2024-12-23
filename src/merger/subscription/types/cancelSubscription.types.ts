import { Subscriptions } from 'razorpay/dist/types/subscriptions';
import Stripe from 'stripe';
import { GatewayProvider } from '../../../common/types/providers.types';
import { CancelRazorpaySubscriptionDto } from '../../../gateways/razorpay/subscriptions/dto/updateSubscription.dto';
import { CancelStripeSubscriptionDto } from '../../../gateways/stripe/subscriptions/dto/updateSubcription.dto';

export type MergerCancelSubscription = {
    [GatewayProvider.Razorpay]: {
        payload: CancelRazorpaySubscriptionDto;
        returnType: Subscriptions.RazorpaySubscription;
    };
    [GatewayProvider.Stripe]: {
        payload: CancelStripeSubscriptionDto;
        returnType: Stripe.Subscription;
    };
};
