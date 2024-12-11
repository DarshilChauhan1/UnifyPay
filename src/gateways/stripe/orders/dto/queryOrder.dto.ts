import Stripe from 'stripe';

export interface QueryStripeOrderDto {
    limit?: number; // Maximum number of order to fetch
    lastRecordId?: string; // ID of the last order fetched
    customerId?: string; // Filter order by customer ID
    ordersFromDate?: Date | string; // Filter order from this time
    ordersTillDate?: Date | string;
    stripeExtraParams?: Partial<Stripe.Checkout.SessionListParams>;
    stripeExtraOptions?: Stripe.RequestOptions;
}

export interface QueryStripeOneOrderDto {
    orderId: string;
    stripeExtraOptions?: Stripe.RequestOptions;
}
