import Razorpay from 'razorpay';
import { RazorPayCredentials } from '../../common/types/credentials.types';
import { VerifySignatureDto } from './dto/verifySignature.dto';
import crypto from 'crypto';
import { CapturePaymentDto } from './dto/createPayment.dto';
import {
    QueryOrderPaymentDto,
    QueryPaymentCardDetailsDto,
    QueryPaymentDto,
    QueryPaymentExtendedDto,
} from './dto/queryPayment.dto';
import { UpdatePaymentDto } from './dto/updatePayment.dto';
import { parseQueryParams } from '../../common/helpers/parseQueryParams.helper';
export class RazorpayPayment {
    private razorpay: Razorpay;
    constructor(credentials: RazorPayCredentials) {
        this.razorpay = new Razorpay({
            key_id: credentials.keyId,
            key_secret: credentials.keySecret,
        });
    }

    async verifyPaymentSignature(payload: VerifySignatureDto, secret: string): Promise<boolean> {
        try {
            const { orderId, paymentId, razorpaySignature } = payload;
            if (!orderId || !paymentId || !razorpaySignature) throw new Error('Missing required fields');

            const hash = crypto.createHmac('sha256', secret);
            hash.update(orderId + '|' + paymentId);

            const generatedSignature = hash.digest('hex');

            const isValid = generatedSignature === razorpaySignature;
            return isValid;
        } catch (error) {
            throw error;
        }
    }

    async createPayment(payload: CapturePaymentDto): Promise<object> {
        try {
            const payment = await this.razorpay.payments.capture(
                payload.paymentId,
                payload.orderAmount,
                payload.currency,
            );
            return payment;
        } catch (error) {
            throw error;
        }
    }

    async getPaymentDetails(paymentId: string, query?: QueryPaymentExtendedDto): Promise<object> {
        try {
            const { extend } = query;
            let extendObj: any;
            if (extend) {
                extendObj = {
                    'expand[]': extend,
                };
            }
            const payment = await this.razorpay.payments.fetch(paymentId, extendObj);
            return payment;
        } catch (error) {
            throw error;
        }
    }

    async getAllPayments(payload: QueryPaymentDto): Promise<any> {
        try {
            const { paymentFromTime, paymentUntilTime, paymnetsToFetch, skipNumberOfPayments } = payload;
            const formattedDates = parseQueryParams({ from: paymentFromTime, to: paymentUntilTime });
            const queryData = {
                count: paymnetsToFetch,
                skip: skipNumberOfPayments,
                ...formattedDates,
            };
            const payments = await this.razorpay.payments.all(queryData);
            return payments;
        } catch (error) {
            throw error;
        }
    }

    async getOrderPayments(payload: QueryOrderPaymentDto): Promise<object> {
        try {
            const { orderId } = payload;
            const orderPaymentDetail = await this.razorpay.orders.fetchPayments(orderId);

            return orderPaymentDetail;
        } catch (error) {
            throw error;
        }
    }

    async getCardDetailsOfPayment(payload: QueryPaymentCardDetailsDto) {
        try {
            const { paymentId } = payload;
            const cardDetails = await this.razorpay.payments.fetchCardDetails(paymentId);
            return cardDetails;
        } catch (error) {
            throw error;
        }
    }

    async updatePaymentNotes(payload: UpdatePaymentDto) {
        try {
            const { notes, paymentId } = payload;
            const updatedPayment = await this.razorpay.payments.edit(paymentId, { notes });
            return updatedPayment;
        } catch (error) {
            throw error;
        }
    }
}
