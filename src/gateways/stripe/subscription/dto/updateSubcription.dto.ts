import Stripe from 'stripe';

export interface UpdateStripeSubscriptionDto {
    subscriptionId: string;
    metadata?: Record<string, any>;
    planQuantity?: number;
    priceId?: string;
    offerId?: string;
    stripeExtraParams?: Partial<Stripe.SubscriptionUpdateParams>;
    stripeExtraOptions?: Stripe.RequestOptions;
}

export interface CancelStripeSubscriptionDto {
    subscriptionId: string;
    stripeExtraParams?: Partial<Stripe.SubscriptionCancelParams>;
    stripeExtraOptions?: Stripe.RequestOptions;
}

export interface PauseStripeSubscriptionDto {
    subscriptionId: string;
    stripeExtraParams?: Partial<Stripe.SubscriptionUpdateParams>;
    stripeExtraOptions?: Stripe.RequestOptions;
}

export interface ResumeStripeSubscriptionDto {
    subscriptionId: string;
    stripeExtraParams?: Partial<Stripe.SubscriptionResumeParams>;
    stripeExtraOptions?: Stripe.RequestOptions;
}
