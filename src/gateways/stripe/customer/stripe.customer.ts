import Stripe from 'stripe';
import { CreateCustomerDto } from './dto/createCustomer.dto';
import { UpdateCustomerDto } from './dto/updateCustomer.dto';

class StripeCustomer {
    private stripe: Stripe;
    constructor(stripeInstance: Stripe) {
        this.stripe = stripeInstance;
    }

    async createCustomer(payload: CreateCustomerDto): Promise<Stripe.Customer> {
        try {
            const { email, name, description, phone, address, metadata } = payload;
            const customer = await this.stripe.customers.create({
                email,
                name,
                description,
                phone,
                address,
                metadata,
            });
            return customer;
        } catch (error) {
            return error;
        }
    }

    async retrieveCustomer(customerId: string): Promise<Stripe.Customer> {
        try {
            const customer = await this.stripe.customers.retrieve(customerId);
            return customer as Stripe.Customer;
        } catch (error) {
            return error;
        }
    }

    async updateCustomer(payload: UpdateCustomerDto): Promise<Stripe.Customer> {
        try {
            const { email, name, phone, address, description, metadata } = payload;
            const customer = await this.stripe.customers.update(payload.customerId, {
                email,
                name,
                phone,
                address,
                description,
                metadata,
            });
            return customer;
        } catch (error) {
            return error;
        }
    }

    async deleteCustomer(customerId: string): Promise<Stripe.DeletedCustomer> {
        try {
            const deletedCustomer = await this.stripe.customers.del(customerId);
            return deletedCustomer;
        } catch (error) {
            return error;
        }
    }
}

export default StripeCustomer;
