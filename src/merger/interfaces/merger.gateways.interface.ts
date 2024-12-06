import { Orders } from 'razorpay/dist/types/orders';
import { Plans } from 'razorpay/dist/types/plans';
import { Subscriptions } from 'razorpay/dist/types/subscriptions';
import Stripe from 'stripe';
import { CreateRazorPayOrderDto } from '../../gateways/razorpay/orders/dto/createOrder.dto';
import { QueryRazorpayOneOrderDto, QueryRazorpayOrderDto } from '../../gateways/razorpay/orders/dto/queryOrder.dto';
import { UpdateRazorpayOrderDto } from '../../gateways/razorpay/orders/dto/upateOrder.dto';
import { RazorpayCheckoutSession } from '../../gateways/razorpay/orders/types/CheckoutSession.types';
import { CreateRazorpayPlanDto } from '../../gateways/razorpay/plans/dto/createPlan.dto';
import { QueryRazorpayOnePlanDto, QueryRazorpayPlanDto } from '../../gateways/razorpay/plans/dto/queryPlan.dto';
import { CreateRazorpaySubscriptionDto } from '../../gateways/razorpay/subscription/dto/createSubscription.dto';
import {
    QueryRazorpayOneSubscriptionDto,
    QueryRazorpaySubscriptionDto,
} from '../../gateways/razorpay/subscription/dto/querySubscription.dto';
import {
    CancelRazorpaySubscriptionDto,
    DeleteOfferOfRazorpaySubscriptionDto,
    PauseRazorpaySubscriptionDto,
    ResumeRazorpaySubscriptionDto,
    UpdateRazorpaySubscriptionDto,
} from '../../gateways/razorpay/subscription/dto/updateSubscription.dto';
import { CreateStripeOrderDto } from '../../gateways/stripe/orders/dto/createOrder.dto';
import { QueryStripeOneOrderDto, QueryStripeOrderDto } from '../../gateways/stripe/orders/dto/queryOrder.dto';
import { UpdateStripeOrderDto } from '../../gateways/stripe/orders/dto/updateOrder.dto';
import { CreateStripePlanDto } from '../../gateways/stripe/plans/dto/createPlan.dto';
import { QueryStripeOnePlanDto, QueryStripePlanDto } from '../../gateways/stripe/plans/dto/queryPlan.dto';
import { CreateStripeSubscriptionDto } from '../../gateways/stripe/subscription/dto/createSubscription.dto';
import { DeleteOfferOfStripeSubscriptionDto } from '../../gateways/stripe/subscription/dto/deleteSubscription.dto';
import {
    QueryStripeOneSubscriptionDto,
    QueryStripeSubscriptionDto,
} from '../../gateways/stripe/subscription/dto/querySubscription.dto';
import {
    CancelStripeSubscriptionDto,
    PauseStripeSubscriptionDto,
    ResumeStripeSubscriptionDto,
    UpdateStripeSubscriptionDto,
} from '../../gateways/stripe/subscription/dto/updateSubcription.dto';

export interface MergerGateways {
    // Orders
    createOrder(payload: CreateRazorPayOrderDto | CreateStripeOrderDto): Promise<
        | {
              orderData: Orders.RazorpayOrder;
              checkoutSessionData: RazorpayCheckoutSession;
          }
        | Stripe.Checkout.Session
    >;

    getAllOrders(payload: QueryRazorpayOrderDto | QueryStripeOrderDto): Promise<
        | {
              entity: string;
              count: number;
              items: Array<Orders.RazorpayOrder>;
          }
        | Stripe.ApiList<Stripe.Checkout.Session>
    >;

    getOrderById(
        payload: QueryStripeOneOrderDto | QueryRazorpayOneOrderDto,
    ): Promise<Orders.RazorpayOrder | Stripe.Checkout.Session>;

    updateOrder(
        orderId: string,
        payload: UpdateRazorpayOrderDto | UpdateStripeOrderDto,
    ): Promise<Orders.RazorpayOrder | Stripe.Checkout.Session>;

    // Plans
    createPlan(payload: CreateRazorpayPlanDto | CreateStripePlanDto): Promise<Plans.RazorPayPlans | Stripe.Price>;

    getAllPlans(payload: QueryRazorpayPlanDto | QueryStripePlanDto): Promise<
        | {
              entity: string;
              count: string;
              items: Array<Plans.RazorPayPlans>;
          }
        | Stripe.ApiList<Stripe.Price>
    >;

    getPlanById(payload: QueryRazorpayOnePlanDto | QueryStripeOnePlanDto): Promise<Plans.RazorPayPlans | Stripe.Price>;

    // Subscriptions
    createSubscription(
        payload: CreateRazorpaySubscriptionDto | CreateStripeSubscriptionDto,
    ): Promise<Subscriptions.RazorpaySubscription | Stripe.Subscription>;

    getAllSubscriptions(payload: QueryRazorpaySubscriptionDto | QueryStripeSubscriptionDto): Promise<
        | {
              entity: string;
              count: number;
              items: Array<Subscriptions.RazorpaySubscription>;
          }
        | Stripe.ApiList<Stripe.Subscription>
    >;

    getSubscriptionById(
        payload: QueryRazorpayOneSubscriptionDto | QueryStripeOneSubscriptionDto,
    ): Promise<Subscriptions.RazorpaySubscription | Stripe.Subscription>;

    updateSubscription(
        subscriptionId: string,
        payload: UpdateRazorpaySubscriptionDto | UpdateStripeSubscriptionDto,
    ): Promise<Subscriptions.RazorpaySubscription | Stripe.Subscription>;

    cancelSubscription(
        payload: CancelRazorpaySubscriptionDto | CancelStripeSubscriptionDto,
    ): Promise<Subscriptions.RazorpaySubscription | Stripe.Subscription>;

    deleteOfferOfSubscription(
        payload: DeleteOfferOfRazorpaySubscriptionDto | DeleteOfferOfStripeSubscriptionDto,
    ): Promise<Subscriptions.RazorpaySubscription | Stripe.DeletedDiscount>;

    pauseSubscription(
        payload: PauseRazorpaySubscriptionDto | PauseStripeSubscriptionDto,
    ): Promise<Subscriptions.RazorpaySubscription | Stripe.Subscription>;

    resumeSubscription(
        payload: ResumeRazorpaySubscriptionDto | ResumeStripeSubscriptionDto,
    ): Promise<Subscriptions.RazorpaySubscription | Stripe.Subscription>;
}
