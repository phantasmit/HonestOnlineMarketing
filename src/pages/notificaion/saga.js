import { delay, takeEvery, takeLatest, put, call } from "redux-saga/effects";
import { NOTIFICATION_DATA_REQ } from "./type";
import { GET_HISTORY_DETAIL_API } from "../../services/api-end-points";
import { HTTP_METHODS } from "../../services/api-constants";
import { request } from "../../services/services";

//Notification Data Watcher
function* getNotificationDataWatcher(action) {
    yield call(getNotificationDataRequest, action);
}

export function* getNotificationDataRequest(action) {

    const { user_id = "", bnumber = "" } = action.payload.reqData
    try {
        const result = yield call(() =>
            request(GET_HISTORY_DETAIL_API(bnumber,user_id), HTTP_METHODS.GET, {}),
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
export function* notificationSaga() {
    // yield takeLatest(NOTIFICATION_DATA_REQ, getNotificationDataWatcher);

}