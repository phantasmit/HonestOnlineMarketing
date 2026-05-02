import { CHANGE_STACK_RES, LOGOUT_RES, USER_INFO_RES, UPDATE_ERROR_RES } from "./types";
import stacks from "./stackEnum";

const initialState = {
    stack_name: stacks.ON_BOARD_STACK,
    userData: {},
    errorCode: 0
}

const StackReducer = (state = initialState, action) => {

    switch (action.type) {
        case CHANGE_STACK_RES:
            return Object.assign({}, state, {
                stack_name: action.payload
            })
        case USER_INFO_RES:
            return Object.assign({}, state, {
                userData: action.payload
            })
        case UPDATE_ERROR_RES:
            return Object.assign({}, state, {
                errorCode: action.payload
            })
        case LOGOUT_RES:
            return initialState;
        default:
            return state;
    }
}

export default StackReducer;