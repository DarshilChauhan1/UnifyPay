import { MergerGateways } from '../interfaces/merger.gateways.interface';
import { ProviderManager } from '../providerManager.merger';
import { MergerCancelSubscription } from './types/cancelSubscription.types';
import { MergerCreateSubscription } from './types/createSubscription.types';
import { MergerDeleteSubscriptionOffer } from './types/deleteSubscriptionOffer.types';
import { MergerGetAllSubscription } from './types/getAllSubscription.types';
import { MergerGetSubscriptionById } from './types/getSubscriptionById.types';
import { MergerPauseSubscription } from './types/pauseSubscription.types';
import { MergerResumeSubscription } from './types/resumeSubscription.types';
import { MergerUpdateSubscription } from './types/updateSubscription.types';

export class MergerSubscription {
    constructor(private providerGateway: ProviderManager) {}

    async create<K extends keyof MergerCreateSubscription>(payload: {
        provider: K;
        payload: MergerCreateSubscription[K]['payload'];
    }): Promise<MergerCreateSubscription[K]['returnType']> {
        try {
            const { provider } = payload;
            const providerInstance = this.getProvider(provider);

            if (!providerInstance) {
                throw new Error(`Provider ${provider} is not initialized.`);
            }

            return providerInstance.createSubscription(payload.payload) as Promise<
                MergerCreateSubscription[K]['returnType']
            >;
        } catch (error) {
            console.error('Error creating subscription:', error);
            throw error; // Re-throw the error after logging it
        }
    }

    async getAll<K extends keyof MergerGetAllSubscription>(payload: {
        provider: K;
        payload: MergerGetAllSubscription[K]['payload'];
    }): Promise<MergerGetAllSubscription[K]['returnType']> {
        try {
            const { provider } = payload;
            const providerInstance = this.getProvider(provider);

            if (!providerInstance) {
                throw new Error(`Provider ${provider} is not initialized.`);
            }

            return providerInstance.getAllSubscriptions(payload.payload);
        } catch (error) {
            console.error('Error fetching subscriptions:', error);
            throw error; // Re-throw the error after logging it
        }
    }

    async get<K extends keyof MergerGetSubscriptionById>(payload: {
        provider: K;
        payload: MergerGetSubscriptionById[K]['payload'];
    }): Promise<MergerGetSubscriptionById[K]['returnType']> {
        try {
            const { provider } = payload;
            const providerInstance = this.getProvider(provider);

            if (!providerInstance) {
                throw new Error(`Provider ${provider} is not initialized.`);
            }

            return providerInstance.getSubscriptionById(payload.payload);
        } catch (error) {
            console.error('Error fetching subscription:', error);
            throw error; // Re-throw the error after logging it
        }
    }

    async update<K extends keyof MergerUpdateSubscription>(payload: {
        provider: K;
        subscriptionId: string;
        payload: MergerUpdateSubscription[K]['payload'];
    }): Promise<MergerUpdateSubscription[K]['returnType']> {
        try {
            const { provider } = payload;
            const providerInstance = this.getProvider(provider);

            if (!providerInstance) {
                throw new Error(`Provider ${provider} is not initialized.`);
            }

            return providerInstance.updateSubscription(payload.subscriptionId, payload.payload);
        } catch (error) {
            console.error('Error updating subscription:', error);
            throw error; // Re-throw the error after logging it
        }
    }

    async cancel<K extends keyof MergerCancelSubscription>(payload: {
        provider: K;
        payload: MergerCancelSubscription[K]['payload'];
    }): Promise<MergerCancelSubscription[K]['returnType']> {
        try {
            const { provider } = payload;
            const providerInstance = this.getProvider(provider);

            if (!providerInstance) {
                throw new Error(`Provider ${provider} is not initialized.`);
            }

            return providerInstance.cancelSubscription(payload.payload);
        } catch (error) {
            console.error('Error canceling subscription:', error);
            throw error; // Re-throw the error after logging it
        }
    }

    async pause<K extends keyof MergerPauseSubscription>(payload: {
        provider: K;
        payload: MergerPauseSubscription[K]['payload'];
    }): Promise<MergerPauseSubscription[K]['returnType']> {
        try {
            const { provider } = payload;
            const providerInstance = this.getProvider(provider);

            if (!providerInstance) {
                throw new Error(`Provider ${provider} is not initialized.`);
            }

            return providerInstance.pauseSubscription(payload.payload);
        } catch (error) {
            console.error('Error pausing subscription:', error);
            throw error; // Re-throw the error after logging it
        }
    }

    async deleteOffer<K extends keyof MergerDeleteSubscriptionOffer>(payload: {
        provider: K;
        payload: MergerDeleteSubscriptionOffer[K]['payload'];
    }): Promise<MergerDeleteSubscriptionOffer[K]['returnType']> {
        try {
            const { provider } = payload;
            const providerInstance = this.getProvider(provider);

            if (!providerInstance) {
                throw new Error(`Provider ${provider} is not initialized.`);
            }

            return providerInstance.deleteOfferOfSubscription(payload.payload);
        } catch (error) {
            console.error('Error deleting offer from subscription:', error);
            throw error; // Re-throw the error after logging it
        }
    }

    async resume<K extends keyof MergerResumeSubscription>(payload: {
        provider: K;
        payload: MergerResumeSubscription[K]['payload'];
    }): Promise<MergerResumeSubscription[K]['returnType']> {
        try {
            const { provider } = payload;
            const providerInstance = this.getProvider(provider);

            if (!providerInstance) {
                throw new Error(`Provider ${provider} is not initialized.`);
            }

            return providerInstance.resumeSubscription(payload.payload);
        } catch (error) {
            console.error('Error resuming subscription:', error);
            throw error; // Re-throw the error after logging it
        }
    }

    private getProvider(name: string): MergerGateways {
        const provider = this.providerGateway.getProvider(name);
        if (!provider) {
            throw new Error(`Provider ${name} is not initialized.`);
        }
        return provider;
    }
}
