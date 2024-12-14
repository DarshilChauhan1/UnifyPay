import { RazorPayCredentials, StripeCredentials } from './credentials.types';

export enum GatewayProvider {
    Razorpay = 'Razorpay',
    Stripe = 'Stripe',
}

export interface RazorpayProvider {
    type: GatewayProvider.Razorpay;
    config: RazorPayCredentials;
}

export interface StripeProvider {
    type: GatewayProvider.Stripe;
    config: StripeCredentials;
}

export type Provider = RazorpayProvider | StripeProvider;
