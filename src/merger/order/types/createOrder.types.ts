import { Orders } from 'razorpay/dist/types/orders';
import Stripe from 'stripe';
import { GatewayProvider } from '../../../common/types/providers.types';
import { CreateRazorPayOrderDto } from '../../../gateways/razorpay/orders/dto/createOrder.dto';
import { RazorpayCheckoutSession } from '../../../gateways/razorpay/orders/types/CheckoutSession.types';
import { CreateStripeOrderDto } from '../../../gateways/stripe/orders/dto/createOrder.dto';

export type MergeCreateOrder = {
    [GatewayProvider.Razorpay]: {
        payload: CreateRazorPayOrderDto;
        returnType: {
            orderData: Orders.RazorpayOrder;
            checkoutSessionData: RazorpayCheckoutSession;
        };
    };
    [GatewayProvider.Stripe]: {
        payload: CreateStripeOrderDto;
        returnType: Stripe.Checkout.Session;
    };
};
