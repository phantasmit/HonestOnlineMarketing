import { NOTIFICATION_DATA_REQ } from "./type";
//
export const getNotificationData = ({ reqData = {}, onSuccessResponse, onErrorResponse }) => ({
    type: NOTIFICATION_DATA_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessResponse,
        onError: onErrorResponse,
    }
})