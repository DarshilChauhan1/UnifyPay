export interface QueryRazorpaySubscriptionDto {
    planId?: string;
    subscritptionsFromDate?: Date | string;
    subscriptionTillDate?: Date | string;
    subscriptionsToFetch?: number;
    skipSubscription?: number;
}

export interface QueryRazorpayOneSubscriptionDto {
    subscriptionId: string;
}
