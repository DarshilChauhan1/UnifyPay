import Stripe from 'stripe';

export interface DeleteStripeSubscriptionDto {
    subscriptionId: string;
    stripeExtraParams?: Stripe.SubscriptionDeleteDiscountParams;
    stripeExtraOptions?: Stripe.RequestOptions;
}
