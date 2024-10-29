export interface QueryPaymentDto {
    paymentFromTime ?: string
    paymentUntilTime ?: string
    paymnetsToFetch ?: number
    skipNumberOfPayments ?: number
}

export type ExtentedType = {
    card : string
    upi : string
    emi : string
    offers : string
}

export interface QueryOrderPaymentDto{
    orderId : string
}

export interface QueryPaymentCardDetailsDto {
    paymentId : string
}


export interface QueryPaymentExtendedDto {
    paymentId : string
    extend ?: ExtentedType
}