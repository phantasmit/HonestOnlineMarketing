import React from "react";
import { View, Image, Text, Dimensions, TouchableOpacity, NativeModules, ActivityIndicator } from "react-native";
import { SplashComponent } from "./splashComponent";
import { connect } from "react-redux";
import colors from "../../assets/appColor/colors";
import HeaderComponent from "../../hoc/headerComponent";
import HOCComponent from "../../hoc/hocComponent";
import { bottom_bg, logo, orange_bg, eye_hide, eye_show, padlock, phone_call, logo_new } from "../../utils/images";
import OutLinedTextInput from "../../component/outLinedTextInput";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import fonts from "../../assets/fonts/fonts";
import { normalize } from "../../utils/normalize";
import ButtonLoader from "../../component/buttonLoader";
import { Formik } from 'formik';
import * as Yup from "yup";
import DeviceInfo from 'react-native-device-info';
import stacks from "../../navigation/stackEnum";
import {
    AlertNotificationRoot
} from 'react-native-alert-notification';
//
const HeaderComponents = HeaderComponent(View)
const HOCComponents = HOCComponent(HeaderComponents);
//
class Splash extends SplashComponent {

    render() {
        return (
            <HOCComponents title="">
                <AlertNotificationRoot
                    theme='light'// | 'dark';
                    colors={['green']}
                    toastConfig={{
                        titleStyle: {
                            color: 'blue'
                        },
                        textBodyStyle: {
                            backgroundColor: "green",
                            color: 'green'
                        }
                    }}
                    dialogConfig='closeOnOverlayTap' >
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#C12607' }}>
                        {/* <Image source={orange_bg} resizeMode="cover" style={{ borderBottomLeftRadius: 60, borderBottomRightRadius: 60, width: Dimensions.get('window').width, height: Dimensions.get('window').height / 2, position: "absolute", top: 0 }} /> */}
                        {/* <Image source={bottom_bg} resizeMode="cover" style={{ width: '100%', height: '15%', position: "absolute", bottom: 0, transform: [{ rotate: "0deg" }] }} /> */}
                        <Image source={logo_new} style={{ width: Dimensions.get('window').width / 2, height: Dimensions.get('window').width / 2, borderRadius: Dimensions.get('window').width / 3.6, marginBottom: 0,  alignSelf: "center" }} resizeMode="contain" />
                        <Text style={{ fontFamily: fonts.POPPINS_MEDIUM, fontWeight: '800', fontSize: normalize(25), marginVertical: 0, color: colors.LIME_GEEEN,textAlign:'center' }}>{`Honest 1\nOnline Marketing`}</Text>
                        {/* <ActivityIndicator color={'white'} /> */}
                    </View>
                </AlertNotificationRoot>
            </HOCComponents >
        )
    }
}

export default connect(SplashComponent.mapStateToProps, SplashComponent.mapDispatchToProps)(Splash);