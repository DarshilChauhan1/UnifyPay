import { GatewayProvider, Provider } from '../common/types/providers.types';
import { RazorpayProvider } from '../gateways/providers/razorpay.provider';
import { StripeProvider } from '../gateways/providers/stripe.provider';
import { MergerGateways } from './interfaces/merger.gateways.interface';
import { MergerOrders } from './order/merger.order';

export class GatewaysMerge {
    private providers: Provider[];
    private providersMap = new Map<string, MergerGateways>();
    public readonly orders: MergerOrders;
    constructor(providers: Provider[]) {
        providers.forEach(({ type, config }) => {
            console.log('type', type);
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
        this.orders = new MergerOrders(this);
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

    private getProvider(name: string): MergerGateways {
        const provider = this.providersMap.get(name);
        if (!provider) {
            throw new Error(`Provider ${name} is not initialized.`);
        }
        return provider;
    }

    public getProviderInstance(name: string): MergerGateways {
        return this.getProvider(name); // Controlled access through this method
    }
}
