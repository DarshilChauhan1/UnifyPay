export interface CreateOrderDto {
  // pass the amount in paise suppose if price is 299 then pass 29900
  amount: number;
  // ISO currency code
  currency: string;
  // show to customer
  description?: string;
  metadata?: any;
  receiptEmail?: string;
}

export interface CheckoutSessionDto {
  // successUrl is not allowed if the UI mode is 'embedded'
  successUrl: string;
  // cancelUrl is not allowed if the UI mode is 'embedded'
  cancelUrl: string;
  customerEmail?: string;
  metadata?: any;
  uiMode?: 'embedded' | 'hosted';
  lineItems?: {
    adjustableQuantity?: {
      enabled: boolean;
      minimum: number;
      maximum: number;
    };
    dynamicTaxRates?: string[];
    taxRates?: string[];
    price: string; // Price ID from the Stripe dashboard
    quantity: number;
  }[];
  /**
   * Not allowed if the UI mode is 'hosted'
   * The URL to redirect your customer back to after they authenticate or cancel their payment on the payment method’s app or site.
   */
  returnUrl?: string;
}

export interface CombinedOrderAndCheckoutSessionDto {
  order: CreateOrderDto;
  checkoutSession: CheckoutSessionDto;
}
