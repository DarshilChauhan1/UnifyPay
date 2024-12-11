import Stripe from 'stripe';
import { Currency } from '../../../../common/types/currency.types';

export interface QueryStripePlanDto {
    active?: boolean;
    currency?: Currency;
    plansFromDate?: Date | string; // Inclusive
    plansTillDate?: Date | string; // Inclusive
    limit?: number;
    lastRecordId?: string;
    stripeExtraParams?: Partial<Stripe.PriceListParams>;
    stripeExtraOptions?: Stripe.RequestOptions;
}

export interface QueryStripeOnePlanDto {
    planId: string;
    stripeExtraParams?: Partial<Stripe.PriceRetrieveParams>;
    stripeExtraOptions?: Stripe.RequestOptions;
}
