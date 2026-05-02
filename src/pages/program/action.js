import { GET_USER_BALANCE_REQ, GET_LAST_5_DRAW_REQ, WIN_BALANCE_DATA_REQ, TAKE_BALANCE_DATA_REQ, SINGLE_MESSAGE_DATA_REQ, SUBMIT_PROGRAM_DATA_REQ, CHECK_USER_WIN_REQ,DRAW_DETAIL_REQ } from "./type";
//
export const getUserBalance = ({ reqData = {}, onSuccessResponse, onErrorResponse }) => ({
    type: GET_USER_BALANCE_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessResponse,
        onError: onErrorResponse,
    }
})

//

export const getLast5Data = ({ reqData = {}, onSuccessResponse, onErrorResponse }) => ({
    type: GET_LAST_5_DRAW_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessResponse,
        onError: onErrorResponse,
    }
})

export const winBalanceData = ({ reqData = {}, onSuccessResponse, onErrorResponse }) => ({
    type: WIN_BALANCE_DATA_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessResponse,
        onError: onErrorResponse,
    }
})


export const takeBalanceData = ({ reqData = {}, onSuccessResponse, onErrorResponse }) => ({
    type: TAKE_BALANCE_DATA_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessResponse,
        onError: onErrorResponse,
    }
})

export const singleMessageData = ({ reqData = {}, onSuccessResponse, onErrorResponse }) => ({
    type: SINGLE_MESSAGE_DATA_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessResponse,
        onError: onErrorResponse,
    }
})

export const submitProgramData = ({ reqData = {}, onSuccessResponse, onErrorResponse }) => ({
    type: SUBMIT_PROGRAM_DATA_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessResponse,
        onError: onErrorResponse,
    }
})


export const checkUserWinReqData = ({ reqData = {}, onSuccessResponse, onErrorResponse }) => ({
    type: CHECK_USER_WIN_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessResponse,
        onError: onErrorResponse,
    }
})

export const drawDetailReqData = ({ reqData = {}, onSuccessResponse, onErrorResponse }) => ({
    type: DRAW_DETAIL_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessResponse,
        onError: onErrorResponse,
    }
})

