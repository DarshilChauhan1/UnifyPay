import Razorpay from "razorpay";
import { RazorPayCredentials } from "../../common/types/credentials.types";
import moment from "moment";
import { UpdateWebhookDto } from "./dto/updateWebhook.dto";
import crypto from 'crypto'
export class RazorpayWebhook {
    private razorpay: Razorpay
    constructor(private credentials: RazorPayCredentials) {
        this.razorpay = new Razorpay({
            key_id: credentials.keyId,
            key_secret: credentials.keySecret
        })
    }

    async verifyWebhookSignature(request: any, razorpayWebhookSecret: string) {
        try {
            const signature = request.headers['x-razorpay-signature'];
            const expectedSignature = crypto.createHmac('sha256', razorpayWebhookSecret)
                .update(JSON.stringify(request.body))
                .digest('hex');
            if (signature === expectedSignature) true

            return false
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async createWebhook(payload: any) {
        try {
            const webhook = await this.razorpay.webhooks.create(payload)
            const { created_at, updated_at } = webhook
            const formattedResponse = {
                createdAt: moment.unix(created_at).toISOString(),
                updatedAt: moment.unix(updated_at).toISOString(),
                ownerId: webhook.owner_id,
                id: webhook.id,
                backendUrl: webhook.url,
                secret: webhook.secret,
                alertEmail: webhook.alert_email,
                active: webhook.active,
                secretExists: webhook.secret_exists,
            }
            return formattedResponse
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async updateWebhook(payload: UpdateWebhookDto) {
        try {
            const { accountId, backendUrl, events, webhookId } = payload
            const updateWebhook = await this.razorpay.webhooks.edit({
                events: events,
                url: backendUrl,
            }, webhookId, accountId)
            const formattedResponse = {
                createdAt: moment.unix(updateWebhook.created_at).toISOString(),
                updatedAt: moment.unix(updateWebhook.updated_at).toISOString(),
                ownerId: updateWebhook.owner_id,
                id: updateWebhook.id,
                backendUrl: updateWebhook.url,
                secret: updateWebhook.secret,
                alertEmail: updateWebhook.alert_email,
                active: updateWebhook.active,
                secretExists: updateWebhook.secret_exists,
            }

            return formattedResponse
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async deleteWebhook(webhookId: string, accountId: string) {
        try {
            const deletedWebhook = await this.razorpay.webhooks.delete(webhookId, accountId)
            return {
                message: 'Webhook deleted successfully'
            }
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}