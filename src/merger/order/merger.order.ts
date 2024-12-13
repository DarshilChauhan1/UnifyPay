import { MergerGateways } from '../interfaces/merger.gateways.interface';
import { ProviderManager } from '../providerManager.merger';
import { MergeCreateOrder } from './types/createOrder.types';
import { MergerGetAllOrders } from './types/getAllOrder.types';
import { MergerGetOrderById } from './types/getOrderById.types';
import { MergerUpdateOrder } from './types/updateOrder.types';

export class MergerOrders {
    constructor(private providerGateway: ProviderManager) {}

    async create<K extends keyof MergeCreateOrder>(payload: {
        provider: K;
        payload: MergeCreateOrder[K]['payload'];
    }): Promise<MergeCreateOrder[K]['returnType']> {
        try {
            const { provider } = payload;
            const providerInstance = this.getProvider(provider);

            if (!providerInstance) {
                throw new Error(`Provider ${provider} is not initialized.`);
            }

            return providerInstance.createOrder(payload.payload) as Promise<MergeCreateOrder[K]['returnType']>;
        } catch (error) {
            throw error;
        }
    }

    async getAll<K extends keyof MergerGetAllOrders>(payload: {
        provider: K;
        payload?: MergerGetAllOrders[K]['payload'];
    }): Promise<MergerGetAllOrders[K]['returnType']> {
        try {
            const { provider } = payload;
            const providerInstance = this.getProvider(provider);

            if (!providerInstance) {
                throw new Error(`Provider ${provider} is not initialized.`);
            }

            return providerInstance.getAllOrders(payload.payload);
        } catch (error) {
            console.error('Error fetching orders:', error);
            throw error; // Re-throw the error after logging it
        }
    }

    async get<K extends keyof MergerGetOrderById>(payload: {
        provider: K;
        payload: MergerGetOrderById[K]['payload'];
    }): Promise<MergerGetOrderById[K]['returnType']> {
        try {
            const { provider } = payload;
            const providerInstance = this.getProvider(provider);

            if (!providerInstance) {
                throw new Error(`Provider ${provider} is not initialized.`);
            }

            return providerInstance.getOrderById(payload.payload);
        } catch (error) {
            console.error('Error fetching order:', error);
            throw error; // Re-throw the error after logging it
        }
    }

    async update<K extends keyof MergerUpdateOrder>(payload: {
        provider: K;
        payload: MergerUpdateOrder[K]['payload'];
    }): Promise<MergerUpdateOrder[K]['returnType']> {
        try {
            const { provider } = payload;
            const providerInstance = this.getProvider(provider);

            if (!providerInstance) {
                throw new Error(`Provider ${provider} is not initialized.`);
            }

            return providerInstance.updateOrder(payload.payload);
        } catch (error) {
            console.error('Error updating order:', error);
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
