import Stripe from 'stripe'
import { StripeCredentials } from '../../common/types/credentials.types'
import { CombinedOrderAndCheckoutSessionDto, CreateOrderDto } from './dto/createOrder.dto'
import { GetOneOrderDto, QueryOrderDto } from './dto/queryOrder.dto'
import { UpdateOrderDto } from './dto/updateOrder.dto'

export class StripeOrders {
    private stripe: Stripe

    constructor (credentials: StripeCredentials) {
        this.stripe = new Stripe(credentials.apiKey, {
            apiVersion: credentials.apiVersion,
        })
    }

    async createStripeOrder (payload: CreateOrderDto) {
        try {
            const { amount, currency, receiptEmail, metadata, description } = payload
            const paymentIntent = await this.stripe.paymentIntents.create({
                amount,
                currency,
                receipt_email: receiptEmail,
                metadata,
                description,
            })
            return paymentIntent
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async createCheckoutSessionWithOrder (payload: CombinedOrderAndCheckoutSessionDto): Promise<[any, any]> {
        try {
            const { order, checkoutSession } = payload

            const paymentIntent = await this.stripe.paymentIntents.create({
                amount: order.amount,
                currency: order.currency,
                metadata: order.metadata,
                receipt_email: order.receiptEmail,
            })

            const checkoutSessionData = await this.stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                ui_mode: checkoutSession.uiMode,
                line_items: [
                    {
                        price_data: {
                            currency: order.currency,
                            product_data: {
                                name: 'Order Payment', // You can adjust this
                            },
                            unit_amount: order.amount,
                        },
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                success_url: checkoutSession.successUrl,
                cancel_url: checkoutSession.cancelUrl,
                customer_email: checkoutSession.customerEmail,
                metadata: checkoutSession.metadata,
            })

            return [paymentIntent, checkoutSessionData]
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async getAllOrders (payload: QueryOrderDto) {
        try {
            const { limit, customerId } = payload
            const paymentIntents = await this.stripe.paymentIntents.list({
                limit,
                customer: customerId,
            })
            return paymentIntents
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async getOrderById (payload: GetOneOrderDto) {
        try {
            const { paymentIntentId } = payload
            const paymentIntent = await this.stripe.paymentIntents.retrieve(paymentIntentId)
            return paymentIntent
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async updateOrder (payload: UpdateOrderDto) {
        try {
            const { paymentIntentId, metadata } = payload
            const paymentIntent = await this.stripe.paymentIntents.update(paymentIntentId, { metadata })
            return paymentIntent
        } catch (error) {
            console.error(error)
            throw error
        }
    }
}
