import Stripe from 'stripe';

export interface CreateStripeSubscriptionDto {
    customerName?: string;
    customerEmail?: string;
    customerPhone?: string;
    priceId: string;
    description?: string;
    offerId?: string;
    planQuantity?: number;
    metadata?: Record<string, any>;
    customerId?: string;
    stripeExtraParams?: Partial<Stripe.SubscriptionCreateParams>;
    stripeCustomerExtraParams?: Partial<Stripe.CustomerCreateParams>;
    stripeExtraOptions?: Stripe.RequestOptions;
}
