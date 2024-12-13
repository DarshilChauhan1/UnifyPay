import Stripe from 'stripe';

export interface UpdateStripeOrderDto {
    orderId: string; // ID of the order to update
    metadata?: Record<string, any>; // Metadata to update
    stripeExtraOptions?: Stripe.RequestOptions; // Extra options to pass to the Stripe API
    stripeExtraParams?: Partial<Stripe.Checkout.SessionUpdateParams>; // Extra parameters to pass to the Stripe API
}
