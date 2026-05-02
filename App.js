import React, { Component } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import { store, persistor } from "./src/store/configureStore";
import RouteContainer from "./src/navigation/route";
import SplashScreen from "react-native-splash-screen";
import { PaperProvider, DefaultTheme } from 'react-native-paper';
import { View, Image, StatusBar, NativeModules, AppState, DeviceEventEmitter } from "react-native";
import { SafeAreaView as SafeAreaViews, useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from "./src/assets/appColor/colors";
import { background_bottom } from "./src/utils/images";
//import { SafeAreaView, SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';
import DeviceInfo from 'react-native-device-info';
//import * as RootNavigation from './src/navigation/RootNavigation';
//
import { AlertNotificationRoot } from 'react-native-alert-notification';
import { checkUserActivOrNotData, checkUserSessionStatusData, checkAppVersionStatusData, updateErrroInfo, checkAppIsInMaintainance, doLogoutFun, doLogout, changeStack } from "./src/navigation/action";
import { useNavigation, withNavigation } from "@react-navigation/native";
import { navigationRef } from "./src/navigation/RootNavigation";
import { addEventListener } from "@react-native-community/netinfo";
import Orientation from 'react-native-orientation-locker';
import stacks from "./src/navigation/stackEnum";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

//
class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            appState: AppState.currentState
        }
    }

    componentDidMount() {
        //
        SplashScreen.hide()
        StatusBar.setHidden(false);
        Orientation.lockToPortrait();
        //
        AppState.addEventListener('change', this._handleAppStateChange);
        //
        addEventListener(state => {
            if (!state.isConnected) {
                store.dispatch(updateErrroInfo({ errorCode: 3 }))
                navigationRef?.current.navigate('ErrorPage');
            } else {
                store.dispatch(updateErrroInfo({ errorCode: 0 }))
            }
        });
        //const insets = useSafeAreaInsets();
    }
    componentWillUnmount() {

    }
    _handleAppStateChange = async (nextAppState) => {
        if (nextAppState === 'active') {
            //
            this.checkAppVersion()
            //
        } else if (nextAppState === 'background') {
            this.checkAppVersion()
        } else {

        }
    }
    //
    checkUserSession = () => {
        store.dispatch(
            checkUserSessionStatusData({
                reqData: {
                    "user_id": store.getState().StackReducer.userData.user_id
                },
                onSuccessResponse: (response => {
                    // console.log(JSON.stringify(response));
                }),
                onErrorResponse: (error => {
                    // console.log(JSON.stringify(error));
                }),
            })
        )
    }
    checkAppVersion = () => {
        store.dispatch(checkAppIsInMaintainance(
            {
                reqData: {},
                onSuccessResponse: (response => {
                    if (!response?.result) {
                        store.dispatch(updateErrroInfo({ errorCode: 4 }))
                        //navigationRef?.current.navigate('ErrorPage');
                        setTimeout(() => {
                            navigationRef?.current.navigate('ErrorPage');
                        }, 100)
                    } else {
                        store.dispatch(
                            checkAppVersionStatusData({
                                reqData: {},
                                onSuccessResponse: (response => {
                                    //
                                    if (response?.AppVersion !== DeviceInfo.getVersion()) {
                                        //
                                        if (store.getState().StackReducer.userData.user_id) {
                                            store.dispatch(
                                                doLogoutFun({
                                                    reqData: {
                                                        'user_id': store.getState().StackReducer.userData.user_id
                                                    },
                                                    onSuccessResponse: (response => {
                                                        //
                                                        store.dispatch(changeStack({ stack_name: stacks.ON_BOARD_STACK }))
                                                        store.dispatch(doLogout())
                                                        //
                                                        setTimeout(() => {
                                                            store.dispatch(updateErrroInfo({ errorCode: 1 }))
                                                            navigationRef?.current.navigate('ErrorPage');
                                                        }, 500)
                                                    }),
                                                    onErrorResponse: (error => {
                                                        console.log(JSON.stringify(error));
                                                    }),
                                                })
                                            )
                                        } else {
                                            setTimeout(() => {
                                                store.dispatch(updateErrroInfo({ errorCode: 1 }))
                                                navigationRef?.current.navigate('ErrorPage');
                                            }, 100)
                                        }
                                        //
                                    } else {
                                        store.dispatch(updateErrroInfo({ errorCode: 0 }))
                                        this.checkUserActiveOrNot()
                                    }
                                    //
                                }),
                                onErrorResponse: (error => {
                                    console.log(JSON.stringify(error));
                                }),
                            })
                        )
                    }

                }),
                onErrorResponse: (error => {
                    //console.log(JSON.stringify(error));
                }),
            }
        ))


    }
    checkUserActiveOrNot = () => {
        store.dispatch(
            checkUserActivOrNotData({
                reqData: {
                    "user_id": store.getState().StackReducer.userData.user_id
                },
                onSuccessResponse: (response => {
                    if (!response?.result) {
                        store.dispatch(updateErrroInfo({ errorCode: 2 }))
                        //navigationRef?.current.navigate('ErrorPage');
                        setTimeout(() => {
                            navigationRef?.current.navigate('ErrorPage');
                        }, 100)
                    } else {
                        store.dispatch(updateErrroInfo({ errorCode: 0 }))
                    }
                }),
                onErrorResponse: (error => {
                    console.log(JSON.stringify(error));
                }),
            })
        )
    }
    //
    render() {
        return (
            // <View style={{flex:1,backgroundColor:'red'}}></View>
            <GestureHandlerRootView style={{ flex: 1 }}>

                <AlertNotificationRoot>
                    <Provider store={store}>
                        <PersistGate persistor={persistor}>
                            <SafeAreaView edges={['right', 'top']} style={{ backgroundColor: '#C12607', marginTop: 0 }} />
                            <PaperProvider
                                settings={{
                                    rippleEffectEnabled: false
                                }}
                                theme={{
                                    ...DefaultTheme,
                                    colors: {
                                        ...DefaultTheme.colors,
                                        background: 'transparent',
                                    },
                                }}
                            >
                                <RouteContainer />
                            </PaperProvider>
                            <SafeAreaView edges={['bottom']} style={{ backgroundColor: '#00000000' }} />
                        </PersistGate>
                    </Provider>
                </AlertNotificationRoot>
            </GestureHandlerRootView>
        )
    }
}

export default App;
;