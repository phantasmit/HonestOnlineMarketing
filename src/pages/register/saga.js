import { delay, takeEvery, takeLatest, put, call } from "redux-saga/effects";
import { USER_REGISTER_REQ } from "./type";
import { REGISTER_API } from "../../services/api-end-points";
import { HTTP_METHODS } from "../../services/api-constants";
import { request } from "../../services/services";
import { USER_INFO_RES } from "../../navigation/types";

//User Register Watcher
function* userRegisterWatcher(action) {
    yield call(userRegisterRequest, action);
}

export function* userRegisterRequest(action) {

    try {
        const result = yield call(() =>
            request(REGISTER_API(), HTTP_METHODS.POST, action.payload.reqData),
        );
        //
        if (result.response.status == 200) {
            if (result?.response?.data?.result == "true") {
                action.payload.onSuccess(result?.response?.data);
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
//
export function* registerSaga() {
    yield takeLatest(USER_REGISTER_REQ, userRegisterWatcher);

}