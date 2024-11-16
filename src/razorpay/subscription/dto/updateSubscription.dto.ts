export interface UpdateSubscriptionDto {
    planId ?: string,
    offerId ?: string,
    planQuantity ?: number,
    totalBillingCycles ?: number,
    subscriptionStartAt ?: Date,
    scheduleChangeAt ?: Date,
    customerNotify ?: boolean,
}