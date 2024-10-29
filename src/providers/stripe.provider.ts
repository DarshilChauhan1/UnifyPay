import { StripeCredentials } from '../common/interfaces/credentials.types'
import Stripe from 'stripe'
export class StripePayment {
    private stripe: Stripe;
    constructor(credentials : StripeCredentials) {
        this.stripe = new Stripe(credentials.apiKey, {
            apiVersion : credentials.apiVersion,
            appInfo : credentials.appInfo,
            host : credentials.host,
            stripeAccount : credentials.stripeAccount,
            maxNetworkRetries : credentials.maxRetries,
            timeout : credentials.timeout,
            port : credentials.port
        });
    }

    async connectAccount(){
        
    }

    
}