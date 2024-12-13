import { RazorPayBillingFrequency } from '../../../../common/types/billingFrequency.types';
import { Currency } from '../../../../common/types/currency.types';

export interface CreateRazorpayPlanDto {
    billingFrequency: RazorPayBillingFrequency;
    billingInterval: number;
    name: string;
    planAmount: number;
    currency: Currency;
    planDescription?: string;
    notes?: Record<string, any>;
}
