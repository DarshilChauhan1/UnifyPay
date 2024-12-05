import { GatewaysMerge } from '../gateways.merge';
import { MergeCreateOrder } from './types/createOrder.types';
import { MergerGetAllOrders } from './types/getAllOrder.types';
import { MergerGetOrderById } from './types/getOrderById.types';

export class MergerOrders {
    constructor(private providerGateway: GatewaysMerge) {}

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

            return (await providerInstance.createOrder(payload.payload)) as Promise<MergeCreateOrder[K]['returnType']>;
        } catch (error) {
            console.error('Error creating order:', error);
            throw error; // Re-throw the error after logging it
        }
    }

    async getAll<K extends keyof MergerGetAllOrders>(payload: {
        provider: K;
        payload: MergerGetAllOrders[K]['payload'];
    }): Promise<MergerGetAllOrders[K]['returnType']> {
        try {
            const { provider } = payload;
            const providerInstance = this.getProvider(provider);

            if (!providerInstance) {
                throw new Error(`Provider ${provider} is not initialized.`);
            }

            return await providerInstance.getAllOrders(payload.payload);
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

            return await providerInstance.getOrder(payload.payload);
        } catch (error) {
            console.error('Error fetching order:', error);
            throw error; // Re-throw the error after logging it
        }
    }

    private getProvider(name: string): any {
        const provider = this.providerGateway.getProviderInstance(name);
        if (!provider) {
            throw new Error(`Provider ${name} is not initialized.`);
        }
        return provider;
    }
}
