export interface CreateRazorPayOrderDto {
    amount: number;
    // ISO currency code
    currency: string;
    // can have max 40 characters
    receipt?: string;
    notes?: any;
    partialPayment?: boolean;
    first_payment_min_amount?: number;
    apiKey: string;
    businessName?: string;
    description?: string;
    imageUrl?: string;
    callBackUrl?: string;
    customerInfo?: {
        name?: string;
        email?: string;
        contact?: string;
    };
    theme?: {
        color?: string;
    };
}
