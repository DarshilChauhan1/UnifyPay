import Stripe from 'stripe';
import { parseQueryParams } from '../../common/helpers/parseQueryParams.helper';
import { StripeCredentials } from '../../common/types/credentials.types';
import { CreateOrderDto } from './dto/createOrder.dto';
import { GetOneOrderDto, QueryOrderDto } from './dto/queryOrder.dto';
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
            const { amount, currency, customerEmail, metadata, name, returnUrl, quantity } = payload;
            const paymentIntent = await this.stripe.checkout.sessions.create({
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
            });
            return paymentIntent;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async createCheckoutSessionWithOrder(payload: CreateOrderDto): Promise<Stripe.Checkout.Session> {
        try {
            const { amount, currency, customerEmail, metadata, name, successUrl, cancelUrl, quantity } = payload;

            const checkoutSessionData = await this.stripe.checkout.sessions.create({
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
            });

            return checkoutSessionData;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getAllOrders(payload: QueryOrderDto): Promise<Stripe.ApiList<Stripe.Checkout.Session>> {
        try {
            const { limit, customerId, lastRecordId, orderFromTime, orderUntilTime } = payload;
            const formattedDates = parseQueryParams({ from: orderFromTime, to: orderUntilTime });
            let query = {};
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

            return await this.stripe.checkout.sessions.list({
                customer: customerId,
                ...query,
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getOrderById(payload: GetOneOrderDto): Promise<Stripe.Checkout.Session> {
        try {
            const { paymentIntentId } = payload;
            const checkoutSession = await this.stripe.checkout.sessions.retrieve(paymentIntentId);
            return checkoutSession;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async updateOrder(payload: UpdateOrderDto): Promise<Stripe.Checkout.Session> {
        try {
            const { checkoutSessionId, metadata } = payload;
            const updatedCheckoutSession = await this.stripe.checkout.sessions.update(checkoutSessionId, {
                metadata,
            });
            return updatedCheckoutSession;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
