import { HISTORY_DATA_REQ, VERIFY_DRAWTIME_REQ } from "./type";
//
export const getHistoryData = ({ reqData = {}, onSuccessResponse, onErrorResponse }) => ({
    type: HISTORY_DATA_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessResponse,
        onError: onErrorResponse,
    }
})
//
export const verifyDrawTimeData = ({ reqData = {}, onSuccessResponse, onErrorResponse }) => ({
    type: VERIFY_DRAWTIME_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessResponse,
        onError: onErrorResponse,
    }
})