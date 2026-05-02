import { CHANGE_PASSWORD_REQ } from "./type";
//
export const getUserChangePassword = ({ reqData = {}, onSuccessResponse, onErrorResponse }) => ({
    type: CHANGE_PASSWORD_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessResponse,
        onError: onErrorResponse,
    }
})