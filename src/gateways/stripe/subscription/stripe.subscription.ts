import Stripe from 'stripe';
import { convertDateToUnix } from '../../../common/helpers/convertDateToUnix';
import StripeCustomer from '../customer/stripe.customer';
import { CreateStripeSubscriptionDto } from './dto/createSubscription.dto';
import { DeleteStripeSubscriptionDto } from './dto/deleteSubscription.dto';
import { QueryStripeOneSubscriptionDto, QueryStripeSubscriptionDto } from './dto/querySubscription.dto';
import {
    CancelStripeSubscriptionDto,
    PauseStripeSubscriptionDto,
    ResumeStripeSubscriptionDto,
    UpdateStripeSubscriptionDto,
} from './dto/updateSubcription.dto';

class StripeSubscription {
    private stripe: Stripe;
    private stripeCustomer: StripeCustomer;
    constructor(stripeInstance: Stripe) {
        this.stripe = stripeInstance;
    }

    async createSubscription(payload: CreateStripeSubscriptionDto): Promise<Stripe.Subscription> {
        try {
            const {
                priceId,
                metadata,
                description,
                offerId,
                planQuantity,
                name,
                email,
                phone,
                stripeExtraParams,
                stripeExtraOptions,
            } = payload;

            const customer = await this.stripeCustomer.createCustomer({
                name: name ?? 'Guest',
                email,
                phone,
            });
            const subscription = await this.stripe.subscriptions.create(
                {
                    customer: customer.id,
                    items: [{ price: priceId, quantity: planQuantity }],
                    metadata,
                    description,
                    discounts: offerId ? [{ coupon: offerId }] : [],
                    ...stripeExtraParams,
                },
                stripeExtraOptions,
            );
            return subscription;
        } catch (error) {
            return error;
        }
    }

    async getAllSubscriptions(payload: QueryStripeSubscriptionDto): Promise<Stripe.ApiList<Stripe.Subscription>> {
        try {
            const {
                priceId,
                limit,
                lastRecordId,
                subscriptionTo,
                subscritptionFrom,
                stripeExtraOptions,
                stripeExtraParams,
            } = payload;
            const formatDates = convertDateToUnix({ from: subscritptionFrom, to: subscriptionTo });
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

            const subscriptions = await this.stripe.subscriptions.list(
                {
                    ...query,
                    ...formatDates,
                    ...stripeExtraParams,
                },
                stripeExtraOptions,
            );

            return subscriptions;
        } catch (error) {
            return error;
        }
    }

    async getSubscriptionById({
        subscriptionId,
        stripeExtraOptions,
        stripeExtraParams,
    }: QueryStripeOneSubscriptionDto): Promise<Stripe.Subscription> {
        try {
            const subscription = await this.stripe.subscriptions.retrieve(
                subscriptionId,
                stripeExtraParams,
                stripeExtraOptions,
            );
            return subscription;
        } catch (error) {
            return error;
        }
    }

    async updateSubscription(
        subscriptionId: string,
        payload: UpdateStripeSubscriptionDto,
    ): Promise<Stripe.Subscription> {
        try {
            const { metadata, offerId, planQuantity, priceId, stripeExtraOptions, stripeExtraParams } = payload;
            return await this.stripe.subscriptions.update(
                priceId,
                {
                    metadata,
                    items: [{ id: priceId, quantity: planQuantity }],
                    discounts: offerId ? [{ coupon: offerId }] : [],
                    ...stripeExtraParams,
                },
                stripeExtraOptions,
            );
        } catch (error) {
            throw error;
        }
    }

    async cancelSubscription({
        subscriptionId,
        stripeExtraOptions,
        stripeExtraParams,
    }: CancelStripeSubscriptionDto): Promise<Stripe.Subscription> {
        try {
            return await this.stripe.subscriptions.cancel(subscriptionId, stripeExtraParams, stripeExtraOptions);
        } catch (error) {
            throw error;
        }
    }

    async deleteOfferFromSubscription({
        subscriptionId,
        stripeExtraOptions,
        stripeExtraParams,
    }: DeleteStripeSubscriptionDto): Promise<Stripe.DeletedDiscount> {
        try {
            return await this.stripe.subscriptions.deleteDiscount(
                subscriptionId,
                stripeExtraParams,
                stripeExtraOptions,
            );
        } catch (error) {
            throw error;
        }
    }

    async pauseSubscription({
        subscriptionId,
        stripeExtraOptions,
        stripeExtraParams,
    }: PauseStripeSubscriptionDto): Promise<Stripe.Subscription> {
        try {
            return await this.stripe.subscriptions.update(
                subscriptionId,
                {
                    pause_collection: { behavior: 'void' },
                    ...stripeExtraParams,
                },
                stripeExtraOptions,
            );
        } catch (error) {
            throw error;
        }
    }

    async resumeSubscription({
        subscriptionId,
        stripeExtraOptions,
        stripeExtraParams,
    }: ResumeStripeSubscriptionDto): Promise<Stripe.Subscription> {
        try {
            return await this.stripe.subscriptions.resume(subscriptionId, stripeExtraParams, stripeExtraOptions);
        } catch (error) {
            throw error;
        }
    }
}

export default StripeSubscription;
