import Stripe from 'stripe';
import { Currency } from '../../../../common/types/currency.types';

export interface CreateStripeOrderDto {
    // pass the amount in paise suppose if price is 299 then pass 29900
    amount: number;
    // ISO currency code
    currency: Currency;
    customerEmail?: string;
    metadata?: any;
    returnUrl?: string;
    successUrl?: string;
    cancelUrl?: string;
    name?: string;
    quantity?: number;
    stripeExtraParams?: Stripe.Checkout.SessionCreateParams;
    stripeExtraOptions?: Stripe.RequestOptions;
}
