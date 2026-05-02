import { delay, takeEvery, takeLatest, put, call } from "redux-saga/effects";
import { HISTORY_DETAIL_REQ, CANCEL_TICKET_REQ } from "./type";
import { GET_HISTORY_DETAIL_API, CANCEL_TICKET_API } from "../../services/api-end-points";
import { HTTP_METHODS } from "../../services/api-constants";
import { request } from "../../services/services";

//History Detail Watcher
function* getHistoryDetailWatcher(action) {
    yield call(getHistoryDetailRequest, action);
}

export function* getHistoryDetailRequest(action) {
    const { user_id = "", bnumber = "" } = action.payload.reqData;
    try {
        const result = yield call(() =>
            request(GET_HISTORY_DETAIL_API(bnumber, user_id), HTTP_METHODS.GET, {}),
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
//Cancel Ticket Watcher
function* cancelTicketWatcher(action) {
    yield call(cancelTicketRequest, action);
}

export function* cancelTicketRequest(action) {
    const { user_id = "", bodyData = {} } = action.payload.reqData;
    try {
        const result = yield call(() =>
            request(CANCEL_TICKET_API(user_id), HTTP_METHODS.POST, bodyData),
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
export function* histroyDetailSaga() {
    yield takeLatest(HISTORY_DETAIL_REQ, getHistoryDetailWatcher);
    yield takeLatest(CANCEL_TICKET_REQ, cancelTicketWatcher);

}