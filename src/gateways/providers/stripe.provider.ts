import Stripe from 'stripe';
import { StripeCredentials } from '../../common/types/credentials.types';
import { MergerGateways } from '../../merger/interfaces/merger.gateways.interface';
import { StripeSpecificMethods } from '../../merger/interfaces/stripeSpecific.interface';
import { CreateStripeOrderDto } from '../stripe/orders/dto/createOrder.dto';
import { QueryStripeOneOrderDto, QueryStripeOrderDto } from '../stripe/orders/dto/queryOrder.dto';
import { UpdateStripeOrderDto } from '../stripe/orders/dto/updateOrder.dto';
import { StripeOrders } from '../stripe/orders/stripe.orders';
import { CreateStripePlanDto } from '../stripe/plans/dto/createPlan.dto';
import { QueryStripeOnePlanDto, QueryStripePlanDto } from '../stripe/plans/dto/queryPlan.dto';
import { UpdateStripePlanDto } from '../stripe/plans/dto/updatePlan.dto';
import StripePlans from '../stripe/plans/stripe.plans';
import { CreateStripeSubscriptionDto } from '../stripe/subscription/dto/createSubscription.dto';
import { DeleteOfferOfStripeSubscriptionDto } from '../stripe/subscription/dto/deleteSubscription.dto';
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
export class StripeProvider implements MergerGateways, StripeSpecificMethods {
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
        return this.stripeOrders.createStripeOrder(payload);
    }

    async getAllOrders(payload?: QueryStripeOrderDto) {
        return this.stripeOrders.getAllOrders(payload);
    }

    async getOrderById(payload: QueryStripeOneOrderDto) {
        return this.stripeOrders.getOrderById(payload);
    }

    async updateOrder(payload: UpdateStripeOrderDto) {
        return this.stripeOrders.updateOrder(payload);
    }

    // plan methods
    async createPlan(payload: CreateStripePlanDto) {
        return this.stipePlans.createPlan(payload);
    }

    async getAllPlans(payload?: QueryStripePlanDto) {
        return this.stipePlans.getAllPlans(payload);
    }

    async getPlanById(payload: QueryStripeOnePlanDto) {
        return this.stipePlans.getPlan(payload);
    }

    // subscription methods
    async createSubscription(payload: CreateStripeSubscriptionDto) {
        return this.stripeSubscription.createSubscription(payload);
    }

    async getAllSubscriptions(payload?: QueryStripeSubscriptionDto) {
        return this.stripeSubscription.getAllSubscriptions(payload);
    }

    async getSubscriptionById(payload: QueryStripeOneSubscriptionDto) {
        return this.stripeSubscription.getSubscriptionById(payload);
    }

    async updateSubscription(payload: UpdateStripeSubscriptionDto) {
        return this.stripeSubscription.updateSubscription(payload);
    }

    async cancelSubscription(payload: CancelStripeSubscriptionDto) {
        return this.stripeSubscription.cancelSubscription(payload);
    }

    async deleteOfferOfSubscription(payload: DeleteOfferOfStripeSubscriptionDto) {
        return this.stripeSubscription.deleteOfferFromSubscription(payload);
    }

    async pauseSubscription(payload: CancelStripeSubscriptionDto) {
        return this.stripeSubscription.pauseSubscription(payload);
    }

    async resumeSubscription(payload: ResumeStripeSubscriptionDto) {
        return this.stripeSubscription.resumeSubscription(payload);
    }

    /* Stripe Specific methods */
    async updateStripePlan(payload: UpdateStripePlanDto) {
        return this.stipePlans.updatePlan(payload);
    }
}
