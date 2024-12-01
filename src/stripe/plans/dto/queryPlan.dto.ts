export interface QueryPlanDto {
    active?: boolean
    createdAfter?: Date // Inclusive
    createdBefore?: Date // Inclusive
    limit?: number
    product?: string
}
