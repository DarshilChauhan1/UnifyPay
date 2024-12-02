import Stripe from 'stripe';
import { StripeCredentials } from '../../common/types/credentials.types';
import { CreatePlanDto } from './dto/createPlan.dto';
import { QueryPlanDto } from './dto/queryPlan.dto';
import { UpdatePlanDto } from './dto/updatePlan.dto';

class StripePlans {
    private stripe: Stripe;

    constructor(credentials: StripeCredentials) {
        this.stripe = new Stripe(credentials.apiKey, {
            apiVersion: credentials.apiVersion,
        });
    }

    async createPlan(createPlanDto: CreatePlanDto): Promise<Stripe.Price> {
        try {
            const { amount, currency, interval, name, nickname, active, metadata, intervalCount } = createPlanDto;
            const plan = await this.stripe.prices.create({
                currency,
                unit_amount: amount,
                recurring: { interval, interval_count: intervalCount ?? 1 },
                product_data: {
                    name: name,
                },
                nickname,
                active,
                metadata,
            });
            return plan;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async updatePlan(updatePlanDto: UpdatePlanDto): Promise<Stripe.Price> {
        try {
            const { priceId, ...restPlanDto } = updatePlanDto;
            const plan = await this.stripe.prices.update(priceId, restPlanDto);
            return plan;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    getAllPlans(queryPlanDto: QueryPlanDto): Promise<Stripe.ApiList<Stripe.Price>> {
        try {
            const { active, createdAfter, createdBefore, limit, lastRecordId, currency } = queryPlanDto;
            if (limit && (limit < 1 || limit > 100)) {
                throw new Error('Limit must be between 1 and 100');
            }

            const query = {};
            if (active !== undefined) {
                query['active'] = active;
            }

            if (createdAfter) {
                query['created'] = {
                    ...query['created'],
                    gte: createdAfter,
                };
            }

            if (createdBefore) {
                query['created'] = {
                    ...query['created'],
                    lte: createdBefore,
                };
            }

            if (currency) {
                query['currency'] = currency;
            }

            if (limit) {
                query['limit'] = limit;
            }

            if (lastRecordId) {
                query['starting_after'] = lastRecordId;
            }

            return this.stripe.prices.list(query);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    getPlan(priceId: string): Promise<Stripe.Price> {
        try {
            return this.stripe.prices.retrieve(priceId);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export default StripePlans;
