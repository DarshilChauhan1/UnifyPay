export interface QueryRazorpayPlanDto {
    planFromDate: Date;
    planToDate: Date;
    numberOfPlansToFetch: number;
    skipNumberOfPlans: number;
}

export interface QueryRazorpayOnePlanDto {
    planId: string;
}
