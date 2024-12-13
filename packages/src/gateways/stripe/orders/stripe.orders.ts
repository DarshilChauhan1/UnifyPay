import moment from 'moment';
import Stripe from 'stripe';
import { convertDateToUnix } from '../../../common/helpers/convertDateToUnix';
import { CreateStripeOrderDto } from './dto/createOrder.dto';
import { QueryStripeOneOrderDto, QueryStripeOrderDto } from './dto/queryOrder.dto';
import { UpdateStripeOrderDto } from './dto/updateOrder.dto';

export class StripeOrders {
    private stripe: Stripe;
    constructor(stripeInstance: Stripe) {
        this.stripe = stripeInstance;
    }

    async createStripeOrder(payload: CreateStripeOrderDto): Promise<Stripe.Checkout.Session> {
        try {
            const {
                amount,
                currency,
                customerEmail,
                metadata,
                name = 'Order Payment',
                quantity = 1,
                successUrl,
                cancelUrl,
                stripeExtraOptions,
                stripeExtraParams,
                returnUrl,
                uiMode = 'embedded', // Default to 'embedded'
            } = payload;

            // Validation
            if (uiMode === 'hosted' && (!successUrl || !cancelUrl)) {
                throw new Error('successUrl and cancelUrl are required for hosted uiMode.');
            }

            if (uiMode === 'embedded' && !returnUrl) {
                throw new Error('returnUrl is required for embedded uiMode.');
            }

            const sessionParams: Stripe.Checkout.SessionCreateParams = {
                payment_method_types: ['card'],
                line_items: [
                    {
                        price_data: {
                            currency,
                            product_data: { name },
                            unit_amount: amount,
                        },
                        quantity,
                    },
                ],
                ui_mode: uiMode,
                mode: 'payment',
                customer_email: customerEmail,
                metadata,
                ...stripeExtraParams,
            };

            if (uiMode === 'hosted') {
                sessionParams.success_url = successUrl;
                sessionParams.cancel_url = cancelUrl;
            } else if (uiMode === 'embedded') {
                sessionParams.return_url = returnUrl;
            }

            const checkoutSessionData = await this.stripe.checkout.sessions.create(sessionParams, stripeExtraOptions);

            return checkoutSessionData;
        } catch (error) {
            throw error;
        }
    }

    async getAllOrders(payload?: QueryStripeOrderDto): Promise<Stripe.ApiList<Stripe.Checkout.Session>> {
        try {
            let formattedDates: Record<string, number> = {};
            if (payload?.ordersFromDate || payload?.ordersTillDate) {
                formattedDates = convertDateToUnix({
                    ordersFromDate: payload?.ordersFromDate,
                    ordersTillDate: payload?.ordersTillDate
                        ? moment(payload.ordersTillDate).add(1, 'days').toDate()
                        : undefined,
                });
            }

            const query = {
                ...(payload?.ordersToFetch && { limit: payload.ordersToFetch }),
                ...(payload?.lastRecordId && { starting_after: payload.lastRecordId }),
                ...(payload?.customerId && { customer: payload.customerId }),
                ...(formattedDates['ordersFromDate'] && { created: { gte: formattedDates['ordersFromDate'] } }),
                ...(formattedDates['ordersTillDate'] && { created: { lte: formattedDates['ordersTillDate'] } }),
                ...(payload?.stripeExtraParams && { ...payload.stripeExtraParams }),
            };

            return await this.stripe.checkout.sessions.list(
                {
                    ...query,
                },
                payload?.stripeExtraOptions,
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getOrderById(payload: QueryStripeOneOrderDto): Promise<Stripe.Checkout.Session> {
        try {
            const { orderId, stripeExtraOptions } = payload;
            const checkoutSession = await this.stripe.checkout.sessions.retrieve(orderId, stripeExtraOptions);
            return checkoutSession;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async updateOrder(payload: UpdateStripeOrderDto): Promise<Stripe.Checkout.Session> {
        try {
            const { metadata, stripeExtraParams, stripeExtraOptions, orderId } = payload;
            const updatedCheckoutSession = await this.stripe.checkout.sessions.update(
                orderId,
                {
                    metadata,
                    ...stripeExtraParams,
                },
                stripeExtraOptions,
            );
            return updatedCheckoutSession;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
