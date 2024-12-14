import { Plans } from 'razorpay/dist/types/plans';
import Stripe from 'stripe';
import { GatewayProvider } from '../../../common/types/providers.types';
import { CreateRazorpayPlanDto } from '../../../gateways/razorpay/plans/dto/createPlan.dto';
import { CreateStripePlanDto } from '../../../gateways/stripe/plans/dto/createPlan.dto';

export type MergerCreatePlan = {
    [GatewayProvider.Razorpay]: {
        payload: CreateRazorpayPlanDto;
        returnType: Plans.RazorPayPlans;
    };
    [GatewayProvider.Stripe]: {
        payload: CreateStripePlanDto;
        returnType: Stripe.Price;
    };
};
