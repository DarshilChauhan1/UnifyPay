import Stripe from 'stripe';

export interface UpdateStripeSubscriptionDto {
    metadata?: any;
    planQuantity?: number;
    priceId?: string;
    offerId?: string;
    stripeExtraParams?: Stripe.SubscriptionUpdateParams;
    stripeExtraOptions?: Stripe.RequestOptions;
}

export interface CancelStripeSubscriptionDto {
    subscriptionId: string;
    stripeExtraParams?: Stripe.SubscriptionCancelParams;
    stripeExtraOptions?: Stripe.RequestOptions;
}

export interface PauseStripeSubscriptionDto {
    subscriptionId: string;
    stripeExtraParams?: Stripe.SubscriptionUpdateParams;
    stripeExtraOptions?: Stripe.RequestOptions;
}

export interface ResumeStripeSubscriptionDto {
    subscriptionId: string;
    stripeExtraParams?: Stripe.SubscriptionResumeParams;
    stripeExtraOptions?: Stripe.RequestOptions;
}
