import React from "react";
import { View, Text, Image, TouchableOpacity, FlatList, ActivityIndicator, Alert, NativeModules } from "react-native";
import { UserProfileComponent } from "./userProfileComponent";
import { connect } from "react-redux";
import colors from "../../assets/appColor/colors";
import { TabView, TabBar } from 'react-native-tab-view';
import HeaderComponent from "../../hoc/headerComponent";
import HOCComponent from "../../hoc/hocComponent";
import fonts from "../../assets/fonts/fonts";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { normalize } from "../../utils/normalize";
import { bottom_bg, logo, shree_01, office, power, user_p, calendar, wallet_user } from "../../utils/images";
import DashedLine from 'react-native-dashed-line';
import DeviceInfo from 'react-native-device-info';
import ButtonLoader from "../../component/buttonLoader";
import stacks from "../../navigation/stackEnum";
//
const HeaderComponents = HeaderComponent(View)
const HOCComponents = HOCComponent(HeaderComponents);
const Tab = createMaterialTopTabNavigator();
//
class UserProfile extends UserProfileComponent {

    render() {
        const { firstname = "", lastname = "", UserContactNo = "", city = "", balance = "", AgentId = "", createdate = "", lastlogin = "" } = this.state.userInfo;
        return (
            <HOCComponents
                isHeader={true}
                title="History"
                isBack={true}
                onPress={() => {
                    this.props.navigation.goBack()
                }}
            >
                <View style={{ flex: 1, backgroundColor: 'transparent', alignItems: "center" }}>
                    <View
                        style={{
                            width: '90%',
                            backgroundColor: colors.WHITE,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: -2, },
                            shadowOpacity: 0.5,
                            shadowRadius: 2,
                            elevation: 5,
                            borderRadius: 3,
                            padding: 15,
                            marginTop: 15
                        }}>
                        <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(14), color: colors.BLACK_SHADE_03 }}>{`${firstname} ${lastname}`}</Text>
                        <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(12), color: colors.BLACK_SHADE_03, marginTop: 5 }}>{`Mobile : ${UserContactNo}`}</Text>
                        <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(12), color: colors.BLACK_SHADE_03, marginTop: 5 }}>{`Last login : ${lastlogin}`}</Text>
                    </View>
                    <View
                        style={{
                            width: '90%',
                            backgroundColor: colors.WHITE,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: -2, },
                            shadowOpacity: 0.5,
                            shadowRadius: 2,
                            elevation: 5,
                            borderRadius: 3,
                            padding: 15,
                            marginTop: 15
                        }}>
                        <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(14), color: colors.BLACK_SHADE_03 }}>{`Balance`}</Text>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate('BalanceStatus')
                            }}
                            style={{ flexDirection: "row", alignItems: "center" }}>
                            <Image source={wallet_user} tintColor={colors.BLACK_SHADE_03} resizeMode="contain" style={{ width: 40, height: 40, marginRight: 10 }} />
                            <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(30), color: colors.BLACK_SHADE_03 }}>{balance}</Text>
                            <View style={{ position: 'absolute', right: 0, top: -30 }}>
                                <ButtonLoader
                                    onPress={() => {
                                        this.props.navigation.navigate('BalanceModal', { type: 0 })
                                    }}
                                    textStyle={{ fontSize: normalize(9), fontWeight: '800', }}
                                    style={{ backgroundColor: 'green', borderRadius: 3, width: 65, height: 30, marginVertical: 0 }}
                                    title="Add"
                                    isLoading={false}
                                />
                                <ButtonLoader
                                    onPress={() => {
                                        this.props.navigation.navigate('BalanceModal', { type: 1 })
                                    }}
                                    textStyle={{ fontSize: normalize(9), fontWeight: '800', }}
                                    style={{ backgroundColor: 'orange',fontWeight:"800", borderRadius: 3, width: 65, height: 30, marginVertical: 0 ,marginTop:10}}
                                    title="Withdraw"
                                    isLoading={false}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(12), color: colors.BLACK_SHADE_03, textAlign: "left", width: "90%", marginTop: 15 }}>{`PROFILE DETAILS`}</Text>
                    <View
                        style={{
                            flexDirection: "row",
                            width: '90%',
                            backgroundColor: colors.WHITE,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: -2, },
                            shadowOpacity: 0.5,
                            shadowRadius: 2,
                            elevation: 5,
                            borderRadius: 3,
                            padding: 10,
                            marginTop: 10,
                            alignItems: "center"
                        }}>
                        <Image source={user_p} resizeMode="contain" tintColor="green" style={{ width: 15, height: 15, marginRight: 10 }} />
                        <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(12), color: colors.BLACK_SHADE_03 }}>{`First Name: ${firstname}`}</Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            width: '90%',
                            backgroundColor: colors.WHITE,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: -2, },
                            shadowOpacity: 0.5,
                            shadowRadius: 2,
                            elevation: 5,
                            borderRadius: 3,
                            padding: 10,
                            marginTop: 10,
                            alignItems: "center"
                        }}>
                        <Image source={user_p} resizeMode="contain" tintColor="orange" style={{ width: 15, height: 15, marginRight: 10 }} />
                        <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(12), color: colors.BLACK_SHADE_03 }}>{`Last Name: ${lastname}`}</Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            width: '90%',
                            backgroundColor: colors.WHITE,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: -2, },
                            shadowOpacity: 0.5,
                            shadowRadius: 2,
                            elevation: 5,
                            borderRadius: 3,
                            padding: 10,
                            marginTop: 10,
                            alignItems: "center"
                        }}>
                        <Image source={office} resizeMode="contain" style={{ width: 15, height: 15, marginRight: 10 }} />
                        <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(12), color: colors.BLACK_SHADE_03 }}>{`City: ${city}`}</Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            width: '90%',
                            backgroundColor: colors.WHITE,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: -2, },
                            shadowOpacity: 0.5,
                            shadowRadius: 2,
                            elevation: 5,
                            borderRadius: 3,
                            padding: 10,
                            marginTop: 10,
                            alignItems: "center"
                        }}>
                        <Image source={calendar} resizeMode="contain" tintColor="red" style={{ width: 15, height: 15, marginRight: 10 }} />
                        <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(12), color: colors.BLACK_SHADE_03 }}>{`Joining Date: ${createdate}`}</Text>
                    </View>
                    <ButtonLoader
                        onPress={() => {
                            Alert.alert('Logout', 'Are you sure you want to logout?', [
                                {
                                    text: 'Cancel',
                                    onPress: () => console.log('Cancel Pressed'),
                                    style: 'cancel',
                                },
                                {
                                    text: 'OK', onPress: () => {
                                        this.props.doLogoutFun({
                                            reqData: {
                                                'user_id': this.props.userData?.user_id
                                            },
                                            onSuccessResponse: (response => {
                                                this.props.changeStack({ stack_name: stacks.ON_BOARD_STACK })
                                                this.props.doLogout()
                                                NativeModules.ToastModule.showToast(response?.Message);
                                            }),
                                            onErrorResponse: (error => {

                                            }),
                                        })
                                    }
                                },
                            ]);
                        }}
                        style={{ backgroundColor: '#7e57c2', borderRadius: 3, marginVertical: 20 }}
                        title="Sign out"
                        isLoading={false}
                    />
                    <Text style={{
                        fontFamily: fonts.POPPINS_REGULAR,
                        fontWeight: '800',
                        fontSize: normalize(16),
                        color: colors.BLACK_SHADE,
                        position: "absolute",
                        bottom: 0,
                        marginBottom: 110,
                        alignSelf: "center",
                    }}>
                        {`Version ${DeviceInfo.getVersion().toString()}`}
                    </Text>
                    <Image source={bottom_bg} resizeMode="cover" style={{ position: "absolute", bottom: 0, width: '100%', height: 100, transform: [{ rotate: "0deg" }] }} />
                </View>
            </HOCComponents>
        )
    }
}

export default connect(UserProfileComponent.mapStateToProps, UserProfileComponent.mapDispatchToProps)(UserProfile);