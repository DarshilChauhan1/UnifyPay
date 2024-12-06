import { GatewayProvider } from './common/types/providers.types';
import { UnifyPay } from './main';

const unify = new UnifyPay([
    {
        config: {
            apiKey: '',
        },
        type: GatewayProvider.Stripe,
    },
    {
        type: GatewayProvider.Razorpay,
        config: {
            keyId: '',
            keySecret: '',
        },
    },
]);

async function createOrder() {
    await unify.orders.create({
        provider: GatewayProvider.Stripe,
        payload: {
            amount: 100,
            currency: '',
            cancelUrl: '',
        },
    });
}

createOrder();
