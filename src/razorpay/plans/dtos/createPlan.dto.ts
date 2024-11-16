import { IMap } from "razorpay/dist/types/api";
import { Currency } from "../../../common/types/currency.type";

export interface CreatePlanDto {
    billingFrequency : BillingFrequency,
    billingInterval : number,
    name : string,
    planAmount : number,
    currency : Currency,
    planDescription ?: string,
    notes ?: any
}

type BillingFrequency = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly' ;
