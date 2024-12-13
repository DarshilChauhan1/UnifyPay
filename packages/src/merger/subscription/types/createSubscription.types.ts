import { Subscriptions } from 'razorpay/dist/types/subscriptions';
import Stripe from 'stripe';
import { GatewayProvider } from '../../../common/types/providers.types';
import { CreateRazorpaySubscriptionDto } from '../../../gateways/razorpay/subscriptions/dto/createSubscription.dto';
import { CreateStripeSubscriptionDto } from '../../../gateways/stripe/subscriptions/dto/createSubscription.dto';

export type MergerCreateSubscription = {
    [GatewayProvider.Razorpay]: {
        payload: CreateRazorpaySubscriptionDto;
        returnType: Subscriptions.RazorpaySubscription;
    };
    [GatewayProvider.Stripe]: {
        payload: CreateStripeSubscriptionDto;
        returnType: Stripe.Subscription;
    };
};
