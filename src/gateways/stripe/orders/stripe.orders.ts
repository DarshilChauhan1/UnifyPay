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
                name,
                quantity,
                successUrl,
                cancelUrl,
                stripeExtraOptions,
                stripeExtraParams,
                returnUrl,
            } = payload;

            const checkoutSessionData = await this.stripe.checkout.sessions.create(
                {
                    payment_method_types: ['card'],
                    line_items: [
                        {
                            price_data: {
                                currency,
                                product_data: {
                                    name: name ?? 'Order Payment',
                                },
                                unit_amount: amount,
                            },
                            quantity: quantity ?? 1,
                        },
                    ],
                    ui_mode: 'embedded',
                    mode: 'payment',
                    success_url: successUrl,
                    cancel_url: cancelUrl,
                    customer_email: customerEmail,
                    metadata,
                    return_url: returnUrl,
                    ...stripeExtraParams,
                },
                stripeExtraOptions,
            );

            return checkoutSessionData;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getAllOrders(payload: QueryStripeOrderDto): Promise<Stripe.ApiList<Stripe.Checkout.Session>> {
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
