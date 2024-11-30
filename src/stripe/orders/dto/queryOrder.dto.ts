export interface QueryOrderDto {
  limit?: number; // Maximum number of orders to fetch
  customerId?: string; // Filter orders by customer ID
}

export interface GetOneOrderDto {
  paymentIntentId: string; // ID of the payment intent (Stripe's order equivalent)
}
