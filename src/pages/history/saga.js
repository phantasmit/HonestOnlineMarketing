import { delay, takeEvery, takeLatest, put, call } from "redux-saga/effects";
import { HISTORY_DATA_REQ, VERIFY_DRAWTIME_REQ } from "./type";
import { GET_HISTORY_DATA_API, VERIFY_DRAWTIME_API } from "../../services/api-end-points";
import { HTTP_METHODS } from "../../services/api-constants";
import { request } from "../../services/services";
import { USER_INFO_RES } from "../../navigation/types";

//History Data Watcher
function* getHistoryDataWatcher(action) {
    yield call(getHistoryDataRequest, action);
}

export function* getHistoryDataRequest(action) {

    try {
        const result = yield call(() =>
            request(GET_HISTORY_DATA_API(action.payload.reqData?.user_id), HTTP_METHODS.GET, {}),
        );
        if (result.response.status == 200) {
            if (result?.response?.data?.result == true) {
                action.payload.onSuccess(result?.response?.data?.data);
            } else {
                action.payload.onError(result?.response?.data);
            }
        } else {
            action.payload.onError(result.response);
        }
        //
    } catch (error) {
        action.payload.onError(error);
        console.log(JSON.stringify(error));
    }
}
//Verify DrawTime Watcher
function* verifyDrawTimeWatcher(action) {
    yield call(verifyDrawTimeRequest, action);
}

export function* verifyDrawTimeRequest(action) {

    try {
        const result = yield call(() =>
            request(VERIFY_DRAWTIME_API(), HTTP_METHODS.POST, action.payload.reqData),
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
export function* histroySaga() {
    yield takeLatest(HISTORY_DATA_REQ, getHistoryDataWatcher);
    yield takeLatest(VERIFY_DRAWTIME_REQ, verifyDrawTimeWatcher);
}