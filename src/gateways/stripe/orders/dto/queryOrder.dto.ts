import Stripe from 'stripe';

export interface QueryStripeOrderDto {
    limit?: number; // Maximum number of order to fetch
    lastRecordId?: string; // ID of the last order fetched
    customerId?: string; // Filter order by customer ID
    orderFromTime?: Date;
    orderUntilTime?: Date;
    stripeExtraParams?: Stripe.Checkout.SessionListParams;
    stripeExtraOptions?: Stripe.RequestOptions;
}

export interface QueryStripeOneOrderDto {
    orderId: string;
    stripeExtraParams?: Stripe.Checkout.SessionListParams;
    stripeExtraOptions?: Stripe.RequestOptions;
}
