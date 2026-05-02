import { delay, takeEvery, takeLatest, put, call } from "redux-saga/effects";
import { USER_INFO_DATA_REQ, ADD_BALANCE_REQ, WITHDRAW_BALANCE_REQ, TRANSACTION_STATUS_REQ, CANCEL_TRANSACTION_REQ } from "./type";
import { USER_INFO_API, ADD_BALANCE_API, WITHDRAW_BALANCE_API, CANCEL_TRANSACTION_API, TRANSACTION_ALL_API } from "../../services/api-end-points";
import { HTTP_METHODS } from "../../services/api-constants";
import { request } from "../../services/services";
import { USER_INFO_RES } from "../../navigation/types";

//User Info Data Watcher
function* getUserInfoDataWatcher(action) {
    yield call(getUserInfoDataRequest, action);
}

export function* getUserInfoDataRequest(action) {

    try {
        const result = yield call(() =>
            request(USER_INFO_API(), HTTP_METHODS.POST, action.payload.reqData),
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
//Add Balance Watcher
function* addBalanceWatcher(action) {
    yield call(addBalanceRequest, action);
}

export function* addBalanceRequest(action) {

    try {
        const result = yield call(() =>
            request(ADD_BALANCE_API(), HTTP_METHODS.POST, action.payload.reqData),
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
//Withdraw Balance Watcher
function* withDrawBalanceWatcher(action) {
    yield call(withDrawBalanceRequest, action);
}

export function* withDrawBalanceRequest(action) {

    try {
        const result = yield call(() =>
            request(WITHDRAW_BALANCE_API(), HTTP_METHODS.POST, action.payload.reqData),
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
//transaction status Watcher
function* transactionStatusWatcher(action) {
    yield call(transactionStatusRequest, action);
}

export function* transactionStatusRequest(action) {

    try {
        const result = yield call(() =>
            request(TRANSACTION_ALL_API(), HTTP_METHODS.POST, action.payload.reqData),
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
//cancel transaction Watcher
function* cancelTransactionWatcher(action) {
    yield call(cancelTransactionRequest, action);
}

export function* cancelTransactionRequest(action) {

    try {
        const result = yield call(() =>
            request(CANCEL_TRANSACTION_API(), HTTP_METHODS.POST, action.payload.reqData),
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
//
export function* userProfileSaga() {
    yield takeLatest(USER_INFO_DATA_REQ, getUserInfoDataWatcher);
    yield takeLatest(ADD_BALANCE_REQ, addBalanceWatcher);
    yield takeLatest(WITHDRAW_BALANCE_REQ, withDrawBalanceWatcher);
    yield takeLatest(TRANSACTION_STATUS_REQ, transactionStatusWatcher);
    yield takeLatest(CANCEL_TRANSACTION_REQ, cancelTransactionWatcher);
}