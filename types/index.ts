import { RazorPayCredentials, StripeCredentials } from '../src/common/types/credentials.types';

/* ---------------- Razorpay Order ---------------- */
import {
    AuthorizedStatus,
    QueryRazorpayOneOrderDto,
    QueryRazorpayOrderDto,
} from '../src/gateways/razorpay/orders/dto/queryOrder.dto';
import { RazorpayCheckoutSession } from '../src/gateways/razorpay/orders/types/CheckoutSession.types';
import { UpdateRazorpayOrderDto } from '../src/gateways/razorpay/orders/dto/upateOrder.dto';
import { CreateRazorpayPlanDto } from '../src/gateways/razorpay/plans/dto/createPlan.dto';
import { QueryRazorpayOnePlanDto, QueryRazorpayPlanDto } from '../src/gateways/razorpay/plans/dto/queryPlan.dto';

/* ---------------- Razorpay Plans  ---------------- */

/* ---------------- Razorpay Subscriptions  ---------------- */
import { CreateRazorpaySubscriptionDto } from '../src/gateways/razorpay/subscriptions/dto/createSubscription.dto';
import {
    QueryRazorpayOneSubscriptionDto,
    QueryRazorpaySubscriptionDto,
} from '../src/gateways/razorpay/subscriptions/dto/querySubscription.dto';
import {
    CancelRazorpaySubscriptionDto,
    DeleteOfferOfRazorpaySubscriptionDto,
    PauseRazorpaySubscriptionDto,
    ResumeRazorpaySubscriptionDto,
    UpdateRazorpaySubscriptionDto,
} from '../src/gateways/razorpay/subscriptions/dto/updateSubscription.dto';

/* ---------------- Razorpay Subscriptions  ---------------- */

/* ----------------- Razorpay Payments ----------------- */

import { VerifySignatureDto } from '../src/gateways/razorpay/payments/dto/verifySignature.dto';

/* ----------------- Razorpay Payments ----------------- */

/*------------------ Stripe Order -------------------*/

import { CreateStripeOrderDto } from '../src/gateways/stripe/orders/dto/createOrder.dto';
import { QueryStripeOneOrderDto, QueryStripeOrderDto } from '../src/gateways/stripe/orders/dto/queryOrder.dto';
import { UpdateStripeOrderDto } from '../src/gateways/stripe/orders/dto/updateOrder.dto';

/*------------------ Stripe Order -------------------*/

/* ---------------- Stripe Plans ---------------- */

import { CreateStripePlanDto } from '../src/gateways/stripe/plans/dto/createPlan.dto';
import { QueryStripeOnePlanDto, QueryStripePlanDto } from '../src/gateways/stripe/plans/dto/queryPlan.dto';
import { UpdateStripePlanDto } from '../src/gateways/stripe/plans/dto/updatePlan.dto';

/* ---------------- Stripe Plans ---------------- */

/* ---------------- Stripe Subscriptions ---------------- */

import { CreateStripeSubscriptionDto } from '../src/gateways/stripe/subscriptions/dto/createSubscription.dto';
import {
    QueryStripeOneSubscriptionDto,
    QueryStripeSubscriptionDto,
} from '../src/gateways/stripe/subscriptions/dto/querySubscription.dto';
import {
    CancelStripeSubscriptionDto,
    PauseStripeSubscriptionDto,
    ResumeStripeSubscriptionDto,
    UpdateStripeSubscriptionDto,
} from '../src/gateways/stripe/subscriptions/dto/updateSubcription.dto';
import { DeleteOfferOfStripeSubscriptionDto } from '../src/gateways/stripe/subscriptions/dto/deleteSubscription.dto';

/* ---------------- Stripe Subscriptions ---------------- */

export interface Test {
    test: string;
}

export {
    AuthorizedStatus,
    QueryRazorpayOneOrderDto,
    QueryRazorpayOrderDto,
    RazorpayCheckoutSession,
    RazorPayCredentials,
    StripeCredentials,
    VerifySignatureDto,
    UpdateRazorpayOrderDto,
    CreateRazorpayPlanDto,
    QueryRazorpayOnePlanDto,
    QueryRazorpayPlanDto,
    CreateRazorpaySubscriptionDto,
    QueryRazorpayOneSubscriptionDto,
    QueryRazorpaySubscriptionDto,
    CancelRazorpaySubscriptionDto,
    DeleteOfferOfRazorpaySubscriptionDto,
    PauseRazorpaySubscriptionDto,
    ResumeRazorpaySubscriptionDto,
    UpdateRazorpaySubscriptionDto,
    CreateStripeOrderDto,
    QueryStripeOneOrderDto,
    QueryStripeOrderDto,
    UpdateStripeOrderDto,
    CreateStripePlanDto,
    QueryStripeOnePlanDto,
    QueryStripePlanDto,
    CreateStripeSubscriptionDto,
    QueryStripeOneSubscriptionDto,
    QueryStripeSubscriptionDto,
    CancelStripeSubscriptionDto,
    PauseStripeSubscriptionDto,
    ResumeStripeSubscriptionDto,
    UpdateStripeSubscriptionDto,
    DeleteOfferOfStripeSubscriptionDto,
    UpdateStripePlanDto,
};
