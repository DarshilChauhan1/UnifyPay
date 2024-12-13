export type RazorpayCheckoutSession = {
    name: string;
    description: string;
    image: string;
    callback_url: string;
    prefill: {
        name?: string;
        email?: string;
        contact?: string;
    };
    order_id: string;
    amount: number;
    currency: string;
    notes: Record<string, any>;
    theme: {
        color?: string;
    };
};
