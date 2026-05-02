import { CHANGE_STACK_REQ, USER_INFO_REQ, LOGOUT, USER_LOGOUT_REQ, USER_ACTIVE_STATUS_REQ, APP_VERSION_STATUS_REQ, USER_SESSION_STATUS_REQ, UPDATE_ERROR_REQ, CHECK_APP_MAINTAINANCE_STATUS_REQ, CHECK_APP_USER_UDID_REQ } from "./types";
//
export const changeStack = (payload = {}) => ({
    type: CHANGE_STACK_REQ,
    ...payload
})
//
export const setUserInfo = (payload = {}) => ({
    type: USER_INFO_REQ,
    ...payload
})
export const doLogoutFun = ({ reqData = {}, onSuccessResponse, onErrorResponse }) => ({
    type: USER_LOGOUT_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessResponse,
        onError: onErrorResponse,
    }
});
//
export const checkUserActivOrNotData = ({ reqData = {}, onSuccessResponse, onErrorResponse }) => ({
    type: USER_ACTIVE_STATUS_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessResponse,
        onError: onErrorResponse,
    }
});
//
export const checkAppVersionStatusData = ({ reqData = {}, onSuccessResponse, onErrorResponse }) => ({
    type: APP_VERSION_STATUS_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessResponse,
        onError: onErrorResponse,
    }
});
//
export const checkUserSessionStatusData = ({ reqData = {}, onSuccessResponse, onErrorResponse }) => ({
    type: USER_SESSION_STATUS_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessResponse,
        onError: onErrorResponse,
    }
});
//
export const doLogout = () => ({
    type: LOGOUT,
});

export const updateErrroInfo = (payload = {}) => ({
    type: UPDATE_ERROR_REQ,
    ...payload
})
//
export const checkAppIsInMaintainance = ({ reqData = {}, onSuccessResponse, onErrorResponse }) => ({
    type: CHECK_APP_MAINTAINANCE_STATUS_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessResponse,
        onError: onErrorResponse,
    }
});
//
export const checkAppUserUDID = ({ reqData = {}, onSuccessResponse, onErrorResponse }) => ({
    type: CHECK_APP_USER_UDID_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessResponse,
        onError: onErrorResponse,
    }
});