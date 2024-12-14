import { UnifiedPayError } from '../../common/helpers/customError.error';
import { MergerGateways } from '../interfaces/merger.gateways.interface';
import { ProviderManager } from '../providerManager.merger';
import { MergerCreatePlan } from './types/createPlan.types';
import { MergerGetAllPlans } from './types/getAllPlan.types';
import { MergerGetPlanById } from './types/getPlanById.types';

export class MergerPlan {
    constructor(private providerGateway: ProviderManager) {}

    async create<K extends keyof MergerCreatePlan>(payload: {
        provider: K;
        payload: MergerCreatePlan[K]['payload'];
    }): Promise<MergerCreatePlan[K]['returnType']> {
        try {
            if (!payload || !payload?.provider) throw new UnifiedPayError(400, 'Payload and Provider is required');
            const { provider } = payload;
            const providerInstance = this.getProvider(provider);

            if (!providerInstance) {
                throw new Error(`Provider ${provider} is not initialized.`);
            }

            return providerInstance.createPlan(payload.payload) as Promise<MergerCreatePlan[K]['returnType']>;
        } catch (error) {
            throw error; // Re-throw the error after logging it
        }
    }

    async getAll<K extends keyof MergerGetAllPlans>(payload: {
        provider: K;
        payload?: MergerGetAllPlans[K]['payload'];
    }): Promise<MergerGetAllPlans[K]['returnType']> {
        try {
            if (!payload || !payload?.provider) throw new UnifiedPayError(400, 'Payload and Provider is required');
            const { provider } = payload;
            const providerInstance = this.getProvider(provider);

            if (!providerInstance) {
                throw new Error(`Provider ${provider} is not initialized.`);
            }

            return providerInstance.getAllPlans(payload.payload);
        } catch (error) {
            throw error; // Re-throw the error after logging it
        }
    }

    async get<K extends keyof MergerGetPlanById>(payload: {
        provider: K;
        payload: MergerGetPlanById[K]['payload'];
    }): Promise<MergerGetPlanById[K]['returnType']> {
        try {
            if (!payload || !payload?.provider) throw new UnifiedPayError(400, 'Payload and Provider is required');
            const { provider } = payload;
            const providerInstance = this.getProvider(provider);

            if (!providerInstance) {
                throw new Error(`Provider ${provider} is not initialized.`);
            }

            return providerInstance.getPlanById(payload.payload);
        } catch (error) {
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
