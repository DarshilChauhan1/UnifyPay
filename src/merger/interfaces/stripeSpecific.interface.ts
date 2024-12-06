import Stripe from 'stripe';
import { UpdateStripePlanDto } from '../../gateways/stripe/plans/dto/updatePlan.dto';

export interface StripeSpecificMethods {
    updateStripePlan(planId: string, payload: UpdateStripePlanDto): Promise<Stripe.Price>;
}
