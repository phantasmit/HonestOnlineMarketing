import { HISTORY_DETAIL_REQ, CANCEL_TICKET_REQ } from "./type";
//
export const getHistoryDetailData = ({ reqData = {}, onSuccessResponse, onErrorResponse }) => ({
    type: HISTORY_DETAIL_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessResponse,
        onError: onErrorResponse,
    }
})
//
export const cancelTicketData = ({ reqData = {}, onSuccessResponse, onErrorResponse }) => ({
    type: CANCEL_TICKET_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessResponse,
        onError: onErrorResponse,
    }
})