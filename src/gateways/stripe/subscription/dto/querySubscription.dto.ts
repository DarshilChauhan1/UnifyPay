import Stripe from 'stripe';

export interface QueryStripeSubscriptionDto {
    priceId?: string;
    subscritptionsFromDate?: Date | string;
    subscriptionsTillDate?: Date | string;
    limit?: number;
    lastRecordId?: string;
    stripeExtraParams?: Partial<Stripe.SubscriptionListParams>;
    stripeExtraOptions?: Stripe.RequestOptions;
}

export interface QueryStripeOneSubscriptionDto {
    subscriptionId: string;
    stripeExtraParams?: Partial<Stripe.SubscriptionRetrieveParams>;
    stripeExtraOptions?: Stripe.RequestOptions;
}
