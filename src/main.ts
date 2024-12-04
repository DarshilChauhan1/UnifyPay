import { GatewayProvider } from './common/types/providers.types';
import { GatewaysMerge } from './merger/gateways.merge';

const unify = new GatewaysMerge([
    {
        type: GatewayProvider.Stripe,
        config: {
            apiKey: 'stripe-api-key',
        },
    },
    {
        type: GatewayProvider.Razorpay,
        config: {
            keyId: '',
            keySecret: '',
        },
    },
]);

const createOrder = async () => {
    const response = await unify.createOrder({
        provider: GatewayProvider.Razorpay,
        payload: {
            amount: 100,
            currency: 'INR',
            apiKey: '',
        },
    });
    console.log(response);
};

createOrder();
