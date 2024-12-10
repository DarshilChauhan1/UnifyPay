export interface QueryRazorpayPlanDto {
    plansFromDate?: Date | string;
    plansTillDate?: Date | string;
    numberOfPlansToFetch?: number;
    skipNumberOfPlans?: number;
}

export interface QueryRazorpayOnePlanDto {
    planId: string;
}
