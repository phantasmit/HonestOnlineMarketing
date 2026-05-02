import { USER_REGISTER_REQ } from "./type";
//
export const getUserRegister = ({ reqData = {}, onSuccessResponse, onErrorResponse }) => ({
    type: USER_REGISTER_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessResponse,
        onError: onErrorResponse,
    }
})