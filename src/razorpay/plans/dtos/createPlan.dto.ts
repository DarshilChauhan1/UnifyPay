import { RazorPayBillingFrequency } from '../../../common/types/billingFrequency.types';
import { Currency } from '../../../common/types/currency.types';
export interface CreatePlanDto {
    billingFrequency: RazorPayBillingFrequency;
    billingInterval: number;
    name: string;
    planAmount: number;
    currency: Currency;
    planDescription?: string;
    notes?: any;
}
