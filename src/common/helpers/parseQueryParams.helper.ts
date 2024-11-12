import moment from "moment"
import { CustomError } from "./customError.error"

export const parseQueryParams = (payload: {
    from?: Date,
    to?: Date
}): object => {
    const { from, to } = payload
    const formattedObj = {}
    // check for both 
    if (from) {
        if (!moment(from).isValid()) throw new CustomError(400, 'Invalid Date Format')
        formattedObj['from'] = moment(from).unix()
    }
    if (to) {
        if (!moment(to).isValid()) throw new CustomError(400, 'Invalid Date format')
        formattedObj['to'] = moment(to).unix()
    }
    return formattedObj
}