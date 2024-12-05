export interface UpdateRazorpaySubscriptionDto {
    subscriptionId: string;
    planId?: string;
    offerId?: string;
    planQuantity?: number;
    totalBillingCycles?: number;
    subscriptionStartAt?: Date;
    scheduleChangeAt?: Date;
    customerNotify?: boolean;
}

export interface CancelRazorpaySubscriptionDto {
    subscriptionId: string;
    cancelAtCycleEnd?: boolean;
}

export interface PauseRazorpaySubscriptionDto {
    subscriptionId: string;
    razorpayExtraParams?: {
        pause_at: 'now';
    };
}

export interface ResumeRazorpaySubscriptionDto {
    subscriptionId: string;
    razorpayExtraParams?: {
        resume_at: 'now';
    };
}

export interface DeleteOfferOfRazorpaySubscriptionDto {
    subscriptionId: string;
    offerId: string;
}
