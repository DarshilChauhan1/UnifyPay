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
  customerEmail?: string; // Customer email
  metadata?: any; // Additional metadata for the session
  uiMode?: 'embedded' | 'hosted'; // UI mode for the checkout session
  lineItems?: {
    adjustableQuantity?: {
      enabled: boolean; // Enable or disable the quantity adjustment
      minimum: number; // Minimum quantity allowed  
      maximum: number; // Maximum quantity
    };
    dynamicTaxRates?: string[]; // Dynamic tax rates to apply
    taxRates?: string[]; // Tax rates to apply
    price: string; // Price ID from the Stripe dashboard
    quantity: number; // Quantity of the item
  }[];
  // returnUrl is not allowed if the UI mode is 'hosted'
  // returnUrl is required if the UI mode is 'embedded'
  returnUrl?: string;
}

export interface CombinedOrderAndCheckoutSessionDto {
  order: CreateOrderDto;
  checkoutSession: CheckoutSessionDto;
}
