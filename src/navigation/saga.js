import { takeLatest, put, call } from "redux-saga/effects";
import { CHANGE_STACK_REQ, CHANGE_STACK_RES, LOGOUT_RES, LOGOUT, USER_LOGOUT_REQ, USER_ACTIVE_STATUS_REQ, APP_VERSION_STATUS_REQ, USER_SESSION_STATUS_REQ, UPDATE_ERROR_REQ, UPDATE_ERROR_RES, CHECK_APP_USER_UDID_REQ, CHECK_APP_MAINTAINANCE_STATUS_REQ } from "./types";
import { LOGOUT_API, CHECK_USER_ACTIVE_API, CHECK_APP_VERSION_API, CHECK_USER_SESSION_API, CHECK_APP_MAINTENANCE_API,CHECK_USER_UDID_API } from "../services/api-end-points";
import { request } from "../services/services";
import { HTTP_METHODS } from "../services/api-constants";
//Update Application Stack watcher
function* updateStackWatcher(action) {
    yield call(updateStackRequest, action)
}

export function* updateStackRequest(action) {
    yield put({
        type: CHANGE_STACK_RES,
        payload: action.stack_name
    })
}
//
function* logoutWatcher(action) {
    yield call(logout_saga, action)
}

export function* logout_saga() {
    try {
        yield put({
            type: LOGOUT_RES,
            payload: {}
        })
    } catch (error) {
        console.log("logout saga error", error);
    }
}


//User Logout Watcher
function* userLogoutWatcher(action) {
    yield call(userLogoutRequest, action);
}

export function* userLogoutRequest(action) {
    //
    try {
        const result = yield call(() =>
            request(LOGOUT_API(), HTTP_METHODS.POST, action.payload.reqData),
        );
        //
        if (result.response.status == 200) {
            action.payload.onSuccess(result?.response?.data);
        } else {
            action.payload.onError(result.response);
        }
        //
    } catch (error) {
        action.payload.onError(error);
        console.log(JSON.stringify(error));
    }
}

//checkUserActivOrNotData watcher
function* checkUserActivOrNotWatcher(action) {
    yield call(checkUserActivOrNotRequest, action);
}

export function* checkUserActivOrNotRequest(action) {
    //
    try {
        const result = yield call(() =>
            request(CHECK_USER_ACTIVE_API(action.payload.reqData?.user_id), HTTP_METHODS.GET, {}),
        );
        //
        if (result.response.status == 200) {
            action.payload.onSuccess(result?.response?.data);
        } else {
            action.payload.onError(result.response);
        }
        //
    } catch (error) {
        action.payload.onError(error);
        console.log(JSON.stringify(error));
    }
}

//Check appversion watcher
function* checkAppVessionWatcher(action) {
    yield call(checkAppVessionRequest, action);
}

export function* checkAppVessionRequest(action) {
    //
    try {
        const result = yield call(() =>
            request(CHECK_APP_VERSION_API(), HTTP_METHODS.GET, {}),
        );
        //
        if (result.response.status == 200) {
            action.payload.onSuccess(result?.response?.data);
        } else {
            action.payload.onError(result.response);
        }
        //
    } catch (error) {
        action.payload.onError(error);
        console.log(JSON.stringify(error));
    }
}

//Check User session
function* checkUserSessionWatcher(action) {
    yield call(checkUserSessionRequest, action);
}

export function* checkUserSessionRequest(action) {
    //
    try {
        const result = yield call(() =>
            request(CHECK_USER_SESSION_API(action.payload.reqData?.user_id), HTTP_METHODS.GET, {}),
        );
        //
        if (result.response.status == 200) {
            action.payload.onSuccess(result?.response?.data);
        } else {
            action.payload.onError(result.response);
        }
        //
    } catch (error) {
        action.payload.onError(error);
        console.log(JSON.stringify(error));
    }
}


//Update Application Update Error watcher
function* updateErrorWatcher(action) {
    yield call(updateErrorRequest, action)
}

export function* updateErrorRequest(action) {
    yield put({
        type: UPDATE_ERROR_RES,
        payload: action.errorCode
    })
}

//Check App Maintainance or not
function* checkAppMaintainaceWatcher(action) {
    yield call(checkAppMaintainaceRequest, action);
}

export function* checkAppMaintainaceRequest(action) {
    //
    try {
        const result = yield call(() =>
            request(CHECK_APP_MAINTENANCE_API(), HTTP_METHODS.GET, {}),
        );
        //
        if (result.response.status == 200) {
            action.payload.onSuccess(result?.response?.data);
        } else {
            action.payload.onError(result.response);
        }
        //
    } catch (error) {
        action.payload.onError(error);
        console.log(JSON.stringify(error));
    }
}

//Check App Maintainance or not
function* checkAppUserUdidWatcher(action) {
    yield call(checkAppUserUdidRequest, action);
}

export function* checkAppUserUdidRequest(action) {
    //
    try {
        const result = yield call(() =>
            request(CHECK_USER_UDID_API(action.payload.reqData?.user_id), HTTP_METHODS.GET, {}),
        );
        if (result.response.status == 200) {
            action.payload.onSuccess(result?.response?.data);
        } else {
            action.payload.onError(result.response);
        }
        //
    } catch (error) {
        action.payload.onError(error);
        console.log(JSON.stringify(error));
    }
}

export function* navigationSaga() {
    yield takeLatest(CHANGE_STACK_REQ, updateStackWatcher);
    yield takeLatest(LOGOUT, logoutWatcher);
    yield takeLatest(USER_LOGOUT_REQ, userLogoutWatcher);
    //
    yield takeLatest(USER_ACTIVE_STATUS_REQ, checkUserActivOrNotWatcher);
    yield takeLatest(APP_VERSION_STATUS_REQ, checkAppVessionWatcher);
    yield takeLatest(USER_SESSION_STATUS_REQ, checkUserSessionWatcher);
    yield takeLatest(UPDATE_ERROR_REQ, updateErrorWatcher);
    //
    yield takeLatest(CHECK_APP_MAINTAINANCE_STATUS_REQ, checkAppMaintainaceWatcher);
    yield takeLatest(CHECK_APP_USER_UDID_REQ, checkAppUserUdidWatcher);
}