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
    try {
        const priceCreation2 = await unify.plans.create({
            provider: GatewayProvider.Stripe,
            payload: {
                active: true,
                currency: 'USD',
                amount: 1200,
                name: 'Test Plan 2',
                interval: 'year',
            },
        });

        const razorpayPlans = await unify.plans.create({
            provider: GatewayProvider.Razorpay,
            payload: {
                name: 'Test Plan',
                billingFrequency: 'monthly',
                billingInterval: 1,
                currency: 'INR',
                planAmount: 1000,
                planDescription: 'Test Plan Description',
            },
        });

        console.log('Response:', priceCreation2);
        console.log('Response:', razorpayPlans);
    } catch (error) {
        console.error('Error creating order:', error);
    }
}

createOrder();
