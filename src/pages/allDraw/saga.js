import { delay, takeEvery, takeLatest, put, call } from "redux-saga/effects";
import { GET_All_DRAW_DATA_REQ } from "./type";
import { GET_ALL_DRAW_API } from "../../services/api-end-points";
import { HTTP_METHODS } from "../../services/api-constants";
import { request } from "../../services/services";

//Get All Draw Watcher
function* getAllDrawWatcher(action) {
    yield call(getAllDrawRequest, action);
}

export function* getAllDrawRequest(action) {

    try {
        const result = yield call(() =>
            request(GET_ALL_DRAW_API(), HTTP_METHODS.GET, action.payload.reqData),
        );
        //
        if (result.response.status == 200) {
            if (result?.response?.data?.result == true) {
                action.payload.onSuccess(result?.response?.data?.data);
            } else {
                action.payload.onError(result?.response);
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
export function* allDrawSaga() {
    yield takeLatest(GET_All_DRAW_DATA_REQ, getAllDrawWatcher);

}