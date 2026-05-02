import React from "react";
import { View, Image, Text, TouchableOpacity, Dimensions, NativeModules } from "react-native";
import { ChangePasswordComponent } from "./changePasswordComponent";
import { connect } from "react-redux";
import colors from "../../assets/appColor/colors";
import HeaderComponent from "../../hoc/headerComponent";
import HOCComponent from "../../hoc/hocComponent";
import OutLinedTextInput from "../../component/outLinedTextInput";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import fonts from "../../assets/fonts/fonts";
import { normalize } from "../../utils/normalize";
import ButtonLoader from "../../component/buttonLoader";
import { Formik } from 'formik';
import * as Yup from "yup";
import { bottom_bg, logo, shree_01, bg, eye_hide, eye_show, wave_bottom, logo_new } from "../../utils/images";
import DeviceInfo from 'react-native-device-info';
//
const HeaderComponents = HeaderComponent(View)
const HOCComponents = HOCComponent(HeaderComponents);
//
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
//
class ChangePassword extends ChangePasswordComponent {

    render() {
        return (
            <>
                <HOCComponents
                    isHeader={true}
                    title="Change Password"
                    isBack={true}
                    onPress={() => {
                        this.props.navigation.goBack()
                    }}
                >
                    <KeyboardAwareScrollView
                        enableOnAndroid={true}
                        enableAutomaticScroll={true}
                        style={{ width: '100%', flexGrow: 2 }}
                        contentContainerStyle={{ width: '100%', flexGrow: 2, backgroundColor: 'transparent' }}>

                        <View style={{ flex: 1, backgroundColor: 'transparent', justifyContent: "center", alignItems: "center" }}>
                            <Image source={bg} style={{ width: '100%', height: Dimensions.get('window').width / 1.2, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, position: "absolute", top: 0, }} resizeMode="cover" />
                            <View style={{ width: '100%', height: Dimensions.get('window').width / 1.2, position: "absolute", top: 0, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, backgroundColor: "#C1260790", alignItems: "center" }} >
                                <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: 'white', position: "absolute", top: 50, alignItems: "center", justifyContent: "center" }}>
                                    <View style={{ width: 92, height: 92, borderRadius: 46, backgroundColor: '#C12607' }}></View>
                                    <Image source={logo_new} style={{ width: 90, height: 90, position: "absolute", }} resizeMode="contain" />
                                </View>
                            </View>
                            <View
                                style={{
                                    width: '90%',
                                    marginTop: 80,
                                    marginVertical: 10,
                                    borderRadius: 10,
                                    paddingVertical: 20,
                                    backgroundColor: colors.WHITE,
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: -2, },
                                    shadowOpacity: 0.5,
                                    shadowRadius: 2,
                                    elevation: 5,
                                    alignItems: "center",
                                    justifyContent: "flex-start"
                                }}>
                                {/* <Text style={{
                                    fontFamily: fonts.POPPINS_REGULAR,
                                    fontWeight: '400',
                                    fontSize: normalize(18),
                                    color: colors.GRAY_SHADE_LIGHT,
                                    alignSelf: "center",
                                    marginVertical: 10
                                }}>
                                    Honest 2 Online Marketing
                                </Text> */}
                                <Text style={{
                                    fontFamily: fonts.POPPINS_REGULAR,
                                    fontWeight: '800',
                                    fontSize: normalize(18),
                                    color: colors.BLACK_SHADE,
                                    alignSelf: "center",
                                }}>
                                    {this.props.userData.UserName}
                                </Text>
                                <Text style={{
                                    fontFamily: fonts.POPPINS_REGULAR,
                                    fontWeight: '400',
                                    fontSize: normalize(16),
                                    color: colors.BLACK_SHADE,
                                    alignSelf: "center",
                                    marginVertical: 10
                                }}>
                                    Change Password
                                </Text>
                                <Formik
                                    initialValues={{ password: "", newPassword: "", isLoading: false, isHide: true, }}
                                    validationSchema={Yup.object().shape({
                                        // phonoNo: Yup.string()
                                        //     .required("Phone no is required")
                                        //     .matches(phoneRegExp, 'Phone number is not valid')
                                        //     .min(10, "too short")
                                        //     .max(10, "too long"),
                                        // password: Yup.string()
                                        //     .trim().nonNullable()
                                        //     .required('Password is required')
                                        //     .min(4, "Minimum 4 character require")
                                    })}
                                    validateOnChange={true}
                                    validateOnBlur={true}
                                    onSubmit={(values, { setErrors, setSubmitting, setFieldValue }) => {
                                        setFieldValue('isLoading', true)
                                        this.props.getUserChangePassword({
                                            reqData: {
                                                "user_id": this.props.userData?.user_id,
                                                "UserPassword": values?.password,
                                                "user_password_new": values?.newPassword
                                            },
                                            onSuccessResponse: (response => {
                                                setFieldValue('password', '')
                                                setFieldValue('newPassword', '')
                                                NativeModules.ToastModule.showToast(response?.Message);
                                                setFieldValue('isLoading', false)
                                            }),
                                            onErrorResponse: (error => {
                                                setFieldValue('isLoading', false)
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
                                                label="Password"
                                                placeholder='Please enter current password'
                                                value={values?.password}
                                                onChangeText={handleChange('password')}
                                                onBlur={handleBlur('password')}
                                                error={errors.password}
                                                visible={errors.password}
                                                secureTextEntry={values.isHide}
                                                rightIcon={values.isHide ? eye_hide : eye_show}
                                                onPress={() => {
                                                    setFieldValue('isHide', !values.isHide)
                                                }}
                                            />
                                            <OutLinedTextInput
                                                outlineStyle={{ borderRadius: 30 }}
                                                style={{ marginTop: 0, width: '85%', height: 40, marginTop: 10 }}
                                                label="New Password"
                                                placeholder='Please enter new password'
                                                value={values?.newPassword}
                                                onChangeText={handleChange('newPassword')}
                                                onBlur={handleBlur('newPassword')}
                                                error={errors.newPassword}
                                                visible={errors.newPassword}
                                                secureTextEntry={values.isHide}
                                                rightIcon={values.isHide ? eye_hide : eye_show}
                                                onPress={() => {
                                                    setFieldValue('isHide', !values.isHide)
                                                }}
                                            />
                                            <ButtonLoader
                                                onPress={handleSubmit}
                                                loaderStyle={{ borderRadius: 30 }}
                                                style={{ backgroundColor: '#C12607', borderRadius: 8, marginVertical: 20, borderRadius: 30 }}
                                                title="Reset Password"
                                                isLoading={values?.isLoading}
                                            />
                                        </>
                                    )}
                                </Formik>

                            </View>


                        </View>
                    </KeyboardAwareScrollView>
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
                    <Image source={bottom_bg} resizeMode="cover" style={{ width: '100%', height: '100%', transform: [{ rotate: "0deg" }] }} />
                </View> */}
                    <View style={{ flex: 0.7 }}>
                        <Text style={{
                            fontFamily: fonts.POPPINS_REGULAR,
                            fontWeight: '800',
                            fontSize: normalize(16),
                            color: colors.BLACK_SHADE,
                            alignSelf: "center",
                        }}>
                            {`Version ${DeviceInfo.getVersion().toString()}`}
                        </Text>
                        <Image source={wave_bottom} resizeMode="cover" style={{ width: '100%', height: 80, position: "absolute", bottom: 0 }} />
                    </View>
                </HOCComponents>
            </>
        )
    }
}

export default connect(ChangePasswordComponent.mapStateToProps, ChangePasswordComponent.mapDispatchToProps)(ChangePassword);