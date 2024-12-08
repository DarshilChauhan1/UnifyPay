import Stripe from 'stripe';
import { StripeBillingFrequency } from '../../../../common/types/billingFrequency.types';
import { Currency } from '../../../../common/types/currency.types';

export interface CreateStripePlanDto {
    name: string;
    currency: Currency;
    active: boolean;
    amount: number;
    metadata?: any;
    nickname?: string;
    interval: StripeBillingFrequency;
    intervalCount?: number; // Required if recurring is set to 'interval'
    stripeExtraParams?: Stripe.PriceCreateParams;
    stripeExtraOptions?: Stripe.RequestOptions;
}
