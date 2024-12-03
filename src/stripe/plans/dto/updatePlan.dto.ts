import Stripe from 'stripe';

export interface UpdatePlanDto {
    priceId: string;
    active: boolean;
    metadata: any;
    nickname: string;
    stripeExtraParams?: Stripe.PriceUpdateParams;
    stripeExtraOptions?: Stripe.RequestOptions;
}
