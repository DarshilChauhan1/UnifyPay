export class CreateSubscriptionDto {
    name: string;
    email?: string;
    phone?: string;
    priceId: string;
    cancelAtPeriodEnd?: boolean;
    description?: string;
    offerId?: string;
    planQuantity?: number;
    metadata?: any;
}
