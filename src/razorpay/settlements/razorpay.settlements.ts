import Razorpay from "razorpay";
import { RazorPayCredentials } from "../../common/interfaces/credentials.types";
import { QuerySettlementDto } from "./dto/querySettlement.dto";
import moment from "moment";
import { CustomError } from "../../common/helpers/customError.error";

export class RazorPaySettlements {
    private razorpay: Razorpay;
    constructor(credentials: RazorPayCredentials) {
        this.razorpay = new Razorpay({
            key_id: credentials.keyId,
            key_secret: credentials.keySecret
        });
    }

    // status could be processed, created, failed
    async getAllSettlements(query : QuerySettlementDto) {
        try {
            const upadtedQuery = this.parseQuery(query)
            const settlements = await this.razorpay.settlements.all(upadtedQuery)
            const response = {
                totalSettlements : settlements.count,
                settlements : settlements.items.map((settlement : any) => {
                    return {
                        ...settlement,
                        created_at : moment.unix(settlement.created_at).toISOString(),
                    }
                })
            }
            return response

        } catch (error) {
            throw error
        }
    }

    // implement a common passing query function
    private parseQuery(query : QuerySettlementDto) {
        try {
            const {settlementFromTime, settlementUntilTime} = query
            const newQuery = {
                count: query.settlementsToFetch,
                skip: query.skipNumberOfSettlements
            }

            if (settlementFromTime) {
                if (!moment(settlementFromTime).isValid()) throw new CustomError(400, 'The Date Format is not valid')
                newQuery['from'] = moment(settlementFromTime).unix()
            }

            if (settlementUntilTime) {
                if (!moment(settlementUntilTime).isValid()) throw new CustomError(400, 'The Date Format is not valid')
                newQuery['to'] = moment(settlementUntilTime).unix()
            }

            return newQuery

        } catch (error) {
            throw new CustomError(400, error.message)
        }    
    }
}