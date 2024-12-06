import { Subscriptions } from 'razorpay/dist/types/subscriptions';
import Stripe from 'stripe';
import { GatewayProvider } from '../../../common/types/providers.types';
import { DeleteOfferOfRazorpaySubscriptionDto } from '../../../gateways/razorpay/subscription/dto/updateSubscription.dto';
import { DeleteOfferOfStripeSubscriptionDto } from '../../../gateways/stripe/subscription/dto/deleteSubscription.dto';

export type MergerDeleteSubscriptionOffer = {
    [GatewayProvider.Razorpay]: {
        payload: DeleteOfferOfRazorpaySubscriptionDto;
        returnType: Subscriptions.RazorpaySubscription;
    };
    [GatewayProvider.Stripe]: {
        payload: DeleteOfferOfStripeSubscriptionDto;
        returnType: Stripe.DeletedDiscount;
    };
};
