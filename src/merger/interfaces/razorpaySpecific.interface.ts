import { VerifySignatureDto } from '../../gateways/razorpay/payments/dto/verifySignature.dto';

export interface RazorpaySpecificMethods {
    verifyPaymentSignature(payload: VerifySignatureDto): Promise<boolean>;
}
