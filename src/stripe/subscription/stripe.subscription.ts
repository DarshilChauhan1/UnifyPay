import Stripe from 'stripe';
import { parseQueryParams } from '../../common/helpers/parseQueryParams.helper';
import { StripeCredentials } from '../../common/types/credentials.types';
import StripeCustomer from '../customer/stripe.customer';
import { CreateSubscriptionDto } from './dto/createSubscription.dto';
import { QuerySubscriptionDto } from './dto/querySubscription.dto';
import { UpdateSubscriptionDto } from './dto/updateSubcription.dto';

class StripeSubscription {
    private stripe: Stripe;
    private stripeCustomer: StripeCustomer;
    constructor(credentials: StripeCredentials) {
        this.stripe = new Stripe(credentials.apiKey, {
            apiVersion: credentials.apiVersion,
        });
    }

    async createSubscription(payload: CreateSubscriptionDto): Promise<Stripe.Subscription> {
        try {
            const { priceId, metadata, cancelAtPeriodEnd, description, offerId, planQuantity, name, email, phone } =
                payload;

            const customer = await this.stripeCustomer.createCustomer({
                name: name ?? 'Guest',
                email,
                phone,
            });
            const subscription = await this.stripe.subscriptions.create({
                customer: customer.id,
                items: [{ price: priceId, quantity: planQuantity }],
                metadata,
                description,
                discounts: offerId ? [{ coupon: offerId }] : [],
                cancel_at_period_end: cancelAtPeriodEnd,
            });
            return subscription;
        } catch (error) {
            return error;
        }
    }

    async getAllSubscriptions(payload: QuerySubscriptionDto): Promise<Stripe.ApiList<Stripe.Subscription>> {
        try {
            const { priceId, limit, lastRecordId, subscriptionTo, subscritptionFrom } = payload;
            const formatDates = parseQueryParams({ from: subscritptionFrom, to: subscriptionTo });
            const query = {};
            if (priceId) {
                query['price'] = priceId;
            }

            if (limit) {
                query['limit'] = limit;
            }

            if (lastRecordId) {
                query['starting_after'] = lastRecordId;
            }

            const subscriptions = await this.stripe.subscriptions.list({
                ...query,
                ...formatDates,
            });

            return subscriptions;
        } catch (error) {
            return error;
        }
    }

    async getSubscriptionById(subscriptionId: string): Promise<Stripe.Subscription> {
        try {
            const subscription = await this.stripe.subscriptions.retrieve(subscriptionId);
            return subscription;
        } catch (error) {
            return error;
        }
    }

    async updateSubscription(payload: UpdateSubscriptionDto): Promise<Stripe.Subscription> {
        try {
            const { cancelAtPeriodEnd, metadata, offerId, planQuantity, priceId } = payload;
            return await this.stripe.subscriptions.update(priceId, {
                cancel_at_period_end: cancelAtPeriodEnd,
                metadata,
                items: [{ id: priceId, quantity: planQuantity }],
                discounts: offerId ? [{ coupon: offerId }] : [],
            });
        } catch (error) {
            throw error;
        }
    }

    async cancelSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
        try {
            return await this.stripe.subscriptions.cancel(subscriptionId);
        } catch (error) {
            throw error;
        }
    }

    async deleteOfferFromSubscription(subscriptionId: string): Promise<Stripe.DeletedDiscount> {
        try {
            return await this.stripe.subscriptions.deleteDiscount(subscriptionId);
        } catch (error) {
            throw error;
        }
    }

    async pauseSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
        try {
            return await this.stripe.subscriptions.update(subscriptionId, {
                pause_collection: { behavior: 'void' },
            });
        } catch (error) {
            throw error;
        }
    }

    async resumeSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
        try {
            return await this.stripe.subscriptions.resume(subscriptionId);
        } catch (error) {
            throw error;
        }
    }
}

export default StripeSubscription;
