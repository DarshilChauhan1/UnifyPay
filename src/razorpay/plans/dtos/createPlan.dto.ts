import { Currency } from '../../../common/types/currency.type';
import { RazorPayBillingFrequency } from '../../../common/types/billingFrequency.types';
export interface CreatePlanDto {
    billingFrequency: RazorPayBillingFrequency;
    billingInterval: number;
    name: string;
    planAmount: number;
    currency: Currency;
    planDescription?: string;
    notes?: any;
}
