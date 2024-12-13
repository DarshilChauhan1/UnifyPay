import Stripe from 'stripe';

export interface DeleteOfferOfStripeSubscriptionDto {
    subscriptionId: string;
    stripeExtraParams?: Partial<Stripe.SubscriptionDeleteDiscountParams>;
    stripeExtraOptions?: Stripe.RequestOptions;
}
