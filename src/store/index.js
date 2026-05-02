import { combineReducers } from "redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
//
import StackReducer from "../navigation/reducer";
//import persistStore from 'redux-persist/es/persistStore';
//
const appReducer = combineReducers({
    StackReducer: StackReducer
})


export default (state, action) => {
    if (action.type === "LOGOUT") {
        //
        AsyncStorage.getAllKeys()
            .then(keys => {
                AsyncStorage.multiRemove(keys).then(() => {
                })
            })
            .then(() => {

            });
        //
        return appReducer(undefined, action);;
        //
    }
    return appReducer(state, action);
}