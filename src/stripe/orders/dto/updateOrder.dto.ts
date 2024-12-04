import Stripe from 'stripe';

export interface UpdateOrderDto {
    metadata: any; // Metadata to update
    checkoutSessionId: string; // ID of the checkout session to update
    stripeExtraOptions?: Stripe.RequestOptions; // Extra options to pass to the Stripe API
    stripeExtraParams?: Stripe.Checkout.SessionUpdateParams; // Extra parameters to pass to the Stripe API
}
