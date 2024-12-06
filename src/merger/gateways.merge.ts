import { GatewayProvider, Provider } from '../common/types/providers.types';
import { RazorpayProvider } from '../gateways/providers/razorpay.provider';
import { StripeProvider } from '../gateways/providers/stripe.provider';
import { MergerGateways } from './interfaces/merger.gateways.interface';
import { MergerOrders } from './order/merger.order';
import { MergerPlan } from './plan/merger.plan';
import { MergerSubscription } from './subscription/merger.subscription';

export class GatewaysMerge {
    private providers: Provider[];
    private providersMap = new Map<string, MergerGateways>();
    public readonly orders: MergerOrders;
    public readonly plans: MergerPlan;
    public readonly subscriptions: MergerSubscription;
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
        this.plans = new MergerPlan(this);
        this.subscriptions = new MergerSubscription(this);
    }

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
