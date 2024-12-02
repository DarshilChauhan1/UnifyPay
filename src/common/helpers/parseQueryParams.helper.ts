import moment from 'moment';
import { CustomError } from './customError.error';

export const parseQueryParams = (payload: Record<string, Date>): Record<string, number> => {
    const formattedObj: Record<string, number> = {};
    for (const key in payload) {
        const value = payload[key];

        if (value) {
            // validate the date
            if (!moment(value).isValid()) {
                throw new CustomError(400, `Invalid date format for ${key}`);
            }
            formattedObj[key] = moment(value).unix();
        }
    }
    return formattedObj;
};
