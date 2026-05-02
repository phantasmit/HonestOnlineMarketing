import React from "react";
import { View, Image, Text, Dimensions, TouchableOpacity, NativeModules } from "react-native";
import { LoginComponent } from "./loginComponent";
import { connect } from "react-redux";
import colors from "../../assets/appColor/colors";
import HeaderComponent from "../../hoc/headerComponent";
import HOCComponent from "../../hoc/hocComponent";
import { bottom_bg, logo, orange_bg, eye_hide, eye_show, padlock, phone_call, logo_new, bg, wave_bottom, user_p } from "../../utils/images";
import OutLinedTextInput from "../../component/outLinedTextInput";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import fonts from "../../assets/fonts/fonts";
import { normalize } from "../../utils/normalize";
import ButtonLoader from "../../component/buttonLoader";
import { Formik } from 'formik';
import * as Yup from "yup";
import DeviceInfo from 'react-native-device-info';
import stacks from "../../navigation/stackEnum";
import AsyncStorage from '@react-native-async-storage/async-storage';
//
const HeaderComponents = HeaderComponent(View)
const HOCComponents = HOCComponent(HeaderComponents);
//
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
//
class Login extends LoginComponent {

    render() {
        return (
            <HOCComponents title="">
                {/* <Image source={orange_bg} resizeMode="cover" style={{ borderBottomLeftRadius: 60, borderBottomRightRadius: 60, width: Dimensions.get('window').width, height: Dimensions.get('window').height / 2, position: "absolute", top: 0 }} />
                <Image source={bottom_bg} resizeMode="cover" style={{ width: '100%', height: '15%', position: "absolute", bottom: 0, transform: [{ rotate: "0deg" }] }} />
                <View style={{ flexDirection: "row", width: '100%', position: 'absolute', alignItems: "center", justifyContent: "center", top: 40 }}>
                    <View style={{ backgroundColor: 'transparent', borderWidth: 2, borderColor: 'white', width: 135, height: 135, alignItems: "center", justifyContent: "center", borderRadius: 67.5 }}>
                        <View style={{ backgroundColor: 'white', width: 120, height: 120, alignItems: "center", justifyContent: "center", borderRadius: 60 }}>
                            <Image source={logo} style={{ width: 110, height: 110, borderRadius: 55 }} resizeMode="contain" />
                        </View>
                    </View>
                </View> */}
                {/* <View style={{ flex: 0.7 }}>
                        <Text style={{
                            fontFamily: fonts.POPPINS_REGULAR,
                            fontWeight: '800',
                            fontSize: normalize(16),
                            color: colors.BLACK_SHADE,
                            alignSelf: "center",
                        }}>
                            {`Version ${DeviceInfo.getVersion().toString()}`}
                        </Text>
                      
                    </View> */}
                <Image source={wave_bottom} resizeMode="cover" style={{ width: '100%', height: 80, position: "absolute", bottom: 0 }} />
                <Image source={bg} style={{ width: '100%', height: Dimensions.get('window').width / 1.2, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, position: "absolute", top: 0, }} resizeMode="cover" />
                <View style={{ width: '100%', height: Dimensions.get('window').width / 1.2, position: "absolute", top: 0, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, backgroundColor: "#C12607D9", alignItems: "center" }} >
                    <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: 'white', position: "absolute", top: 50, alignItems: "center", justifyContent: "center" }}>
                        <View style={{ width: 92, height: 92, borderRadius: 46, backgroundColor: '#C12607' }}></View>
                        <Image source={logo_new} style={{ width: 70, height: 70, position: "absolute", }} resizeMode="contain" />
                    </View>
                </View>
                <KeyboardAwareScrollView
                    keyboardShouldPersistTaps='handled'
                    enableOnAndroid={true}
                    enableAutomaticScroll={true}
                    style={{ width: '100%', flexGrow: 1 }}
                    contentContainerStyle={{ width: '100%', flexGrow: 1, }}>
                    <View style={{ flex: 1, backgroundColor: 'transparent', justifyContent: "center", alignItems: "center" }}>
                        <View
                            style={{
                                width: '90%',
                                borderRadius: 10,
                                backgroundColor: 'white',
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: -2, },
                                shadowOpacity: 0.5,
                                shadowRadius: 2,
                                elevation: 5,
                                alignItems: "center",
                                justifyContent: "flex-start"
                            }}>
                            <Text style={{
                                fontFamily: fonts.POPPINS_REGULAR,
                                fontWeight: '400',
                                fontSize: normalize(16),
                                color: colors.BLACK_SHADE,
                                alignSelf: "center",
                                marginTop: 30
                            }}>
                                Honest 1 Online Marketing
                            </Text>
                            <Text style={{
                                fontFamily: fonts.POPPINS_REGULAR,
                                fontWeight: '400',
                                fontSize: normalize(12),
                                color: colors.BLACK_SHADE,
                                alignSelf: "center",
                                marginBottom: 20
                            }}>
                                Login in to continue
                            </Text>
                            <Formik
                                initialValues={{ phonoNo: "", password: "", isLoading: false, isHide: false, }}
                                validationSchema={Yup.object().shape({
                                    phonoNo: Yup.string()
                                        .trim().nonNullable()
                                        .required('Username is required')
                                        .min(4, "Minimum 4 character require"),
                                    password: Yup.string()
                                        .trim().nonNullable()
                                        .required('Password is required')
                                        .min(1, "Minimum 1 character require")
                                })}
                                validateOnChange={false}
                                validateOnBlur={false}
                                onSubmit={(values, { setErrors, setSubmitting, setFieldValue }) => {
                                    setFieldValue('isLoading', true)
                                    this.props.getUserLogin({
                                        reqData: {
                                            "UserName": values?.phonoNo,//"9876543210",
                                            "UserPassword": values?.password,//xyz1
                                            "version": DeviceInfo.getVersion().toString(),
                                            "udid": this.state.deviceID
                                        },
                                        onSuccessResponse: (response => {
                                            AsyncStorage.setItem('authToken', response?.token)
                                            NativeModules.ToastModule.showToast(response?.Message);
                                            this.props.changeStack({ stack_name: stacks.APP_STACK })
                                            setFieldValue('isLoading', false)
                                        }),
                                        onErrorResponse: (error => {
                                            setFieldValue('isLoading', false)
                                            if (error?.Message) {
                                                NativeModules.ToastModule.showToast(error?.Message);
                                            }
                                        })
                                    })
                                }}
                            >
                                {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors }) => (
                                    <>
                                        <OutLinedTextInput
                                            outlineStyle={{ borderRadius: 30, borderColor: '#D5D5D5', }}
                                            style={{ marginTop: 0, width: '85%', height: 40, color: '#000000', }}
                                            label="Username"
                                            // placeholder='Please enter username'
                                            value={values?.phonoNo}
                                            onChangeText={handleChange('phonoNo')}
                                            onBlur={handleBlur('phonoNo')}
                                            //maxLength={10}
                                            error={errors.phonoNo}
                                            visible={errors.phonoNo}
                                            leftIcon={user_p}
                                        //keyboardType="numeric"
                                        />
                                        <OutLinedTextInput
                                            outlineStyle={{ borderRadius: 30, borderColor: '#D5D5D5', }}
                                            style={{ marginTop: 0, width: '85%', height: 40, marginTop: 10, color: '#000000', }}
                                            label="Password"
                                            // placeholder='Please enter password'
                                            value={values?.password}
                                            onChangeText={handleChange('password')}
                                            secureTextEntry={values.isHide}
                                            onBlur={handleBlur('password')}
                                            error={errors.password}
                                            visible={errors.password}
                                            rightIcon={values.isHide ? eye_hide : eye_show}
                                            leftIcon={padlock}
                                            onPress={() => {
                                                setFieldValue('isHide', !values.isHide)
                                            }}
                                        />
                                        {/* <View style={{ width: '85%', marginTop: 15 }}>
                                            <Text style={{
                                                fontFamily: fonts.POPPINS_REGULAR,
                                                fontWeight: '400',
                                                fontSize: normalize(14),
                                                color: colors.BLACK_SHADE,
                                                alignSelf: "flex-end",
                                            }}>
                                                Forgot Password?
                                            </Text>
                                        </View> */}
                                        {
                                            errors.password || errors.phonoNo ?
                                                <ButtonLoader
                                                    loaderStyle={{ borderRadius: 30 }}
                                                    style={{ backgroundColor: '#e5e5e5', borderRadius: 30, marginVertical: 30 }}
                                                    title="LOGIN"
                                                    isLoading={false}
                                                /> :
                                                <ButtonLoader
                                                    loaderStyle={{ borderRadius: 30 }}
                                                    onPress={handleSubmit}
                                                    style={{ backgroundColor: '#C12607', borderRadius: 30, marginVertical: 30 }}
                                                    title="LOGIN"
                                                    isLoading={values?.isLoading}
                                                />
                                        }
                                        {/* <ButtonLoader
                                            onPress={handleSubmit}
                                            style={{ backgroundColor: '#7e57c2', borderRadius: 8, marginVertical: 20 }}
                                            title="LOGIN"
                                            isLoading={values?.isLoading}
                                        /> */}

                                        {/* <TouchableOpacity
                                            onPress={() => {
                                                this.props.navigation.navigate('Register')
                                            }}
                                            style={{ width: '85%', paddingBottom: 20 }}>
                                            <Text style={{
                                                fontFamily: fonts.POPPINS_REGULAR,
                                                fontWeight: '400',
                                                fontSize: normalize(14),
                                                color: colors.BLACK_SHADE,
                                                alignSelf: "center",
                                            }}>
                                                Not yet register? Sign up
                                            </Text>
                                        </TouchableOpacity> */}
                                    </>
                                )}
                            </Formik>
                        </View>
                        {/* <Text style={{
                            fontFamily: fonts.POPPINS_REGULAR,
                            fontWeight: '800',
                            fontSize: normalize(16),
                            color: colors.BLACK_SHADE,
                            alignSelf: "center",
                            position: "absolute",
                            bottom: 100
                        }}>
                            {`Version ${DeviceInfo.getVersion().toString()}`}
                        </Text> */}
                        <Text style={{
                            position: 'absolute',
                            bottom: 90,           // above wave (height 80) + small gap
                            left: 0,
                            right: 0,
                            textAlign: 'center',
                            fontFamily: fonts.POPPINS_REGULAR,
                            fontWeight: '800',
                            fontSize: normalize(16),
                            color: colors.BLACK_SHADE,
                        }}>
                            {`Version ${DeviceInfo.getVersion().toString()}`}
                        </Text>
                    </View>
                </KeyboardAwareScrollView>
            </HOCComponents>
        )
    }
}

export default connect(LoginComponent.mapStateToProps, LoginComponent.mapDispatchToProps)(Login);