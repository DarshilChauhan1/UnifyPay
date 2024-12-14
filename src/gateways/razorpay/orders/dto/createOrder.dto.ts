import { Currency } from '../../../../common/types/currency.types';

export class CreateRazorPayOrderDto {
    amount: number;
    // ISO currency code
    currency: Currency;
    // can have max 40 characters
    receipt?: string;
    notes?: Record<string, any>;
    partialPayment?: boolean;
    first_payment_min_amount?: number;
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
