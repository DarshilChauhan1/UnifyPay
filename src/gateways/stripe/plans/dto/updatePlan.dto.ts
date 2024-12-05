import Stripe from 'stripe';

export interface UpdateStripePlanDto {
    active: boolean;
    metadata: any;
    nickname: string;
    stripeExtraParams?: Stripe.PriceUpdateParams;
    stripeExtraOptions?: Stripe.RequestOptions;
}
