import { Orders } from 'razorpay/dist/types/orders';
import { Provider, GatewayProvider } from '../common/types/providers.types';
import { RazorpayProvider } from '../providers/razorpay.provider';
import { StripeProvider } from '../providers/stripe.provider';
import { MergerGateways } from './interfaces/mergerGateways.interface';
import { MergeCreaterOrder } from './interfaces/razorpay/mergerOrder.interface';
import Stripe from 'stripe';

export class GatewaysMerge {
    private providers: Provider[];
    private providersMap = new Map<string, MergerGateways>();
    constructor(providers: Provider[]) {
        providers.forEach(({ type, config }) => {
            switch (type) {
                case GatewayProvider.Razorpay:
                    this.providersMap.set(type, new RazorpayProvider(config));
                    break;
                case GatewayProvider.Stripe:
                    this.providersMap.set(type, new StripeProvider(config));
                    break;
                default:
                    throw new Error(`Unknown provider type: ${type}`);
            }
        });
    }

    /* ------------------ Orders ------------------------*/
    async createOrder<T extends MergeCreaterOrder>(payload: T): Promise<T['returnType']> {
        const { provider } = payload;
        const providerInstance = this.providersMap.get(provider);

        if (!providerInstance) {
            throw new Error(`Provider ${provider} is not initialized.`);
        }

        //     if (provider === GatewayProvider.Razorpay) {
        //       return (await providerInstance.createOrder(orderPayload)) as T['returnType'];
        //     }

        //     if (provider === GatewayProvider.Stripe) {
        //       return (await providerInstance.createOrder(orderPayload)) as T['returnType'];
        //     }

        //     throw new Error(`Unsupported provider: ${provider}`);
        //   }
        const handlers: Record<GatewayProvider, () => Promise<any>> = {
            [GatewayProvider.Razorpay]: async () =>
                Promise.resolve({
                    id: 'rzp_order_1',
                    amount: 1000,
                    currency: 'INR',
                } as Orders.RazorpayOrder),
            [GatewayProvider.Stripe]: async () =>
                Promise.resolve({
                    id: 'cs_test_session',
                    url: 'https://checkout.stripe.com/test',
                } as Stripe.Checkout.Session),
        };

        const handler = handlers[provider];
        if (!handler) {
            throw new Error(`No handler found for provider: ${provider}`);
        }

        return handler() as Promise<T['returnType']>;
    }
}
