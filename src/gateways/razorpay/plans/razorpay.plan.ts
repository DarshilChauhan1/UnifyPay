import Razorpay from 'razorpay';
import { convertDateToUnix } from '../../../common/helpers/convertDateToUnix';
import { CreateRazorpayPlanDto } from './dto/createPlan.dto';
import { QueryRazorpayOnePlanDto, QueryRazorpayPlanDto } from './dto/queryPlan.dto';
export class RazorpayPlan {
    private razorPay: Razorpay;
    constructor(razorPayInstance: Razorpay) {
        this.razorPay = razorPayInstance;
    }

    // we will create an api for creating plans
    async createPlan(payload: CreateRazorpayPlanDto): Promise<object> {
        try {
            const { billingFrequency, billingInterval, currency, name, notes, planAmount, planDescription } = payload;
            const updatedPayload = {
                period: billingFrequency,
                interval: billingInterval,
                item: {
                    name,
                    amount: planAmount,
                    description: planDescription,
                    currency,
                },
                notes,
            };
            const createPlan = await this.razorPay.plans.create(updatedPayload as any);
            const updateResponse = {
                planId: createPlan.id,
                context: createPlan.entity,
                ...payload,
            };
            return updateResponse;
        } catch (error) {
            throw error;
        }
    }

    async getAllPlans(payload: QueryRazorpayPlanDto): Promise<object> {
        try {
            const { numberOfPlansToFetch, planFromDate, planToDate, skipNumberOfPlans } = payload;
            let formattedDates: object = {};
            if (planFromDate || planToDate) {
                formattedDates = convertDateToUnix({ from: planFromDate, to: planToDate });
            }
            const updatedPayload = {
                skip: skipNumberOfPlans,
                count: numberOfPlansToFetch,
                ...formattedDates,
            };
            const allPlans = await this.razorPay.plans.all(updatedPayload);
            const updatedResponse = allPlans.items.map((plan) => {
                return {
                    planId: plan.id,
                    context: plan.entity,
                    billingFrequency: plan.period,
                    billingInterval: plan.interval,
                    currency: plan.item.currency,
                    name: plan.item.name,
                    notes: plan.notes,
                    planAmount: plan.item.amount,
                    planDescription: plan.item.description,
                };
            });
            return updatedResponse;
        } catch (error) {
            throw error;
        }
    }

    async getOnePlan(payload: QueryRazorpayOnePlanDto): Promise<object> {
        try {
            const getPlan = await this.razorPay.plans.fetch(payload.planId);
            const updatedResponse = {
                planId: getPlan.id,
                context: getPlan.entity,
                billingFrequency: getPlan.period,
                billingInterval: getPlan.interval,
                currency: getPlan.item.currency,
                name: getPlan.item.name,
                notes: getPlan.notes,
                planAmount: getPlan.item.amount,
                planDescription: getPlan.item.description,
            };
            return updatedResponse;
        } catch (error) {
            throw error;
        }
    }
}
