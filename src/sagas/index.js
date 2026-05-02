import { all } from 'redux-saga/effects';
//
import { navigationSaga } from "../navigation/saga";
import { loginSaga } from "../pages/login/saga";
import { registerSaga } from "../pages/register/saga";
import { programSaga } from "../pages/program/saga";
import { histroySaga } from "../pages/history/saga";
import { allDrawSaga } from "../pages/allDraw/saga";
import { histroyDetailSaga } from '../pages/historyDetail/saga';
import { changePasswordSaga } from '../pages/changePassword/saga';
import { userProfileSaga } from '../pages/userProfile/saga';
import { notificationSaga } from '../pages/notificaion/saga';
import { supportSaga } from '../pages/support/saga';
//
export function* rootSaga() {
    yield all([
        //Navigation Saga
        navigationSaga(),
        //Login Saga
        loginSaga(),
        //Register Saga
        registerSaga(),
        //Prgram Saga
        programSaga(),
        //History Saga
        histroySaga(),
        //all Draw Saga
        allDrawSaga(),
        //history Detail Saga
        histroyDetailSaga(),
        //Change password Saga
        changePasswordSaga(),
        //User Profile Saga
        userProfileSaga(),
        //Support Saga
        supportSaga(),
        //Notification Saga
        notificationSaga()
    ]);
}