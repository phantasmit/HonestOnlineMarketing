import React from "react";
import { View, Image, Text, Dimensions, TouchableOpacity } from "react-native";
import { RegisterComponent } from "./registerComponent";
import { connect } from "react-redux";
import colors from "../../assets/appColor/colors";
import HeaderComponent from "../../hoc/headerComponent";
import HOCComponent from "../../hoc/hocComponent";
import { bottom_bg, logo, orange_bg, eye_hide, eye_show, bg_dot, app_logo, back_image_01, user_p, phone_call, padlock, wave_bottom, logo_new, bg } from "../../utils/images";
import OutLinedTextInput from "../../component/outLinedTextInput";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import fonts from "../../assets/fonts/fonts";
import { normalize } from "../../utils/normalize";
import ButtonLoader from "../../component/buttonLoader";
import { Formik } from 'formik';
import * as Yup from "yup";
import DeviceInfo from 'react-native-device-info';
//
const HeaderComponents = HeaderComponent(View)
const HOCComponents = HOCComponent(HeaderComponents);
//
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
//
class Register extends RegisterComponent {

    render() {
        return (
            <HOCComponents title="">
                {/* <Image source={orange_bg} resizeMode="cover" style={{ borderBottomLeftRadius: 60, borderBottomRightRadius: 60, width: Dimensions.get('window').width, height: Dimensions.get('window').height / 2, position: "absolute", top: 0 }} />
                <Image source={bottom_bg} resizeMode="cover" style={{ width: '100%', height: '15%', position: "absolute", bottom: 0, transform: [{ rotate: "0deg" }] }} /> */}
                {/* <View style={{ flexDirection: "row", width: '100%', position: 'absolute', alignItems: "center", justifyContent: "center", top: 20 }}>
                    <Image source={app_logo} style={{ width: 120, height: 120 }} resizeMode="contain" />
                </View> */}
                {/* <View style={{ backgroundColor: 'transparent', alignSelf: "center", position: 'absolute', borderWidth: 2, borderColor: 'white', width: 110, height: 110, alignItems: "center", justifyContent: "center", borderRadius: 55, top: 25 }}>
                    <View style={{ backgroundColor: 'white', width: 100, height: 100, alignItems: "center", justifyContent: "center", borderRadius: 50 }}>
                        <Image source={logo} style={{ width: 90, height: 90, borderRadius: 45 }} resizeMode="contain" />
                    </View>
                </View> */}
                <Image source={wave_bottom} resizeMode="cover" style={{ width: '100%', height: 80, position: "absolute", bottom: 0 }} />
                <Image source={bg} style={{ width: '100%', height: Dimensions.get('window').width / 1.2, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, position: "absolute", top: 0, }} resizeMode="cover" />
                <View style={{ width: '100%', height: Dimensions.get('window').width / 1.2, position: "absolute", top: 0, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, backgroundColor: "#C1260790", alignItems: "center" }} >
                    <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: 'white', position: "absolute", top: 50, alignItems: "center", justifyContent: "center" }}>
                        <View style={{ width: 92, height: 92, borderRadius: 46, backgroundColor: '#C12607' }}></View>
                        <Image source={logo_new} style={{ width: 90, height: 90, position: "absolute", }} resizeMode="contain" />
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
                                width: '90%', borderRadius: 10, backgroundColor: 'white',
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
                                fontWeight: '800',
                                fontSize: normalize(16),
                                color: colors.BLACK_SHADE,
                                alignSelf: "center",
                                marginVertical: 20
                            }}>
                                Register
                            </Text>
                            <Formik
                                initialValues={{ firstName: "", lastName: "", phonoNo: "", password: "", confirmPassword: "", isLoading: false, isHide: true, }}
                                validationSchema={
                                    Yup.object().shape({
                                        // firstName: Yup.string()
                                        //     .trim().nonNullable()
                                        //     .required("First name is required"),
                                        // lastName: Yup.string()
                                        //     .trim().nonNullable()
                                        //     .required("Last name is required"),
                                        // phonoNo: Yup.string()
                                        //     .required("Phone no is required")
                                        //     .matches(phoneRegExp, 'Phone number is not valid')
                                        //     .min(10, "too short")
                                        //     .max(10, "too long"),
                                        // password: Yup.string()
                                        //     .trim().nonNullable()
                                        //     .required('Password is required')
                                        //     .min(4, "Minimum 4 character require"),
                                        // confirmPassword: Yup.string()
                                        //     .trim().nonNullable()
                                        //     .required('Password is required')
                                        //     .min(4, "Minimum 4 character require")
                                    })
                                }
                                validateOnChange={true}
                                validateOnBlur={true}
                                onSubmit={(values, { setErrors, setSubmitting, setFieldValue }) => {
                                    // this.doUserRegister({
                                    //     "UserContactNo": values?.phonoNo,//"9876543210",
                                    //     "UserPassword": values?.password,//xyz1
                                    //     "version": DeviceInfo.getVersion().toString()
                                    // })
                                    this.props.getUserRegister({
                                        reqData: {
                                            "firstname": values?.firstName,
                                            "lastname": values?.lastName,
                                            "UserPassword": values?.password,
                                            "UserContactNo": values?.phonoNo,
                                            "otp": "3547",
                                            "appversion": DeviceInfo.getVersion().toString()
                                        },
                                        onSuccessResponse: (response => {
                                            //
                                            this.props.navigation.goBack()
                                            //
                                        }),
                                        onErrorResponse: (error => {
                                            if (error?.Message) {
                                                alert(error?.Message)
                                            }
                                        })
                                    })
                                }}
                            >
                                {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors }) => (
                                    <>
                                        <OutLinedTextInput
                                            outlineStyle={{ borderRadius: 30 }}
                                            style={{ marginTop: 0, width: '85%', height: 40 }}
                                            label="First Name"
                                            placeholder=''
                                            value={values?.firstName}
                                            onChangeText={handleChange('firstName')}
                                            onBlur={handleBlur('firstName')}
                                            // error={errors.firstName}
                                            // visible={errors.firstName}
                                            leftIcon={user_p}
                                        />
                                        <OutLinedTextInput
                                            outlineStyle={{ borderRadius: 30 }}
                                            style={{ marginTop: 10, width: '85%', height: 40 }}
                                            label="Last Name"
                                            placeholder=''
                                            value={values?.lastName}
                                            onChangeText={handleChange('lastName')}
                                            onBlur={handleBlur('lastName')}
                                            // error={errors.lastName}
                                            // visible={errors.lastName}
                                            leftIcon={user_p}
                                        />
                                        {/* </View> */}
                                        <OutLinedTextInput
                                            outlineStyle={{ borderRadius: 30 }}
                                            style={{ marginTop: 10, width: '85%', height: 40 }}
                                            label="Mobile No"
                                            placeholder=''
                                            value={values?.phonoNo}
                                            onChangeText={handleChange('phonoNo')}
                                            onBlur={handleBlur('phonoNo')}
                                            // error={errors.phonoNo}
                                            // visible={errors.phonoNo}
                                            leftIcon={phone_call}
                                        />
                                        <OutLinedTextInput
                                            outlineStyle={{ borderRadius: 30 }}
                                            style={{ width: '85%', height: 40, marginTop: 10 }}
                                            label="Password"
                                            placeholder=''
                                            value={values?.password}
                                            onChangeText={handleChange('password')}
                                            secureTextEntry={values.isHide}
                                            onBlur={handleBlur('password')}
                                            // error={errors.password}
                                            // visible={errors.password}
                                            leftIcon={padlock}
                                            rightIcon={values.isHide ? eye_hide : eye_show}
                                            onPress={() => {
                                                setFieldValue('isHide', !values.isHide)
                                            }}
                                        />
                                        {/* <OutLinedTextInput
                                            style={{ width: '85%', height: 40, marginTop: 10 }}
                                            label="Confirm Password"
                                            placeholder='Please enter confirm password'
                                            value={values?.password}
                                            onChangeText={handleChange('confirmPassword')}
                                            secureTextEntry={values.isHide}
                                            onBlur={handleBlur('confirmPassword')}
                                            error={errors.confirmPassword}
                                            visible={errors.confirmPassword}
                                            rightIcon={values.isHide ? eye_hide : eye_show}
                                            onPress={() => {
                                                setFieldValue('isHide', !values.isHide)
                                            }}
                                        /> */}
                                        <ButtonLoader
                                            onPress={handleSubmit}
                                            style={{ backgroundColor: '#C12607', borderRadius: 30 }}
                                            textStyle={{ fontWeight: "800" }}
                                            title="Register"
                                            isLoading={values?.isLoading}
                                        />
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
                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.goBack()
                    }}
                    hitSlop={{ left: 50, right: 50, top: 50, bottom: 50 }}
                    activeOpacity={1}
                    style={{ position: "absolute", top: 0, left: 0, margin: 20 }}>
                    <Image source={back_image_01} tintColor={colors.WHITE} resizeMode="contain" style={{ width: 25, height: 25 }} />
                </TouchableOpacity>
            </HOCComponents>
        )
    }
}

export default connect(RegisterComponent.mapStateToProps, RegisterComponent.mapDispatchToProps)(Register);