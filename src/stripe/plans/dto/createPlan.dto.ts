// create a dto file for the createPlan method in the stripe provider
export interface CreatePlanDto {
  amount: number;
  currency: Currency;
  interval: BillingFrequency;
  product: string;
  nickname: string;
  metadata: any;
}