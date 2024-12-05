import Stripe from 'stripe';
import { StripeCredentials } from '../../common/types/credentials.types';
import { MergerGateways } from '../../merger/interfaces/merger.gateways.interface';
import { CreateStripeOrderDto } from '../stripe/orders/dto/createOrder.dto';
import { QueryStripeOneOrderDto, QueryStripeOrderDto } from '../stripe/orders/dto/queryOrder.dto';
import { UpdateStripeOrderDto } from '../stripe/orders/dto/updateOrder.dto';
import { StripeOrders } from '../stripe/orders/stripe.orders';
import { CreateStripePlanDto } from '../stripe/plans/dto/createPlan.dto';
import { QueryStripeOnePlanDto, QueryStripePlanDto } from '../stripe/plans/dto/queryPlan.dto';
import { UpdateStripePlanDto } from '../stripe/plans/dto/updatePlan.dto';
import StripePlans from '../stripe/plans/stripe.plans';
import { CreateStripeSubscriptionDto } from '../stripe/subscription/dto/createSubscription.dto';
import { DeleteStripeSubscriptionDto } from '../stripe/subscription/dto/deleteSubscription.dto';
import {
    QueryStripeOneSubscriptionDto,
    QueryStripeSubscriptionDto,
} from '../stripe/subscription/dto/querySubscription.dto';
import {
    CancelStripeSubscriptionDto,
    ResumeStripeSubscriptionDto,
    UpdateStripeSubscriptionDto,
} from '../stripe/subscription/dto/updateSubcription.dto';
import StripeSubscription from '../stripe/subscription/stripe.subscription';
export class StripeProvider implements MergerGateways {
    private stripeOrders: StripeOrders;
    private stipePlans: StripePlans;
    private stripeSubscription: StripeSubscription;
    constructor(credentials: StripeCredentials) {
        const stripeInstance = new Stripe(credentials.apiKey, {
            apiVersion: credentials.apiVersion,
            appInfo: credentials.appInfo,
            host: credentials.host,
            stripeAccount: credentials.stripeAccount,
            maxNetworkRetries: credentials.maxRetries,
            timeout: credentials.timeout,
            port: credentials.port,
        });
        this.stripeOrders = new StripeOrders(stripeInstance);
        this.stipePlans = new StripePlans(stripeInstance);
        this.stripeSubscription = new StripeSubscription(stripeInstance);
    }

    // order methods
    async createOrder(payload: CreateStripeOrderDto) {
        return await this.stripeOrders.createStripeOrder(payload);
    }

    async getAllOrders(payload: QueryStripeOrderDto) {
        return await this.stripeOrders.getAllOrders(payload);
    }

    async getOrderById(payload: QueryStripeOneOrderDto) {
        return await this.stripeOrders.getOrderById(payload);
    }

    async updateOrder(orderId: string, payload: UpdateStripeOrderDto) {
        return await this.stripeOrders.updateOrder(orderId, payload);
    }

    // plan methods
    async createPlan(payload: CreateStripePlanDto) {
        return await this.stipePlans.createPlan(payload);
    }

    async getAllStripePlans(payload: QueryStripePlanDto) {
        return await this.stipePlans.getAllPlans(payload);
    }

    async updateStripePlan(planId: string, payload: UpdateStripePlanDto) {
        return await this.stipePlans.updatePlan(planId, payload);
    }

    async getStripePlanById(payload: QueryStripeOnePlanDto) {
        return await this.stipePlans.getPlan(payload);
    }

    // subscription methods
    async createStripeSubscription(payload: CreateStripeSubscriptionDto) {
        return await this.stripeSubscription.createSubscription(payload);
    }

    async getStripeAllSubscriptions(payload: QueryStripeSubscriptionDto) {
        return await this.stripeSubscription.getAllSubscriptions(payload);
    }

    async getStripeSubscriptionById(payload: QueryStripeOneSubscriptionDto) {
        return await this.stripeSubscription.getSubscriptionById(payload);
    }

    async updateStripeSubscription(subscriptionId: string, payload: UpdateStripeSubscriptionDto) {
        return await this.stripeSubscription.updateSubscription(subscriptionId, payload);
    }

    async cancelStripeSubscription(payload: CancelStripeSubscriptionDto) {
        return await this.stripeSubscription.cancelSubscription(payload);
    }

    async deleteOfferFromStripeSubscription(payload: DeleteStripeSubscriptionDto) {
        return await this.stripeSubscription.deleteOfferFromSubscription(payload);
    }

    async pauseStripeSubscription(payload: CancelStripeSubscriptionDto) {
        return await this.stripeSubscription.pauseSubscription(payload);
    }

    async resumeStripeSubscription(payload: ResumeStripeSubscriptionDto) {
        return await this.stripeSubscription.resumeSubscription(payload);
    }
}
