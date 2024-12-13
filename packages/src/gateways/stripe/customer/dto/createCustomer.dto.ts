import Stripe from 'stripe';

export class CreateCustomerDto {
    email: string;
    name: string;
    description?: string;
    phone?: string;
    address?: {
        line1: string;
        line2?: string;
        city: string;
        state: string;
        postal_code: string;
        country: string;
    };
    metadata?: Record<string, any>;
    stripeExtraParams?: Partial<Stripe.CustomerCreateParams>;
}
