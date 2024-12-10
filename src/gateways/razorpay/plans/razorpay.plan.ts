import Razorpay from 'razorpay';
import { Plans } from 'razorpay/dist/types/plans';
import { convertDateToUnix } from '../../../common/helpers/convertDateToUnix';
import { CreateRazorpayPlanDto } from './dto/createPlan.dto';
import { QueryRazorpayOnePlanDto, QueryRazorpayPlanDto } from './dto/queryPlan.dto';
export class RazorpayPlan {
    private razorPay: Razorpay;
    constructor(razorPayInstance: Razorpay) {
        this.razorPay = razorPayInstance;
    }

    // we will create an api for creating plans
    async createPlan(payload: CreateRazorpayPlanDto): Promise<Plans.RazorPayPlans> {
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
            return createPlan;
        } catch (error) {
            throw error;
        }
    }

    async getAllPlans(payload?: QueryRazorpayPlanDto): Promise<{
        entity: string;
        count: string;
        items: Array<Plans.RazorPayPlans>;
    }> {
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
            return allPlans;
        } catch (error) {
            throw error;
        }
    }

    async getOnePlan(payload: QueryRazorpayOnePlanDto): Promise<Plans.RazorPayPlans> {
        try {
            const getPlan = await this.razorPay.plans.fetch(payload.planId);
            return getPlan;
        } catch (error) {
            throw error;
        }
    }
}
