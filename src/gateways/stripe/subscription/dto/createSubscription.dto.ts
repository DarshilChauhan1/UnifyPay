import Stripe from 'stripe';

export class CreateStripeSubscriptionDto {
    name: string;
    email?: string;
    phone?: string;
    priceId: string;
    description?: string;
    offerId?: string;
    planQuantity?: number;
    metadata?: any;
    stripeExtraParams?: Partial<Stripe.SubscriptionCreateParams>;
    stripeExtraOptions?: Stripe.RequestOptions;
}
