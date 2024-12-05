import Stripe from 'stripe';

export interface UpdateStripeOrderDto {
    metadata: any; // Metadata to update
    stripeExtraOptions?: Stripe.RequestOptions; // Extra options to pass to the Stripe API
    stripeExtraParams?: Stripe.Checkout.SessionUpdateParams; // Extra parameters to pass to the Stripe API
}
