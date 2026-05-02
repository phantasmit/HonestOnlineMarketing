import React from "react";
import { View, Image, Text, Dimensions, TouchableOpacity, NativeModules } from "react-native";
import { OtpComponent } from "./otpComponent";
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
//
const HeaderComponents = HeaderComponent(View)
const HOCComponents = HOCComponent(HeaderComponents);
//
class Otp extends OtpComponent {

    render() {
        return (
            <HOCComponents title="">
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
                               OTP
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
                        <Text style={{
                            fontFamily: fonts.POPPINS_REGULAR,
                            fontWeight: '800',
                            fontSize: normalize(16),
                            color: colors.BLACK_SHADE,
                            alignSelf: "center",
                            position: "absolute",
                            bottom: 100
                        }}>
                            {`Version ${DeviceInfo.getVersion().toString()}`}
                        </Text>
                    </View>
                </KeyboardAwareScrollView>
            </HOCComponents>
        )
    }
}

export default connect(OtpComponent.mapStateToProps, OtpComponent.mapDispatchToProps)(Otp);