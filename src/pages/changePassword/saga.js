import { delay, takeEvery, takeLatest, put, call } from "redux-saga/effects";
import { CHANGE_PASSWORD_REQ } from "./type";
import { CHANGE_PASSWORD_API } from "../../services/api-end-points";
import { HTTP_METHODS } from "../../services/api-constants";
import { request } from "../../services/services";
import { USER_INFO_RES } from "../../navigation/types";

//Change Password Watcher
function* changePasswordWatcher(action) {
    yield call(changePasswordRequest, action);
}

export function* changePasswordRequest(action) {

    const { user_id = "", UserPassword = "", user_password_new = "" } = action.payload.reqData;
    try {
        const result = yield call(() =>

            request(CHANGE_PASSWORD_API(user_id), HTTP_METHODS.PUT, {
                "user_password": UserPassword,
                "user_password_new": user_password_new
            }),
        );
        //
        if (result.response.status == 200) {
            if (result.response.data.result == true) {
                action.payload.onSuccess(result.response?.data)
            } else {
                action.payload.onError(result.response?.data);
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
export function* changePasswordSaga() {
    yield takeLatest(CHANGE_PASSWORD_REQ, changePasswordWatcher);

}