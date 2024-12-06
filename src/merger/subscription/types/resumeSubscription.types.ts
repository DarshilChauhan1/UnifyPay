import { Subscriptions } from 'razorpay/dist/types/subscriptions';
import Stripe from 'stripe';
import { GatewayProvider } from '../../../common/types/providers.types';
import { ResumeRazorpaySubscriptionDto } from '../../../gateways/razorpay/subscription/dto/updateSubscription.dto';
import { ResumeStripeSubscriptionDto } from '../../../gateways/stripe/subscription/dto/updateSubcription.dto';

export type MergerResumeSubscription = {
    [GatewayProvider.Razorpay]: {
        payload: ResumeRazorpaySubscriptionDto;
        returnType: Subscriptions.RazorpaySubscription;
    };
    [GatewayProvider.Stripe]: {
        payload: ResumeStripeSubscriptionDto;
        returnType: Stripe.Subscription;
    };
};
