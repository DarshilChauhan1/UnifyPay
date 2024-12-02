export interface UpdateSubscriptionDto {
    cancelAtPeriodEnd?: boolean;
    metadata?: any;
    planQuantity?: number;
    priceId?: string;
    offerId?: string;
}
