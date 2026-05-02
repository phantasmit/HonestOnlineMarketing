import { USER_INFO_DATA_REQ, ADD_BALANCE_REQ, WITHDRAW_BALANCE_REQ, TRANSACTION_STATUS_REQ, CANCEL_TRANSACTION_REQ } from "./type";
//
export const getUserInfoData = ({ reqData = {}, onSuccessResponse, onErrorResponse }) => ({
    type: USER_INFO_DATA_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessResponse,
        onError: onErrorResponse,
    }
})
//
export const addBalanceData = ({ reqData = {}, onSuccessResponse, onErrorResponse }) => ({
    type: ADD_BALANCE_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessResponse,
        onError: onErrorResponse,
    }
})
//
export const withdrawBalanceData = ({ reqData = {}, onSuccessResponse, onErrorResponse }) => ({
    type: WITHDRAW_BALANCE_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessResponse,
        onError: onErrorResponse,
    }
})
//
export const transactionStatusData = ({ reqData = {}, onSuccessResponse, onErrorResponse }) => ({
    type: TRANSACTION_STATUS_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessResponse,
        onError: onErrorResponse,
    }
})
//
export const cancelTransactionData = ({ reqData = {}, onSuccessResponse, onErrorResponse }) => ({
    type: CANCEL_TRANSACTION_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessResponse,
        onError: onErrorResponse,
    }
})