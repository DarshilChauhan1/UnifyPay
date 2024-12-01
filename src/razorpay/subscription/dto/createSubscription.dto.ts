import { Currency } from "../../../common/types/currency.type";

export interface CreateSubscriptionDto{
    planId : string,
    totalBillingCycles : number,
    planQuantity ?: number,
    planStartAt ?: Date,
    paymentExpiry ?: Date,
    notifyCustomer ?: boolean,
    upfrontAddonsList ?: UpFrontAmountDto[],
    offerId ?: string,
    notes ?: any,
}

export interface UpFrontAmountDto {
    name ?: string,
    amount ?: number,
    currency ?: Currency,
}