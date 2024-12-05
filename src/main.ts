import { GatewayProvider } from './common/types/providers.types';
import { GatewaysMerge } from './merger/gateways.merge';

const unify = new GatewaysMerge([
    {
        type: GatewayProvider.Stripe,
        config: {
            apiKey: '',
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
    const response = await unify.orders.get({
        provider: GatewayProvider.Razorpay,
        payload: {
            orderId: '',
        },
    });
    console.log('response', response);
};

createOrder();
