import Stripe from 'stripe';

export interface UpdateStripePlanDto {
    planId: string;
    active: boolean;
    metadata: any;
    nickname: string;
    stripeExtraParams?: Partial<Stripe.PriceUpdateParams>;
    stripeExtraOptions?: Stripe.RequestOptions;
}
