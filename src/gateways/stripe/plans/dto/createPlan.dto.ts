import Stripe from 'stripe';
import { StripeBillingFrequency } from '../../../../common/types/billingFrequency.types';
import { Currency } from '../../../../common/types/currency.types';

export interface CreateStripePlanDto {
    name: string;
    currency: Currency;
    active: boolean;
    amount: number;
    metadata?: Record<string, any>;
    nickname?: string;
    billingFrequency: StripeBillingFrequency;
    billingInterval?: number; // Required if recurring is set to 'interval'
    stripeExtraParams?: Partial<Stripe.PriceCreateParams>;
    stripeExtraOptions?: Stripe.RequestOptions;
}
