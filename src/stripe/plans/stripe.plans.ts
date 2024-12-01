import Stripe from 'stripe'
import { StripeCredentials } from '../../common/interfaces/credentials.types'
import { CreatePlanDto } from './dto/createPlan.dto'
import { QueryPlanDto } from './dto/queryPlan.dto'
import { UpdatePlanDto } from './dto/updatePlan.dto'

class StripePlans {
    private stripe: Stripe

    constructor (credentials: StripeCredentials) {
        this.stripe = new Stripe(credentials.apiKey, {
            apiVersion: credentials.apiVersion,
        })
    }

    async createPlan (createPlanDto: CreatePlanDto): Promise<Stripe.Plan> {
        try {
            const { amount, currency, interval, product, nickname, active, metadata } = createPlanDto
            const plan = await this.stripe.plans.create({
                amount,
                currency,
                interval,
                product,
                nickname,
                metadata,
                active,
            })
            return plan
        } catch (error) {
            throw new Error(`Failed to create plan: ${error.message}`)
        }
    }

    async updatePlan (updatePlanDto: UpdatePlanDto): Promise<Stripe.Plan> {
        try {
            const { planId, ...restPlanDto } = updatePlanDto
            const plan = await this.stripe.plans.update(planId, restPlanDto)
            return plan
        } catch (error) {
            throw new Error(`Failed to update plan: ${error.message}`)
        }
    }

    deletePlan (planId: string): Promise<Stripe.DeletedPlan> {
        return this.stripe.plans.del(planId)
    }

    getAllPlans (queryPlanDto: QueryPlanDto): Promise<Stripe.ApiList<Stripe.Plan>> {
        const { active, createdAfter, createdBefore, limit, product } = queryPlanDto
        if (limit && (limit < 1 || limit > 100)) {
            throw new Error('Limit must be between 1 and 100')
        }

        const query = {}
        if (active !== undefined) {
            query['active'] = active
        }

        if (createdAfter) {
            query['created'] = {
                ...query['created'],
                gte: createdAfter,
            }
        }

        if (createdBefore) {
            query['created'] = {
                ...query['created'],
                lte: createdBefore,
            }
        }

        if (limit) {
            query['limit'] = limit
        }

        if (product) {
            query['product'] = product
        }

        return this.stripe.plans.list(query)
    }

    getPlan (planId: string): Promise<Stripe.Plan> {
        return this.stripe.plans.retrieve(planId)
    }
}

export default StripePlans
