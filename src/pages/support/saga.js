import { delay, takeEvery, takeLatest, put, call } from "redux-saga/effects";
import { SUPPORT_DATA_REQ, SUPPORT_SUBMIT_DATA_REQ,SUPPORT_DETAIL_DATA_REQ } from "./type";
import { GET_SUPPORT_API, SUBMIT_SUPPORT_API,GET_SUPPORT_DETAIL_API } from "../../services/api-end-points";
import { HTTP_METHODS } from "../../services/api-constants";
import { request } from "../../services/services";

//Get Support Data Watcher
function* getSupportDataWatcher(action) {
    yield call(getSupportDataRequest, action);
}

export function* getSupportDataRequest(action) {

    try {
        const result = yield call(() =>
            request(GET_SUPPORT_API(), HTTP_METHODS.POST, action.payload.reqData),
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
//Set Support Data Watcher
function* setSupportSubmitDataWatcher(action) {
    yield call(setSupportSubmitDataRequest, action);
}

export function* setSupportSubmitDataRequest(action) {

    try {
        const result = yield call(() =>
            request(SUBMIT_SUPPORT_API(), HTTP_METHODS.MULTIPART, action.payload.reqData),
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
//Get Support details watcher
function* getSupportDetailWatcher(action) {
    yield call(getSupportDetailRequest, action);
}

export function* getSupportDetailRequest(action) {

    try {
        const result = yield call(() =>
            request(GET_SUPPORT_DETAIL_API(), HTTP_METHODS.POST, action.payload.reqData),
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
export function* supportSaga() {
    yield takeLatest(SUPPORT_DATA_REQ, getSupportDataWatcher);
    yield takeLatest(SUPPORT_SUBMIT_DATA_REQ, setSupportSubmitDataWatcher);
    yield takeLatest(SUPPORT_DETAIL_DATA_REQ, getSupportDetailWatcher);

}