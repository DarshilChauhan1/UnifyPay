import { Plans } from 'razorpay/dist/types/plans';
import Stripe from 'stripe';
import { GatewayProvider } from '../../../common/types/providers.types';
import { QueryRazorpayPlanDto } from '../../../gateways/razorpay/plans/dto/queryPlan.dto';
import { QueryStripePlanDto } from '../../../gateways/stripe/plans/dto/queryPlan.dto';

export type MergerGetAllPlans = {
    [GatewayProvider.Razorpay]: {
        payload: QueryRazorpayPlanDto;
        returnType: {
            entity: string;
            count: string;
            items: Array<Plans.RazorPayPlans>;
        };
    };
    [GatewayProvider.Stripe]: {
        payload: QueryStripePlanDto;
        returnType: Stripe.ApiList<Stripe.Price>;
    };
};
