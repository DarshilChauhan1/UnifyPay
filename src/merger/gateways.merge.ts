import { GatewayProvider, Provider } from '../common/types/providers.types';
import { RazorpayProvider } from '../providers/razorpay.provider';
import { StripeProvider } from '../providers/stripe.provider';
import { MergerGateways } from './interfaces/mergerGateways.interface';
import { MergeCreaterOrder } from './interfaces/razorpay/mergerOrder.interface';

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

    /********Working code****** */
    // async createOrder(payload: MergerRazorPayCreateOrderDto): Promise<MergerRazorPayCreateOrderDto['returnType']>;
    // async createOrder(payload: MergerStripeCreateOrderDto): Promise<MergerStripeCreateOrderDto['returnType']>;

    // /* ------------------ Orders ------------------------*/
    // async createOrder(payload: MergeCreaterOrder): Promise<MergeCreaterOrder['returnType']> {
    //     const { provider } = payload;
    //     const providerInstance = this.providersMap.get(provider);

    //     if (!providerInstance) {
    //         throw new Error(`Provider ${provider} is not initialized.`);
    //     }

    //     return Promise.resolve(providerInstance.createOrder(payload.payload)) as Promise<
    //         MergeCreaterOrder['returnType']
    //     >;
    // }
    /********Working code****** */

    async createOrder<K extends keyof MergeCreaterOrder>(payload: {
        provider: K;
        payload: MergeCreaterOrder[K]['payload'];
    }): Promise<MergeCreaterOrder[K]['returnType']> {
        const { provider } = payload;
        const providerInstance = this.providersMap.get(provider);

        if (!providerInstance) {
            throw new Error(`Provider ${provider} is not initialized.`);
        }

        return providerInstance.createOrder(payload.payload) as Promise<MergeCreaterOrder[K]['returnType']>;
    }
}
