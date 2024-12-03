import Stripe from 'stripe';

export interface UpdateSubscriptionDto {
    metadata?: any;
    planQuantity?: number;
    priceId?: string;
    offerId?: string;
    stripeExtraParams?: Stripe.SubscriptionUpdateParams;
    stripeExtraOptions?: Stripe.RequestOptions;
}
