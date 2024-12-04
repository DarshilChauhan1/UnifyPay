import Razorpay from 'razorpay';
import { CreateSubscriptionDto } from './dto/createSubscription.dto';
import moment from 'moment';
import { convertDateToUnix } from '../../common/helpers/convertDateToUnix';
import { QuerySubscriptionDto } from './dto/querySubscription.dto';
import { UpdateSubscriptionDto } from './dto/updateSubscription.dto';
export class RazorPaySubscription {
    private razorpay: Razorpay;
    constructor(razorPayInstance: Razorpay) {
        this.razorpay = razorPayInstance;
    }

    // create a subcsription apis
    async createRazorPaySubscription(payload: CreateSubscriptionDto): Promise<object> {
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
            return this.updateRazorpaySubsciptionResponse(response as unknown as Record<string, string | number>);
        } catch (error) {
            throw error;
        }
    }

    async getAllSubscriptions(payload: QuerySubscriptionDto): Promise<object> {
        try {
            const { planId, skipSubscription, subscriptionTo, subscritptionFrom, totalSubscription } = payload;
            const formatDates = convertDateToUnix({ from: subscritptionFrom, to: subscriptionTo });
            const query = {
                plan_id: planId,
                skip: skipSubscription,
                to: totalSubscription,
                ...formatDates,
            };
            const response = await this.razorpay.subscriptions.all(query);
            const updatedResponse: Record<string, any>[] = [];
            response.items.forEach((item: any) => {
                updatedResponse.push(this.updateRazorpaySubsciptionResponse(item));
            });
            return updatedResponse;
        } catch (error) {
            throw error;
        }
    }

    async getSubscriptionById(subscriptionId: string): Promise<object> {
        try {
            const response = await this.razorpay.subscriptions.fetch(subscriptionId);
            return this.updateRazorpaySubsciptionResponse(response as unknown as Record<string, string | number>);
        } catch (error) {
            throw error;
        }
    }

    async updateSubscription(subscriptionId: string, payload: UpdateSubscriptionDto): Promise<object> {
        try {
            const {
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
            return this.updateRazorpaySubsciptionResponse(response as unknown as Record<string, string | number>);
        } catch (error) {
            throw error;
        }
    }

    async cancelSubscription(subscriptionId: string): Promise<object> {
        try {
            const response = await this.razorpay.subscriptions.cancel(subscriptionId);
            return this.updateRazorpaySubsciptionResponse(response as unknown as Record<string, string | number>);
        } catch (error) {
            throw error;
        }
    }

    async pauseSubscription(subscriptionId: string): Promise<object> {
        try {
            const response = await this.razorpay.subscriptions.pause(subscriptionId);
            return this.updateRazorpaySubsciptionResponse(response as unknown as Record<string, string | number>);
        } catch (error) {
            throw error;
        }
    }

    async deleteOfferOfSubscription(subscriptionId: string, offerId: string): Promise<object> {
        try {
            const response = await this.razorpay.subscriptions.deleteOffer(subscriptionId, offerId);
            return this.updateRazorpaySubsciptionResponse(response as unknown as Record<string, string | number>);
        } catch (error) {
            throw error;
        }
    }

    async resumeSubscription(subscriptionId: string): Promise<object> {
        try {
            const response = await this.razorpay.subscriptions.resume(subscriptionId);
            return this.updateRazorpaySubsciptionResponse(response as unknown as Record<string, string | number>);
        } catch (error) {
            throw error;
        }
    }

    updateRazorpaySubsciptionResponse(payload: Record<string, string | number>) {
        const updatedResponse = {
            subscriptionId: payload.id,
            planId: payload.plan_id,
            status: payload.status,
            customerId: payload.customer_id,
            billingCycleStartAt: moment.unix(payload.current_start as number).toDate(),
            billingCycleEndAt: moment.unix(payload.current_end as number).toDate(),
            subscriptionEndedAt: moment.unix(payload.ended_at as number).toDate(),
            planQuantity: payload.quantity,
            nextPaymentDue: moment.unix(payload.current_end as number).toDate(),
            offerId: payload.offer_id,
            notes: payload.notes,
            totalBillingCycles: payload.total_count,
            subscriptionStartAt: moment.unix(payload.start_at as number).toDate(),
            subscriptionExpireBy: moment.unix(payload.end_at as number).toDate(),
            totalSubscriptionPaid: payload.paid_count,
            shortPaymentUrl: payload.short_url,
            remainingBillingCycles: payload.remaining_count,
        };
        return updatedResponse;
    }
}
