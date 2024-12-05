export interface QuerySettlementDto {
    settlementFromTime?: Date;
    settlementUntilTime?: Date;
    settlementsToFetch?: number;
    skipNumberOfSettlements?: number;
}
