import { configureStore, Tuple, getDefaultMiddleware } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { rootSaga } from '../sagas';
import index from './index';

const persistConfirg = {
    timeout: 0,
    key: 'root',
    storage: AsyncStorage,
    whiteList: [],
    blacklist: []
}

//create the saga middleware
const sagaMiddleware = createSagaMiddleware();

//Persisting reducers
const persistReducers = persistReducer(persistConfirg, index);

//Configure store 
let store = configureStore({
    reducer: persistReducers,
    middleware: () => [sagaMiddleware, createLogger()]
});
//persist store 
let persistor = persistStore(store);


//Redux sage to start
sagaMiddleware.run(rootSaga);
//
export { store, persistor };