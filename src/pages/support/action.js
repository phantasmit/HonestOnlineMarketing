import { SUPPORT_DATA_REQ, SUPPORT_SUBMIT_DATA_REQ, SUPPORT_DETAIL_DATA_REQ } from "./type";
//
export const getSupportData = ({ reqData = {}, onSuccessResponse, onErrorResponse }) => ({
    type: SUPPORT_DATA_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessResponse,
        onError: onErrorResponse,
    }
})
//
export const setSupportSubmitData = ({ reqData = {}, onSuccessResponse, onErrorResponse }) => ({
    type: SUPPORT_SUBMIT_DATA_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessResponse,
        onError: onErrorResponse,
    }
})

export const getSupportDetailData = ({ reqData = {}, onSuccessResponse, onErrorResponse }) => ({
    type: SUPPORT_DETAIL_DATA_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessResponse,
        onError: onErrorResponse,
    }
})