import { delay, takeEvery, takeLatest, put, call } from "redux-saga/effects";
import { GET_USER_BALANCE_REQ, GET_LAST_5_DRAW_REQ, WIN_BALANCE_DATA_REQ, TAKE_BALANCE_DATA_REQ, SINGLE_MESSAGE_DATA_REQ, SUBMIT_PROGRAM_DATA_REQ, CHECK_USER_WIN_REQ, DRAW_DETAIL_REQ } from "./type";
import { USER_BALANCE_API, GET_LAST_5_HISTORY_API, WIN_BALANCE_API, TAKE_BALANCE_API, GET_ALL_MESSAGE_API, SUBMIT_PROGRAM_DETAIL_API, CHECK_WIN_API, DRAW_DETAIL_API } from "../../services/api-end-points";
import { HTTP_METHODS } from "../../services/api-constants";
import { request } from "../../services/services";
import { USER_INFO_RES } from "../../navigation/types";

//User Balance Watcher
function* userBalanceWatcher(action) {
    yield call(userBalanceRequest, action);
}

export function* userBalanceRequest(action) {

    try {
        const result = yield call(() =>
            request(USER_BALANCE_API(action.payload.reqData.user_id), HTTP_METHODS.GET, {}),
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

//Last 5 Draw History
function* getLast5DrawHistory(action) {
    yield call(getLast5DrawRequest, action);
}

export function* getLast5DrawRequest(action) {

    try {
        const result = yield call(() =>
            request(GET_LAST_5_HISTORY_API(), HTTP_METHODS.GET, action.payload.reqData),
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

//Win Balance Data Watcher
function* winBalanceDataWatcher(action) {
    yield call(winBalanceDataRequest, action);
}

export function* winBalanceDataRequest(action) {

    try {
        const result = yield call(() =>
            request(WIN_BALANCE_API(), HTTP_METHODS.POST, action.payload.reqData),
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

//Take Balance Data Watcher
function* takeBalanceDataWatcher(action) {
    yield call(takeBalanceDataRequest, action);
}

export function* takeBalanceDataRequest(action) {

    try {
        const result = yield call(() =>
            request(TAKE_BALANCE_API(action.payload.reqData?.user_id), HTTP_METHODS.GET, {}),
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
//Single Message Data Watcher
function* singleMessageDataWatcher(action) {
    yield call(singleMessageDataRequest, action);
}

export function* singleMessageDataRequest(action) {

    try {
        const result = yield call(() =>
            request(GET_ALL_MESSAGE_API(), HTTP_METHODS.POST, action.payload.reqData),
        );
        //
        if (result.response.status == 200) {
            //
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

//Single Message Data Watcher
function* submitProgramDataWatcher(action) {
    yield call(submitProgramDataRequest, action);
}

export function* submitProgramDataRequest(action) {

    try {
        const result = yield call(() =>
            request(SUBMIT_PROGRAM_DETAIL_API(), HTTP_METHODS.POST, action.payload.reqData),
        );
        if (result.response.status == 200) {
            action.payload.onSuccess(result.response?.data);
        } else {
            action.payload.onError(result.response);
        }
        //
    } catch (error) {
        action.payload.onError(error);
        console.log(JSON.stringify(error));
    }
}
//Check win user Watcher
function* checkWinUserStatusWatcher(action) {
    yield call(checkWinUserStatusRequest, action);
}

export function* checkWinUserStatusRequest(action) {

    try {
        const result = yield call(() =>
            request(CHECK_WIN_API(action.payload.reqData?.user_id), HTTP_METHODS.GET, {}),
        );
        //
        if (result.response.status == 200) {
            action.payload.onSuccess(result.response?.data);
        } else {
            action.payload.onError(result.response);
        }
        //
    } catch (error) {
        action.payload.onError(error);
        console.log(JSON.stringify(error));
    }
}
//Draw Detail Watcher
function* drawDetailWatcher(action) {
    yield call(drawDetailRequest, action);
}

export function* drawDetailRequest(action) {

    try {
        const result = yield call(() =>
            request(DRAW_DETAIL_API(action.payload.reqData?.DrawId), HTTP_METHODS.GET, {}),
        );
        //
        console.log(JSON.stringify(result));

        //
        if (result.response.status == 200) {
            action.payload.onSuccess(result.response?.data);
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
export function* programSaga() {
    yield takeLatest(GET_USER_BALANCE_REQ, userBalanceWatcher);
    yield takeLatest(GET_LAST_5_DRAW_REQ, getLast5DrawHistory);
    //
    yield takeLatest(WIN_BALANCE_DATA_REQ, winBalanceDataWatcher);
    yield takeLatest(TAKE_BALANCE_DATA_REQ, takeBalanceDataWatcher);
    yield takeLatest(SINGLE_MESSAGE_DATA_REQ, singleMessageDataWatcher);
    //
    yield takeLatest(SUBMIT_PROGRAM_DATA_REQ, submitProgramDataWatcher);
    //
    yield takeLatest(CHECK_USER_WIN_REQ, checkWinUserStatusWatcher);
    yield takeLatest(DRAW_DETAIL_REQ, drawDetailWatcher);

}