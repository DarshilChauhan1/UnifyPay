import { Currency } from '../../../../common/types/currency.types';

export interface CreateRazorpaySubscriptionDto {
    planId: string;
    totalBillingCycles: number;
    planQuantity?: number;
    planStartAt?: Date;
    paymentExpiry?: Date;
    notifyCustomer?: boolean;
    upfrontAddonsList?: UpFrontAmountDto[];
    offerId?: string;
    notes?: Record<string, any>;
}

export interface UpFrontAmountDto {
    name?: string;
    amount?: number;
    currency?: Currency;
}
