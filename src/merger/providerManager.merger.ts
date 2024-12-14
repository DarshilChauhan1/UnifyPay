import { UnifiedPayError } from '../common/helpers/customError.error';
import { GatewayProvider, Provider } from '../common/types/providers.types';
import { RazorpayProvider } from '../gateways/providers/razorpay.provider';
import { StripeProvider } from '../gateways/providers/stripe.provider';
import { MergerGateways } from './interfaces/merger.gateways.interface';

export class ProviderManager {
    private providersMap = new Map<string, MergerGateways>();

    constructor(providers: Provider[]) {
        this.initializeProviders(providers);
    }

    private initializeProviders(providers: Provider[]): void {
        if (!providers || providers.length == 0) throw new UnifiedPayError(400, 'Providers are required');
        providers.forEach(({ type, config }) => {
            if (!type || !config) throw new UnifiedPayError(400, 'Provider type and config are required');
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

    public getProvider(name: string): MergerGateways {
        const provider = this.providersMap.get(name);
        if (!provider) {
            throw new UnifiedPayError(400, `Provider ${name ?? ''} is not initialized.`);
        }
        return provider;
    }
}
