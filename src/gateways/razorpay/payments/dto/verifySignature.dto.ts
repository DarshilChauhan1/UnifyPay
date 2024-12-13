export interface VerifySignatureDto {
    orderId: string;
    paymentId: string;
    razorpaySignature: string;
    secret: string;
}
