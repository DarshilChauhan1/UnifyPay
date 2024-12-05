export enum AuthorizedStatus {
    AUTHORIZED_PAYMENT = 0,
    UNAUTHORIZED_PAYMENT = 1,
}

export interface QueryRazorpayOrderDto {
    authorized?: AuthorizedStatus;
    receipt?: string;
    orderFromTime?: Date;
    orderUntilTime?: Date;
    ordersToFetch?: number;
    skipOrders?: number;
}

export interface QueryRazorpayOneOrderDto {
    orderId: string;
}
