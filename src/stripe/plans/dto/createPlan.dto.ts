import Stripe from 'stripe';
import { StripeBillingFrequency } from '../../../common/types/billingFrequency.types';
import { Currency } from '../../../common/types/currency.type';

export interface CreatePlanDto {
    amount: number;
    currency: Currency;
    interval: StripeBillingFrequency;
    product: string | Stripe.PlanCreateParams.Product;
    nickname: string;
    metadata: any;
    active: boolean;
}
