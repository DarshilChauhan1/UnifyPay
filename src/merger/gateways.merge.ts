import { GatewayProvider, Provider } from '../common/types/providers.types';
import { RazorpayProvider } from '../gateways/providers/razorpay.provider';
import { StripeProvider } from '../gateways/providers/stripe.provider';
import { MergerGateways } from './interfaces/merger.gateways.interface';

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
    // async createOrder(payload: MergeCreateOrder): Promise<MergeCreateOrder['returnType']> {
    //     const { provider } = payload;
    //     const providerInstance = this.providersMap.get(provider);

    //     if (!providerInstance) {
    //         throw new Error(`Provider ${provider} is not initialized.`);
    //     }

    //     return Promise.resolve(providerInstance.createOrder(payload.payload)) as Promise<
    //         MergeCreateOrder['returnType']
    //     >;
    // }
    /********Working code****** */

    // async createOrder<K extends keyof MergeCreateOrder>(payload: {
    //     provider: K;
    //     payload: MergeCreateOrder[K]['payload'];
    // }): Promise<MergeCreateOrder[K]['returnType']> {
    //     const { provider } = payload;
    //     const providerInstance = this.providersMap.get(provider);

    //     if (!providerInstance) {
    //         throw new Error(`Provider ${provider} is not initialized.`);
    //     }

    //     return providerInstance.createOrder(payload.payload) as Promise<MergeCreateOrder[K]['returnType']>;
    //     providerInstance.
    // }
}
