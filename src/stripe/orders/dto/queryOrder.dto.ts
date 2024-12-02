export interface QueryOrderDto {
    limit?: number; // Maximum number of orders to fetch
    lastRecordId?: string; // ID of the last order fetched
    customerId?: string; // Filter orders by customer ID
    orderFromTime?: Date;
    orderUntilTime?: Date;
}

export interface GetOneOrderDto {
    paymentIntentId: string; // ID of the payment intent (Stripe's order equivalent)
}
