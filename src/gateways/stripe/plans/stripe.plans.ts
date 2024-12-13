import moment from 'moment';
import Stripe from 'stripe';
import { convertDateToUnix } from '../../../common/helpers/convertDateToUnix';
import { CreateStripePlanDto } from './dto/createPlan.dto';
import { QueryStripeOnePlanDto, QueryStripePlanDto } from './dto/queryPlan.dto';
import { UpdateStripePlanDto } from './dto/updatePlan.dto';

class StripePlans {
    private stripe: Stripe;
    constructor(stripeInstance: Stripe) {
        this.stripe = stripeInstance;
    }

    async createPlan(createPlanDto: CreateStripePlanDto): Promise<Stripe.Price> {
        try {
            const {
                amount,
                currency,
                billingFrequency,
                name,
                nickname,
                active,
                metadata,
                billingInterval,
                stripeExtraOptions,
                stripeExtraParams,
            } = createPlanDto;
            const plan = await this.stripe.prices.create(
                {
                    currency,
                    unit_amount: amount,
                    recurring: { interval: billingFrequency, interval_count: billingInterval ?? 1 },
                    product_data: {
                        name: name,
                    },
                    nickname,
                    active,
                    metadata,
                    ...stripeExtraParams,
                },
                stripeExtraOptions,
            );
            return plan;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async updatePlan(updatePlanDto: UpdateStripePlanDto): Promise<Stripe.Price> {
        try {
            const { planId, stripeExtraOptions, stripeExtraParams, ...restPlanDto } = updatePlanDto;
            const plan = await this.stripe.prices.update(
                planId,
                {
                    ...restPlanDto,
                    ...stripeExtraParams,
                },
                stripeExtraOptions,
            );
            return plan;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getAllPlans(payload?: QueryStripePlanDto): Promise<Stripe.ApiList<Stripe.Price>> {
        try {
            let formattedDates: Record<string, number> = {};
            if (payload?.plansFromDate || payload?.plansTillDate) {
                formattedDates = convertDateToUnix({
                    plansFromDate: payload?.plansFromDate,
                    plansTillDate: payload?.plansTillDate
                        ? moment(payload.plansTillDate).add(1, 'days').toDate()
                        : undefined,
                });
            }
            if (payload?.plansToFetch && (payload?.plansToFetch < 1 || payload?.plansToFetch > 100)) {
                throw new Error('Limit must be between 1 and 100');
            }

            const query = {
                ...(payload?.plansToFetch && { limit: payload.plansToFetch }),
                ...(payload?.lastRecordId && { starting_after: payload.lastRecordId }),
                ...(payload?.active && { active: payload.active }),
                ...(formattedDates['plansFromDate'] && { created: { gte: formattedDates['plansFromDate'] } }),
                ...(formattedDates['plansTillDate'] && { created: { lte: formattedDates['plansTillDate'] } }),
                ...(payload?.currency && { currency: payload.currency }),
                ...(payload?.stripeExtraParams && { ...payload.stripeExtraParams }),
            };

            return this.stripe.prices.list(
                {
                    ...query,
                },
                payload?.stripeExtraOptions,
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getPlan(payload: QueryStripeOnePlanDto): Promise<Stripe.Price> {
        try {
            const { planId, stripeExtraOptions, stripeExtraParams } = payload;
            return await this.stripe.prices.retrieve(planId, stripeExtraParams, stripeExtraOptions);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export default StripePlans;
