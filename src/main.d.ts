/**
 * This library uses the Stripe and Razorpay APIs for payment operations.
 *
 * Stripe API Documentation: https://stripe.com/docs/api
 * Razorpay API Documentation: https://razorpay.com/docs/api
 *
 * Disclaimer: This library is not affiliated with or endorsed by Stripe or Razorpay.
 */
import { GatewayProvider, Provider } from './common/types/providers.types';
import { RazorpayProvider } from './gateways/providers/razorpay.provider';
import { StripeProvider } from './gateways/providers/stripe.provider';
import { MergerGateways } from './merger/interfaces/merger.gateways.interface';
import { RazorpaySpecificMethods } from './merger/interfaces/razorpaySpecific.interface';
import { StripeSpecificMethods } from './merger/interfaces/stripeSpecific.interface';
import { MergerOrders } from './merger/order/merger.order';
import { MergerPlan } from './merger/plan/merger.plan';
import { ProviderManager } from './merger/providerManager.merger';
import { MergerSubscription } from './merger/subscription/merger.subscription';

export { GatewayProvider };

export class UnifyPay {
    public providers: Provider[];
    public providersMap = new Map<string, MergerGateways>();
    public readonly orders: MergerOrders;
    public readonly plans: MergerPlan;
    public readonly subscriptions: MergerSubscription;
    private providerManager: ProviderManager;

    constructor(providers: Provider[]) {
        this.providerManager = new ProviderManager(providers);
        this.orders = new MergerOrders(this.providerManager);
        this.plans = new MergerPlan(this.providerManager);
        this.subscriptions = new MergerSubscription(this.providerManager);
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

    public get razorpay(): RazorpaySpecificMethods {
        return this.providerManager.getProvider(GatewayProvider.Razorpay) as RazorpayProvider;
    }

    public get stripe(): StripeSpecificMethods {
        return this.providerManager.getProvider(GatewayProvider.Stripe) as StripeProvider;
    }
}
