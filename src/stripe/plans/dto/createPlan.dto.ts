import Stripe from 'stripe'

export interface CreatePlanDto {
    amount: number
    currency: Currency
    interval: StripeBillingFrequency
    product: string | Stripe.PlanCreateParams.Product
    nickname: string
    metadata: any
    active: boolean
}
