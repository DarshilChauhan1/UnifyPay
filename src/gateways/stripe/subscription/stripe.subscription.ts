import moment from 'moment';
import Stripe from 'stripe';
import { convertDateToUnix } from '../../../common/helpers/convertDateToUnix';
import StripeCustomer from '../customer/stripe.customer';
import { CreateStripeSubscriptionDto } from './dto/createSubscription.dto';
import { DeleteOfferOfStripeSubscriptionDto } from './dto/deleteSubscription.dto';
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
        this.stripeCustomer = new StripeCustomer(stripeInstance);
    }

    async createSubscription(payload: CreateStripeSubscriptionDto): Promise<Stripe.Subscription> {
        try {
            const {
                priceId,
                metadata,
                description,
                offerId,
                planQuantity,
                customerName,
                customerEmail,
                customerPhone,
                stripeExtraParams,
                stripeExtraOptions,
                customerId,
                stripeCustomerExtraParams,
            } = payload;
            let customer;
            if (!customerId) {
                customer = await this.stripeCustomer.createCustomer({
                    name: customerName ?? 'Guest',
                    email: customerEmail,
                    phone: customerPhone,
                    stripeExtraParams: stripeCustomerExtraParams,
                });
            }
            const subscription = await this.stripe.subscriptions.create(
                {
                    customer: customerId ?? customer.id,
                    items: [{ price: priceId, quantity: planQuantity }],
                    metadata,
                    description,
                    payment_behavior: 'default_incomplete',
                    expand: ['latest_invoice.payment_intent', ...(stripeExtraParams?.expand ?? [])],
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

    async getAllSubscriptions(payload?: QueryStripeSubscriptionDto): Promise<Stripe.ApiList<Stripe.Subscription>> {
        try {
            let formattedDates: Record<string, number> = {};
            if (payload?.subscritptionsFromDate || payload?.subscriptionsTillDate) {
                formattedDates = convertDateToUnix({
                    subscritptionsFromDate: payload?.subscritptionsFromDate,
                    subscriptionsTillDate: payload?.subscriptionsTillDate
                        ? moment(payload.subscriptionsTillDate).add(1, 'days').toDate()
                        : undefined,
                });
            }
            const query = {
                ...(payload?.subscriptionsToFetch && { limit: payload.subscriptionsToFetch }),
                ...(payload?.lastRecordId && { starting_after: payload.lastRecordId }),
                ...(payload?.priceId && { price: payload.priceId }),
                ...(formattedDates['subscritptionsFromDate'] && {
                    created: { gte: formattedDates['subscritptionsFromDate'] },
                }),
                ...(formattedDates['subscriptionsTillDate'] && {
                    created: { lte: formattedDates['subscriptionsTillDate'] },
                }),
                ...(payload?.stripeExtraParams && { ...payload.stripeExtraParams }),
            };

            const subscriptions = await this.stripe.subscriptions.list(
                {
                    ...query,
                },
                payload?.stripeExtraOptions,
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

    async updateSubscription(payload: UpdateStripeSubscriptionDto): Promise<Stripe.Subscription> {
        try {
            const { subscriptionId, metadata, offerId, planQuantity, priceId, stripeExtraOptions, stripeExtraParams } =
                payload;
            return await this.stripe.subscriptions.update(
                subscriptionId,
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
    }: DeleteOfferOfStripeSubscriptionDto): Promise<Stripe.DeletedDiscount> {
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
        behaviour,
        stripeExtraOptions,
        stripeExtraParams,
    }: PauseStripeSubscriptionDto): Promise<Stripe.Subscription> {
        try {
            return await this.stripe.subscriptions.update(
                subscriptionId,
                {
                    pause_collection: { behavior: behaviour ?? 'void' },
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
