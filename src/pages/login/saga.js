import { delay, takeEvery, takeLatest, put, call } from "redux-saga/effects";
import { USER_LOGIN_REQ } from "./type";
import { LOGIN_API } from "../../services/api-end-points";
import { HTTP_METHODS } from "../../services/api-constants";
import { request } from "../../services/services";
import { USER_INFO_RES,CHANGE_STACK_RES } from "../../navigation/types";
import stacks from "../../navigation/stackEnum";
//User Login Watcher
function* userLoginWatcher(action) {
    yield call(userLoginRequest, action);
}

export function* userLoginRequest(action) {

    try {
        const result = yield call(() =>
            request(LOGIN_API(), HTTP_METHODS.POST, action.payload.reqData),
        );
        //
        if (result.response.status == 200) {
            if (result?.response?.data?.result == 'true') {
               
                yield put({
                    type: USER_INFO_RES,
                    payload: result?.response?.data
                })
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
export function* loginSaga() {
    yield takeLatest(USER_LOGIN_REQ, userLoginWatcher);

}