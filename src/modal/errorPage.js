import React, { useEffect, useState } from 'react';
import { View, Text, Image, NativeModules, Dimensions, TouchableOpacity, Linking, Platform } from "react-native";
import fonts from "../assets/fonts/fonts";
import ButtonLoader from "../component/buttonLoader";
import { normalize } from "../utils/normalize";
import { useNavigation, useLinkTo } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { animation, close, coin, orange_bg, bottom_bg, donwload, no, inactive, wave_bottom, maintainance } from '../utils/images';
import colors from '../assets/appColor/colors';
import { takeBalanceData } from '../pages/program/action';
import OutLinedTextInput from '../component/outLinedTextInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { addBalanceData, withdrawBalanceData } from '../pages/userProfile/action';
import { checkUserActivOrNotData, checkUserSessionStatusData, checkAppVersionStatusData, changeStack, doLogout, doLogoutFun, updateErrroInfo } from '../navigation/action';
import HeaderComponent from '../hoc/headerComponent';
import HOCComponent from '../hoc/hocComponent';
import Orientation from 'react-native-orientation-locker';
import stacks from "../navigation/stackEnum";
//
const HeaderComponents = HeaderComponent(View)
const HOCComponents = HOCComponent(HeaderComponents);
//
function ErrorPage(props) {
    //
    const linkTo = useLinkTo();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { errorCode = 0 } = useSelector(state => state.StackReducer);
    const { user_id = 0 } = useSelector(state => state.StackReducer.userData);
    const [isCheck, setCheck] = useState(false);
    //
    useEffect(() => {
        //
        Orientation.unlockAllOrientations();
        Orientation.lockToPortrait();
        //
        //alert('errorCode>> ' + errorCode + " isCheck " + isCheck)
        if (errorCode == 0) {
            navigation.goBack()
        }
        if(errorCode === 1){
            dispatch(doLogoutFun({
                reqData: { 'user_id': user_id },
                onSuccessResponse: (response => {
                    dispatch(doLogout())
                }),
                onErrorResponse: (error => { }),
            }))
        }
        // else if (errorCode !== 4) {
        //     setCheck(true)
        //     dispatch(doLogoutFun({
        //         reqData: { 'user_id': user_id },
        //         onSuccessResponse: (response => {
        //             dispatch(changeStack({ stack_name: stacks.ON_BOARD_STACK }))
        //             dispatch(doLogout())
        //             //NativeModules.ToastModule.showToast(response?.Message);
        //         }),
        //         onErrorResponse: (error => { }),
        //     }))
        //     setTimeout(() => {
        //         dispatch(updateErrroInfo({ errorCode: 1 }))
        //     }, 1000);
        // } else {
        // }
    }, [errorCode]);
    //
    const openLink = () => {
        const url = 'https://ho-ne-st-2-on-li-ne.in/honest.apk';
        Linking.openURL(url).catch(err => console.error('An error occurred', err));
    };
    const openNetworkSettings = () => {
        const url = Platform.select({
            ios: 'App-Prefs:root=WIFI', // iOS Wi-Fi settings
            android: 'android.settings.WIFI_SETTINGS', // Android Wi-Fi settings
        });
        Linking.sendIntent('android.settings.WIFI_SETTINGS');
        // Linking.openURL(url)
        //     .catch(err => {
        //         console.error('An error occurred', err);
        //         // Fallback to open general settings if it fails
        //         if (Platform.OS === 'android') {
        //             //Linking.openURL('android.settings.SETTINGS');

        //         }
        //     });
    };
    return (
        <>
            <HOCComponents title="">
                {/* <Image source={orange_bg} resizeMode="cover" style={{ borderBottomLeftRadius: 60, borderBottomRightRadius: 60, width: Dimensions.get('window').width, height: Dimensions.get('window').height / 2, position: "absolute", top: 0 }} /> */}
                {/* <Image source={bottom_bg} resizeMode="cover" style={{ width: '100%', height: '15%', position: "absolute", bottom: 0, transform: [{ rotate: "0deg" }] }} /> */}
                <Image source={wave_bottom} resizeMode="cover" style={{ width: '100%', height: 80, position: "absolute", bottom: 0 }} />
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    {
                        {
                            1:
                                <>
                                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                                        {/* <TouchableOpacity onPress={() => { openLink() }}> */}
                                        <Image source={donwload} style={{ width: 100, height: 100 }} />
                                        <Text style={{ fontFamily: fonts.POPPINS_MEDIUM, fontWeight: '800', fontSize: normalize(12), marginVertical: 10, color: colors.BLACK_SHADE_03 }}>Update application.</Text>
                                        <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(12), color: colors.BLACK_SHADE_03, textAlign: "center", width: Dimensions.get('window').width / 1.2 }}>To update application click download button.</Text>
                                        <ButtonLoader
                                            onPress={() => {
                                                //application closed & back button need to remove
                                                openLink()
                                            }}
                                            // onPress={() => {
                                            //     //application closed & back button need to remove
                                            //     dispatch(doLogoutFun({
                                            //         reqData: { 'user_id': user_id },
                                            //         onSuccessResponse: (response => {
                                            //             //dispatch(changeStack({ stack_name: stacks.ON_BOARD_STACK }))
                                            //             dispatch(doLogout())
                                            //             //NativeModules.ToastModule.showToast(response?.Message);
                                            //             openLink()
                                            //         }),
                                            //         onErrorResponse: (error => { }),
                                            //     }))
                                            // }}
                                            style={{ backgroundColor: '#7e57c2', borderRadius: 8, width: Dimensions.get('window').width / 2, height: 45 }}
                                            title="Download"
                                            isLoading={false}
                                        />
                                    </View>
                                </>,
                            2:
                                <>
                                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                                        <Image source={inactive} style={{ width: 100, height: 100 }} />
                                        <Text style={{ fontFamily: fonts.POPPINS_MEDIUM, fontWeight: '800', fontSize: normalize(12), marginVertical: 10, color: colors.BLACK_SHADE_03 }}>Oops, you are inactive user.</Text>
                                        <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(12), color: colors.BLACK_SHADE_03, textAlign: "right" }}>Please contact to admin and try again later.</Text>
                                        <ButtonLoader
                                            onPress={() => {
                                                //application closed & back button need to remove
                                                dispatch(doLogoutFun({
                                                    reqData: { 'user_id': user_id },
                                                    onSuccessResponse: (response => {
                                                        dispatch(changeStack({ stack_name: stacks.ON_BOARD_STACK }))
                                                        dispatch(doLogout())
                                                        NativeModules.ToastModule.showToast(response?.Message);
                                                    }),
                                                    onErrorResponse: (error => { }),
                                                }))
                                            }}
                                            style={{ backgroundColor: '#7e57c2', borderRadius: 8, width: Dimensions.get('window').width / 2, height: 45 }}
                                            title="OK"
                                            isLoading={false}
                                        />
                                    </View>
                                </>,
                            3:
                                <>
                                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                                        <Image source={no} style={{ width: 100, height: 100 }} />
                                        <Text style={{ fontFamily: fonts.POPPINS_MEDIUM, fontWeight: '800', fontSize: normalize(12), marginVertical: 10, color: colors.BLACK_SHADE_03 }}>No internet connections.</Text>
                                        <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(12), color: colors.BLACK_SHADE_03, textAlign: "center", width: Dimensions.get('window').width / 1.2 }}>No internet connection. Connect to the internet and try again.</Text>
                                        <ButtonLoader
                                            onPress={() => {
                                                //application closed & back button need to remove
                                                openNetworkSettings()
                                            }}
                                            style={{ backgroundColor: '#7e57c2', borderRadius: 8, width: Dimensions.get('window').width / 2, height: 45 }}
                                            title="Try again"
                                            isLoading={false}
                                        />
                                    </View>
                                </>,
                            4:
                                <>
                                    <View style={{ alignItems: "center", justifyContent: "flex-start" }}>
                                        <Image source={maintainance} style={{ top: -60 }} />
                                        <Text style={{ fontFamily: fonts.POPPINS_MEDIUM, fontWeight: '800', top: -30, fontSize: normalize(25), color: colors.BLACK_SHADE_03, textAlign: 'center', lineHeight: 40 }}>{`Application\nUnder Maintenance`}</Text>
                                        {/* <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(12), color: colors.BLACK_SHADE_03, textAlign: "center", width: Dimensions.get('window').width / 1.2 }}>App Under maintenance.</Text> */}
                                    </View>
                                </>
                        }[errorCode]
                    }
                    {/* <Image source={donwload} style={{ width: 100, height: 100 }} /> */}
                    {/* <Image source={no} style={{ width: 100, height: 100 }} />  */}
                </View>
            </HOCComponents>

        </>
    )
}
export default ErrorPage;