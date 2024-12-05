export interface QueryRazorpaySubscriptionDto {
    planId?: string;
    subscritptionFrom?: Date;
    subscriptionTo?: Date;
    totalSubscription?: number;
    skipSubscription?: number;
}

export interface QueryRazorpayOneSubscriptionDto {
    subscriptionId: string;
}
