export interface QuerySettlementDto {
    settlementFromTime?: Date | string;
    settlementUntilTime?: Date | string;
    settlementsToFetch?: number;
    skipNumberOfSettlements?: number;
}
