import { Plans } from 'razorpay/dist/types/plans';
import Stripe from 'stripe';
import { GatewayProvider } from '../../../common/types/providers.types';
import { QueryRazorpayOnePlanDto } from '../../../gateways/razorpay/plans/dto/queryPlan.dto';
import { QueryStripeOnePlanDto } from '../../../gateways/stripe/plans/dto/queryPlan.dto';

export type MergerGetPlanById = {
    [GatewayProvider.Razorpay]: {
        payload: QueryRazorpayOnePlanDto;
        returnType: Plans.RazorPayPlans;
    };
    [GatewayProvider.Stripe]: {
        payload: QueryStripeOnePlanDto;
        returnType: Stripe.Price;
    };
};
