import { USER_LOGIN_REQ } from "./type";
//
export const getUserLogin = ({ reqData = {}, onSuccessResponse, onErrorResponse }) => ({
    type: USER_LOGIN_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessResponse,
        onError: onErrorResponse,
    }
})