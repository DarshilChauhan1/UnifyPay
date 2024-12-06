import Stripe from 'stripe';

export interface DeleteOfferOfStripeSubscriptionDto {
    subscriptionId: string;
    stripeExtraParams?: Stripe.SubscriptionDeleteDiscountParams;
    stripeExtraOptions?: Stripe.RequestOptions;
}
