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
            const {
                limit,
                customerId,
                lastRecordId,
                orderFromTime,
                orderUntilTime,
                stripeExtraOptions,
                stripeExtraParams,
            } = payload;
            const formattedDates = convertDateToUnix({ from: orderFromTime, to: orderUntilTime });
            const query = {};
            const range = {};
            if (formattedDates.from) {
                range['gte'] = formattedDates.from;
            }
            if (formattedDates.to) {
                range['lte'] = formattedDates.to;
            }
            if (Object.keys(range).length > 0) {
                query['created'] = range;
            }
            if (limit) {
                query['limit'] = limit;
            }
            if (lastRecordId) {
                query['starting_after'] = lastRecordId;
            }

            return await this.stripe.checkout.sessions.list(
                {
                    customer: customerId,
                    ...query,
                    ...stripeExtraParams,
                },
                stripeExtraOptions,
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getOrderById(payload: QueryStripeOneOrderDto): Promise<Stripe.Checkout.Session> {
        try {
            const { orderId, stripeExtraOptions, stripeExtraParams } = payload;
            const checkoutSession = await this.stripe.checkout.sessions.retrieve(
                orderId,
                stripeExtraParams,
                stripeExtraOptions,
            );
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
