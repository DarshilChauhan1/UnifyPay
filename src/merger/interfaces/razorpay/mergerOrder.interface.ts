import { Orders } from 'razorpay/dist/types/orders';
import { CreateRazorPayOrderDto } from '../../../razorpay/orders/dto/createOrder.dto';
import { CreateStripeOrderDto } from '../../../stripe/orders/dto/createOrder.dto';
import Stripe from 'stripe';
import { GatewayProvider } from '../../../common/types/providers.types';

export interface MergerRazorPayCreateOrderDto {
    provider: GatewayProvider.Razorpay;
    payload: CreateRazorPayOrderDto;
    returnType?: {
        orderData: Orders.RazorpayOrder;
        checkoutSessionData: any;
    };
}

export interface MergerStripeCreateOrderDto {
    provider: GatewayProvider.Stripe;
    payload: CreateStripeOrderDto;
    returnType?: Stripe.Checkout.Session;
}

export type MergeCreaterOrder = MergerRazorPayCreateOrderDto | MergerStripeCreateOrderDto;
