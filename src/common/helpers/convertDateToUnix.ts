import moment from 'moment';
import { UnifiedPayError } from './customError.error';

export const convertDateToUnix = (payload: Record<string, Date | string>): Record<string, number> => {
    const formattedObj: Record<string, number> = {};
    for (const key in payload) {
        const value = payload[key];

        if (value) {
            // validate the date
            if (!moment(value).isValid()) {
                throw new UnifiedPayError(400, `Invalid date format for ${key}`);
            }
            formattedObj[key] = moment(value).unix();
        }
    }
    return formattedObj;
};
