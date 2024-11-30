import { IMap } from "razorpay/dist/types/api";

export interface CreatePlanDto {
    billingFrequency : RazorPayBillingFrequency,
    billingInterval : number,
    name : string,
    planAmount : number,
    currency : Currency,
    planDescription ?: string,
    notes ?: any
}