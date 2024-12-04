import Stripe from 'stripe';
import { StripeCredentials } from '../common/types/credentials.types';
import { QueryOrderDto } from '../stripe/orders/dto/queryOrder.dto';
import { UpdateOrderDto } from '../stripe/orders/dto/updateOrder.dto';
import { StripeOrders } from '../stripe/orders/stripe.orders';
import { CreatePlanDto } from '../stripe/plans/dto/createPlan.dto';
import { QueryPlanDto } from '../stripe/plans/dto/queryPlan.dto';
import { UpdatePlanDto } from '../stripe/plans/dto/updatePlan.dto';
import StripePlans from '../stripe/plans/stripe.plans';
import { CreateSubscriptionDto } from '../stripe/subscription/dto/createSubscription.dto';
import { QuerySubscriptionDto } from '../stripe/subscription/dto/querySubscription.dto';
import { UpdateSubscriptionDto } from '../stripe/subscription/dto/updateSubcription.dto';
import StripeSubscription from '../stripe/subscription/stripe.subscription';
import { CreateStripeOrderDto } from '../stripe/orders/dto/createOrder.dto';
import { MergerGateways } from '../merger/interfaces/mergerGateways.interface';
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

    async getAllOrders(payload: QueryOrderDto) {
        return await this.stripeOrders.getAllOrders(payload);
    }

    async getOrderById(orderId: string) {
        return await this.stripeOrders.getOrderById(orderId);
    }

    async updateOrder(payload: UpdateOrderDto) {
        return await this.stripeOrders.updateOrder(payload);
    }

    // plan methods
    async createPlan(payload: CreatePlanDto) {
        return await this.stipePlans.createPlan(payload);
    }

    async getAllStripePlans(payload: QueryPlanDto) {
        return await this.stipePlans.getAllPlans(payload);
    }

    async updateStripePlan(payload: UpdatePlanDto) {
        return await this.stipePlans.updatePlan(payload);
    }

    async getStripePlanById(planId: string) {
        return await this.stipePlans.getPlan(planId);
    }

    // subscription methods
    async createStripeSubscription(payload: CreateSubscriptionDto) {
        return await this.stripeSubscription.createSubscription(payload);
    }

    async getStripeAllSubscriptions(payload: QuerySubscriptionDto) {
        return await this.stripeSubscription.getAllSubscriptions(payload);
    }

    async getStripeSubscriptionById(subscriptionId: string) {
        return await this.stripeSubscription.getSubscriptionById(subscriptionId);
    }

    async updateStripeSubscription(payload: UpdateSubscriptionDto) {
        return await this.stripeSubscription.updateSubscription(payload);
    }

    async cancelStripeSubscription(subscriptionId: string) {
        return await this.stripeSubscription.cancelSubscription(subscriptionId);
    }

    async deleteOfferFromStripeSubscription(subscriptionId: string) {
        return await this.stripeSubscription.deleteOfferFromSubscription(subscriptionId);
    }

    async pauseStripeSubscription(subscriptionId: string) {
        return await this.stripeSubscription.pauseSubscription(subscriptionId);
    }

    async resumeStripeSubscription(subscriptionId: string) {
        return await this.stripeSubscription.resumeSubscription(subscriptionId);
    }
}
