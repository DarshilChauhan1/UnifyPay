export interface QueryRazorpaySubscriptionDto {
    planId?: string;
    subscritptionsFromDate?: Date | string;
    subscriptionTillDate?: Date | string;
    totalSubscription?: number;
    skipSubscription?: number;
}

export interface QueryRazorpayOneSubscriptionDto {
    subscriptionId: string;
}
