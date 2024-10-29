export enum AuthorizedStatus {
    AUTHORIZED_PAYMENT = 0,
    UNAUTHORIZED_PAYMENT = 1
}

export interface QueryOrderDto {
    authorized?: AuthorizedStatus;
    receipt ?: string;
    orderFromTime?: string;
    orderUntilTime?: string;
    ordersToFetch?: number;
    skipOrders?: number;
}

export interface GetOneOrderDto {
    orderId: string;
}