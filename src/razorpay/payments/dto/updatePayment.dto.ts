import { IMap } from "razorpay/dist/types/api";

export interface UpdatePaymentDto {
    paymentId : string;
    notes : IMap<string | number>;
}