import Stripe from 'stripe';

export interface QueryOrderDto {
    limit?: number; // Maximum number of orders to fetch
    lastRecordId?: string; // ID of the last order fetched
    customerId?: string; // Filter orders by customer ID
    orderFromTime?: Date;
    orderUntilTime?: Date;
    stripeExtraParams?: Stripe.Checkout.SessionListParams;
    stripeExtraOptions?: Stripe.RequestOptions;
}
