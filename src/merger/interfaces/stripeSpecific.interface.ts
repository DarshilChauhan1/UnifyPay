import Stripe from 'stripe';
import { UpdateStripePlanDto } from '../../gateways/stripe/plans/dto/updatePlan.dto';

export interface StripeSpecificMethods {
    updateStripePlan(payload: UpdateStripePlanDto): Promise<Stripe.Price>;
}
