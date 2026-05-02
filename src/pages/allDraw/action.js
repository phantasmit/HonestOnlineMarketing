import { GET_All_DRAW_DATA_REQ } from "./type";
//
export const getAllDrawData = ({ reqData = {}, onSuccessResponse, onErrorResponse }) => ({
    type: GET_All_DRAW_DATA_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessResponse,
        onError: onErrorResponse,
    }
})