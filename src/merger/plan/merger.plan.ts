import { GatewaysMerge } from '../gateways.merge';
import { MergerGateways } from '../interfaces/merger.gateways.interface';
import { MergerCreatePlan } from './types/createPlan.types';
import { MergerGetAllPlans } from './types/getAllPlan.types';
import { MergerGetPlanById } from './types/getPlanById.types';

export class MergerPlan {
    constructor(private providerGateway: GatewaysMerge) {}

    async create<K extends keyof MergerCreatePlan>(payload: {
        provider: K;
        payload: MergerCreatePlan[K]['payload'];
    }): Promise<MergerCreatePlan[K]['returnType']> {
        try {
            const { provider } = payload;
            const providerInstance = this.getProvider(provider);

            if (!providerInstance) {
                throw new Error(`Provider ${provider} is not initialized.`);
            }

            return providerInstance.createPlan(payload.payload) as Promise<MergerCreatePlan[K]['returnType']>;
        } catch (error) {
            console.error('Error creating plan:', error);
            throw error; // Re-throw the error after logging it
        }
    }

    async getAll<K extends keyof MergerGetAllPlans>(payload: {
        provider: K;
        payload: MergerGetAllPlans[K]['payload'];
    }): Promise<MergerGetAllPlans[K]['returnType']> {
        try {
            const { provider } = payload;
            const providerInstance = this.getProvider(provider);

            if (!providerInstance) {
                throw new Error(`Provider ${provider} is not initialized.`);
            }

            return providerInstance.getAllPlans(payload.payload);
        } catch (error) {
            console.error('Error fetching plans:', error);
            throw error; // Re-throw the error after logging it
        }
    }

    async get<K extends keyof MergerGetPlanById>(payload: {
        provider: K;
        payload: MergerGetPlanById[K]['payload'];
    }): Promise<MergerGetPlanById[K]['returnType']> {
        try {
            const { provider } = payload;
            const providerInstance = this.getProvider(provider);

            if (!providerInstance) {
                throw new Error(`Provider ${provider} is not initialized.`);
            }

            return providerInstance.getPlanById(payload.payload);
        } catch (error) {
            console.error('Error fetching plan:', error);
            throw error; // Re-throw the error after logging it
        }
    }

    // /**
    //  * Only for Stripe
    //  * @param payload
    //  */
    // async update(payload: UpdateStripePlanDto): Promise<Stripe.Price> {
    //     try {
    //         return await this.providerGateway.stripe.plan.update(payload);
    //     } catch (error) {
    //         console.error('Error updating plan:', error);
    //         throw error;
    //     }
    // }

    private getProvider(name: string): MergerGateways {
        const provider = this.providerGateway.getProviderInstance(name);
        if (!provider) {
            throw new Error(`Provider ${name} is not initialized.`);
        }
        return provider;
    }
}
