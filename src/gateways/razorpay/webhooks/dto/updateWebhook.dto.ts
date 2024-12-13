export interface UpdateWebhookDto {
    accountId: string;
    webhookId: string;
    backendUrl: string;
    events: string[];
}
