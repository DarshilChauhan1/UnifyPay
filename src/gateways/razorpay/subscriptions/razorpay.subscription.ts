import moment from 'moment';
import Razorpay from 'razorpay';
import { Subscriptions } from 'razorpay/dist/types/subscriptions';
import { convertDateToUnix } from '../../../common/helpers/convertDateToUnix';
import { CreateRazorpaySubscriptionDto } from './dto/createSubscription.dto';
import { QueryRazorpayOneSubscriptionDto, QueryRazorpaySubscriptionDto } from './dto/querySubscription.dto';
import {
    CancelRazorpaySubscriptionDto,
    DeleteOfferOfRazorpaySubscriptionDto,
    PauseRazorpaySubscriptionDto,
    ResumeRazorpaySubscriptionDto,
    UpdateRazorpaySubscriptionDto,
} from './dto/updateSubscription.dto';
export class RazorPaySubscription {
    private razorpay: Razorpay;
    constructor(razorPayInstance: Razorpay) {
        this.razorpay = razorPayInstance;
    }

    // create a subcsription apis
    async createRazorPaySubscription(
        payload: CreateRazorpaySubscriptionDto,
    ): Promise<Subscriptions.RazorpaySubscription> {
        try {
            const {
                planId,
                totalBillingCycles,
                notes,
                notifyCustomer,
                offerId,
                paymentExpiry,
                planQuantity,
                planStartAt,
                upfrontAddonsList,
            } = payload;

            const formattedDates = convertDateToUnix({ start_at: planStartAt, expire_by: paymentExpiry });
            const subscriptionPayload = {
                plan_id: planId,
                total_count: totalBillingCycles,
                quantity: planQuantity,
                notify_customer: notifyCustomer,
                offer_id: offerId,
                notes,
                ...formattedDates,
            };

            // check for the upfront addons
            if (upfrontAddonsList) {
                const addonsArr = [];
                upfrontAddonsList.forEach((addon) => {
                    const addonsObj = {
                        item: {
                            name: addon.name,
                            amount: addon.amount,
                            currency: addon.currency,
                        },
                    };
                    addonsArr.push(addonsObj);
                });
            }
            const response = await this.razorpay.subscriptions.create(subscriptionPayload);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async getAllSubscriptions(payload?: QueryRazorpaySubscriptionDto): Promise<{
        entity: string;
        count: number;
        items: Array<Subscriptions.RazorpaySubscription>;
    }> {
        try {
            let formattedDates: Record<string, number> = {};

            if (payload?.subscritptionsFromDate || payload?.subscriptionTillDate) {
                formattedDates = convertDateToUnix({
                    subscritptionsFromDate: payload?.subscritptionsFromDate,
                    subscriptionTillDate: payload?.subscriptionTillDate
                        ? moment(payload?.subscriptionTillDate).add(1, 'days').toDate()
                        : undefined,
                });
            }

            const query = {
                ...(payload?.subscriptionsToFetch && { count: payload.subscriptionsToFetch }),
                ...(payload?.skipSubscription && { skip: payload.skipSubscription }),
                ...(payload?.planId && { plan_id: payload.planId }),
                ...(formattedDates['subscritptionsFromDate'] && { from: formattedDates['subscritptionsFromDate'] }),
                ...(formattedDates['subscriptionTillDate'] && { to: formattedDates['subscriptionTillDate'] }),
            };

            const response = await this.razorpay.subscriptions.all(query);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async getSubscriptionById(payload: QueryRazorpayOneSubscriptionDto): Promise<Subscriptions.RazorpaySubscription> {
        try {
            const response = await this.razorpay.subscriptions.fetch(payload.subscriptionId);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async updateSubscription(payload: UpdateRazorpaySubscriptionDto): Promise<Subscriptions.RazorpaySubscription> {
        try {
            const {
                subscriptionId,
                planId,
                offerId,
                planQuantity,
                totalBillingCycles,
                subscriptionStartAt,
                scheduleChangeAt,
                customerNotify,
            } = payload;
            const formattedDates = convertDateToUnix({
                start_at: subscriptionStartAt,
                schedule_change_at: scheduleChangeAt,
            });
            const updatePayload = {
                plan_id: planId,
                offer_id: offerId,
                quantity: planQuantity,
                total_count: totalBillingCycles,
                notify_customer: customerNotify,
                ...formattedDates,
            };
            const response = await this.razorpay.subscriptions.update(subscriptionId, updatePayload);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async cancelSubscription(payload: CancelRazorpaySubscriptionDto): Promise<Subscriptions.RazorpaySubscription> {
        try {
            const response = await this.razorpay.subscriptions.cancel(payload.subscriptionId, payload.cancelAtCycleEnd);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async pauseSubscription(payload: PauseRazorpaySubscriptionDto): Promise<Subscriptions.RazorpaySubscription> {
        try {
            const response = await this.razorpay.subscriptions.pause(
                payload.subscriptionId,
                payload.razorpayExtraParams,
            );
            return response;
        } catch (error) {
            throw error;
        }
    }

    async deleteOfferOfSubscription(
        payload: DeleteOfferOfRazorpaySubscriptionDto,
    ): Promise<Subscriptions.RazorpaySubscription> {
        try {
            const response = await this.razorpay.subscriptions.deleteOffer(payload.subscriptionId, payload.offerId);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async resumeSubscription(payload: ResumeRazorpaySubscriptionDto): Promise<Subscriptions.RazorpaySubscription> {
        try {
            const response = await this.razorpay.subscriptions.resume(
                payload.subscriptionId,
                payload.razorpayExtraParams,
            );
            return response;
        } catch (error) {
            throw error;
        }
    }
}
