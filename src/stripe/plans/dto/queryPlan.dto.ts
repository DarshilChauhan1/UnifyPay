import Stripe from 'stripe';
import { Currency } from '../../../common/types/currency.types';

export interface QueryPlanDto {
    active?: boolean;
    currency?: Currency;
    createdAfter?: Date; // Inclusive
    createdBefore?: Date; // Inclusive
    limit?: number;
    lastRecordId?: string;
    stripeExtraParams?: Stripe.PriceListParams;
    stripeExtraOptions?: Stripe.RequestOptions;
}
