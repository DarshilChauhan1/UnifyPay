import Razorpay from 'razorpay';
import { RazorPayCredentials } from '../../common/types/credentials.types';
import { QuerySettlementDto } from './dto/querySettlement.dto';
import moment from 'moment';
import { parseQueryParams } from '../../common/helpers/parseQueryParams.helper';

export class RazorPaySettlements {
    private razorpay: Razorpay;
    constructor(credentials: RazorPayCredentials) {
        this.razorpay = new Razorpay({
            key_id: credentials.keyId,
            key_secret: credentials.keySecret,
        });
    }

    // status could be processed, created, failed
    async getAllSettlements(query: QuerySettlementDto) {
        try {
            const { settlementFromTime, settlementUntilTime, settlementsToFetch, skipNumberOfSettlements } = query;
            const formattedDates = parseQueryParams({ from: settlementFromTime, to: settlementUntilTime });
            const queryData = {
                ...formattedDates,
                count: settlementsToFetch,
                skip: skipNumberOfSettlements,
            };
            const settlements = await this.razorpay.settlements.all(queryData);
            const response = {
                totalSettlements: settlements.count,
                settlements: settlements.items.map((settlement: any) => {
                    return {
                        ...settlement,
                        created_at: moment.unix(settlement.created_at).toISOString(),
                    };
                }),
            };
            return response;
        } catch (error) {
            throw error;
        }
    }
}
