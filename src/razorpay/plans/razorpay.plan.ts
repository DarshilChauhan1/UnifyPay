import Razorpay from 'razorpay';
import { RazorPayCredentials } from '../../common/types/credentials.types';
import { CreatePlanDto } from './dtos/createPlan.dto';
import { parseQueryParams } from '../../common/helpers/parseQueryParams.helper';
import { QueryPlanDto } from './dtos/queryPlan.dto';
export class RazorpayPlan {
   razorPayPlan: Razorpay
   constructor(credentials: RazorPayCredentials) {
      this.razorPayPlan = new Razorpay({
         key_id: credentials.keyId,
         key_secret: credentials.keySecret
      })
   }

   // we will create an api for creating plans
   async createPlan(payload: CreatePlanDto): Promise<object> {
      try {
         const { billingFrequency, billingInterval, currency, name, notes, planAmount, planDescription } = payload
         const updatedPayload = {
            period: billingFrequency,
            interval: billingInterval,
            item: {
               name,
               amount: planAmount,
               description: planDescription,
               currency
            },
            notes
         }
         const createPlan = await this.razorPayPlan.plans.create(updatedPayload as any);
         const updateResponse = {
            planId: createPlan.id,
            context: createPlan.entity,
            ...payload
         }
         return updateResponse
      } catch (error) {
         throw error
      }
   }

   async getAllPlans(payload: QueryPlanDto): Promise<object> {
      try {
         const { numberOfPlansToFetch, planFromDate, planToDate, skipNumberOfPlans } = payload
         let formattedDates: object = {}
         if (planFromDate || planToDate) {
            formattedDates = parseQueryParams({ from: planFromDate, to: planToDate })
         }
         const updatedPayload = {
            skip: skipNumberOfPlans,
            count: numberOfPlansToFetch,
            ...formattedDates
         }
         const allPlans = await this.razorPayPlan.plans.all(updatedPayload)
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
               planDescription: plan.item.description
            }
         })
         return updatedResponse

      } catch (error) {
         throw error
      }
   }

   async getOnePlan(planId: string): Promise<object> {
      try {
         const getPlan = await this.razorPayPlan.plans.fetch(planId)
         const updatedResponse = {
            planId: getPlan.id,
            context: getPlan.entity,
            billingFrequency: getPlan.period,
            billingInterval: getPlan.interval,
            currency: getPlan.item.currency,
            name: getPlan.item.name,
            notes: getPlan.notes,
            planAmount: getPlan.item.amount,
            planDescription: getPlan.item.description
         }
         return updatedResponse
      } catch (error) {
         throw error
      }
   }
}