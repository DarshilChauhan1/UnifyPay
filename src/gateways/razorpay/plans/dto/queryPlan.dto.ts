export interface QueryRazorpayPlanDto {
    plansFromDate?: Date | string;
    plansTillDate?: Date | string;
    plansToFetch?: number;
    skipPlans?: number;
}

export interface QueryRazorpayOnePlanDto {
    planId: string;
}
