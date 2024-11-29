export interface CreateWebhookDto {
    /**
     * The URL where the webhook payload will be sent.
     * Must be a publicly accessible HTTPS endpoint.
     */
    backendUrl: string;
  
    /**
     * The email address to send alerts if webhook delivery fails.
     */
    alertEmail: string;
  
    /**
     * Optional secret used to verify the webhook's authenticity.
     * This should match the secret set in the webhook configuration.
     */
    webhookSecret?: string;
  
    /**
     * An array of events that the webhook should listen to.
     * Example events: "payment.captured", "order.paid".
     */
    events: string[];
  }

  // write all the type of events to visible to the user in vscode
  
  