import Stripe from 'stripe';
import { parseQueryParams } from '../../common/helpers/parseQueryParams.helper';
import { StripeCredentials } from '../../common/types/credentials.types';
import { CreateOrderDto } from './dto/createOrder.dto';
import { QueryOrderDto } from './dto/queryOrder.dto';
import { UpdateOrderDto } from './dto/updateOrder.dto';

export class StripeOrders {
    private stripe: Stripe;

    constructor(credentials: StripeCredentials) {
        this.stripe = new Stripe(credentials.apiKey, {
            apiVersion: credentials.apiVersion,
        });
    }

    async createStripeOrder(payload: CreateOrderDto): Promise<Stripe.Checkout.Session> {
        try {
            const {
                amount,
                currency,
                customerEmail,
                metadata,
                name,
                returnUrl,
                quantity,
                stripeExtraOptions,
                stripeExtraParams,
            } = payload;
            const paymentIntent = await this.stripe.checkout.sessions.create(
                {
                    payment_method_types: ['card', 'ideal', 'sepa_debit'],
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
                    mode: 'payment',
                    ui_mode: 'embedded',
                    return_url: returnUrl,
                    customer_email: customerEmail,
                    metadata,
                    ...stripeExtraParams,
                },
                stripeExtraOptions,
            );
            return paymentIntent;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async createCheckoutSessionWithOrder(payload: CreateOrderDto): Promise<Stripe.Checkout.Session> {
        try {
            const {
                amount,
                currency,
                customerEmail,
                metadata,
                name,
                successUrl,
                cancelUrl,
                quantity,
                stripeExtraParams,
                stripeExtraOptions,
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
                    ui_mode: 'hosted',
                    mode: 'payment',
                    success_url: successUrl,
                    cancel_url: cancelUrl,
                    customer_email: customerEmail,
                    metadata,
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

    async getAllOrders(payload: QueryOrderDto): Promise<Stripe.ApiList<Stripe.Checkout.Session>> {
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
            const formattedDates = parseQueryParams({ from: orderFromTime, to: orderUntilTime });
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

    async getOrderById(
        orderId: string,
        stripeExtraParams?: Stripe.Checkout.SessionRetrieveParams,
        stripeExtraOptions?: Stripe.RequestOptions,
    ): Promise<Stripe.Checkout.Session> {
        try {
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

    async updateOrder(payload: UpdateOrderDto): Promise<Stripe.Checkout.Session> {
        try {
            const { checkoutSessionId, metadata, stripeExtraParams, stripeExtraOptions } = payload;
            const updatedCheckoutSession = await this.stripe.checkout.sessions.update(
                checkoutSessionId,
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
