import Stripe from 'stripe';
import { Currency } from '../../../../common/types/currency.types';

interface BaseStripeOrderDto {
    amount: number; // pass the amount in paise, e.g., 29900 for 299
    currency: Currency; // ISO currency code
    customerEmail?: string;
    metadata?: Record<string, any>;
    name?: string;
    quantity?: number;
    stripeExtraParams?: Partial<Stripe.Checkout.SessionCreateParams>;
    stripeExtraOptions?: Stripe.RequestOptions;
}

export type CreateStripeOrderDto =
    | ({
          uiMode: 'hosted';
          successUrl: string;
          cancelUrl: string;
          returnUrl?: never;
      } & BaseStripeOrderDto)
    | ({
          uiMode?: 'embedded';
      } & BaseStripeOrderDto & {
              returnUrl: string;
              successUrl?: never;
              cancelUrl?: never;
          });
