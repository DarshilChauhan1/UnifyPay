import { Orders } from 'razorpay/dist/types/orders';
import Stripe from 'stripe';
import { GatewayProvider } from '../../../common/types/providers.types';
import { UpdateRazorpayOrderDto } from '../../../gateways/razorpay/orders/dto/upateOrder.dto';
import { UpdateStripeOrderDto } from '../../../gateways/stripe/orders/dto/updateOrder.dto';

export type MergerUpdateOrder = {
    [GatewayProvider.Razorpay]: {
        payload: UpdateRazorpayOrderDto;
        returnType: Orders.RazorpayOrder;
    };
    [GatewayProvider.Stripe]: {
        payload: UpdateStripeOrderDto;
        returnType: Stripe.Checkout.Session;
    };
};
