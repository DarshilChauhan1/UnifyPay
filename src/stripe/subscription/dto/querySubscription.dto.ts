import Stripe from 'stripe';

export interface QuerySubscriptionDto {
    priceId?: string;
    subscritptionFrom?: Date;
    subscriptionTo?: Date;
    limit?: number;
    lastRecordId?: string;
    stripeExtraParams?: Stripe.SubscriptionListParams;
    stripeExtraOptions?: Stripe.RequestOptions;
}
