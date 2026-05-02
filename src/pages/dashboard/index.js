import React from "react";
import { View, Text, Image, TouchableOpacity, FlatList, Alert, NativeModules } from "react-native";
import { DashboardComponent } from "./dashboardComponent";
import { connect } from "react-redux";
import colors from "../../assets/appColor/colors";
import { TabView, TabBar } from 'react-native-tab-view';
import HeaderComponent from "../../hoc/headerComponent";
import HOCComponent from "../../hoc/hocComponent";
import fonts from "../../assets/fonts/fonts";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { normalize } from "../../utils/normalize";
import { wave_bottom, logo, shree_01, orange_bg, box1 } from "../../utils/images";
import DashedLine from 'react-native-dashed-line';
import stacks from "../../navigation/stackEnum";
import DeviceInfo from 'react-native-device-info';
import LinearGradient from 'react-native-linear-gradient';
import Orientation from 'react-native-orientation-locker';
//
const HeaderComponents = HeaderComponent(View)
const HOCComponents = HOCComponent(HeaderComponents);
const Tab = createMaterialTopTabNavigator();
//
class Dashboard extends DashboardComponent {

    render() {
        return (
            <HOCComponents isHeader={true}
                title="Change Password"
                isBack={false}
                isFromHome={true}
                isDashbaord={true}
                totalBalance={this.state.totalBalance}
            >
                <View style={{ flex: 1, backgroundColor: 'transparent' }}>
                    <View style={{ margin: 15, alignItems: "flex-start" }}>
                        <Text style={{ fontFamily: fonts.POPPINS_REGULAR,  fontWeight: '700', fontSize: normalize(20), color: '#000000', }}>{`Honest 1 Online Marketing`}</Text>
                        <Text style={{ fontFamily: fonts.POPPINS_REGULAR,  fontWeight: '400', fontSize: normalize(18), color: '#000000', }}>{`Hi, ${this.props.userData.UserName}`}</Text>
                    </View>
                    <FlatList
                        data={this.state.optionData}
                        //numColumns={2}
                        style={{ marginHorizontal: 5 }}
                        renderItem={({ item, index }) => {
                            const { image = "", title = "", counter = "", screen_name = "", bg_image } = item;
                            return (
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => {
                                        if (screen_name == 'logout') {
                                            this.props.navigation.navigate('AlertModal', {
                                                orientation: 'PORTRAIT',
                                                title: 'Are you sure you want to logout?',
                                                onYesPress: () => {
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
                                                            console.log(JSON.stringify(error));
                                                        }),
                                                    })
                                                }
                                            })
                                        } else {
                                            this.props.navigation.navigate(screen_name)
                                        }

                                    }}
                                    style={{ flex: 1, width: '95%', alignSelf: "center", justifyContent: 'center', flexDirection: 'row', marginVertical: 8 }}>
                                    <View
                                        style={{
                                            width: '100%',
                                            //height: 60,
                                            flexDirection: "row",
                                            backgroundColor: colors.WHITE,
                                            shadowColor: '#000',
                                            shadowOffset: { width: 0, height: -2, },
                                            shadowOpacity: 0.5,
                                            shadowRadius: 2,
                                            elevation: 5,
                                            borderRadius: 40,
                                            padding: 8,
                                            alignItems: 'center',
                                            justifyContent: 'flex-start'
                                        }}
                                    >
                                        {/* <Image source={bg_image} resizeMode="stretch" style={{ width: '100%', height: 135, position: "absolute", borderRadius: 8 }} /> */}
                                        <View style={{ width: 36, height: 36, backgroundColor: colors.LIGHT_RED, borderRadius: 18, marginHorizontal: 10, alignItems: "center", justifyContent: "center" }}>
                                            <Image source={image} resizeMode="contain" tintColor={colors.WHITE} style={{ width: 22, height: 22 }} />
                                        </View>

                                        <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', marginLeft: 10, fontSize: normalize(19), color: colors.BLACK_SHADE, }}>{title}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        }} />
                    <View style={{ flex: 2 }}>
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
                    {/* <>
                        <Text style={{ fontFamily: fonts.POPPINS_MEDIUM, fontWeight: '800', fontSize: normalize(16), color: '#000000', marginTop: 15, marginLeft: 30 }}>Hi, ankitce3</Text>
                        <View style={{ width: '90%', alignSelf: "center", justifyContent: 'space-between', flexDirection: 'row', marginTop: 15 }}>
                            <View style={{ width: '48%', height: 150, backgroundColor: '#D98800', borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                                <Image source={logo} resizeMode="contain" style={{ width: 40, height: 40 }} />
                                <Text style={{ fontFamily: fonts.POPPINS_MEDIUM, fontWeight: '600', fontSize: normalize(14), color: '#FFFFFF', marginTop: 15 }}>Program</Text>
                            </View>
                            <View style={{ width: '48%', height: 150, backgroundColor: '#BA040D', borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                                <Image source={logo} resizeMode="contain" style={{ width: 40, height: 40 }} />
                                <Text style={{ fontFamily: fonts.POPPINS_MEDIUM, fontWeight: '600', fontSize: normalize(14), color: '#FFFFFF', marginTop: 15 }}>All Draw</Text>
                            </View>
                        </View>
                        <View style={{ width: '90%', alignSelf: "center", justifyContent: 'space-between', flexDirection: 'row', marginTop: 15 }}>
                            <View style={{ width: '48%', height: 150, backgroundColor: '#3A9204', borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                                <Image source={logo} resizeMode="contain" style={{ width: 40, height: 40 }} />
                                <Text style={{ fontFamily: fonts.POPPINS_MEDIUM, fontWeight: '600', fontSize: normalize(14), color: '#FFFFFF', marginTop: 15 }}>Transection</Text>
                            </View>
                            <View style={{ width: '48%', height: 150, backgroundColor: '#7F087A', borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                                <Image source={logo} resizeMode="contain" style={{ width: 40, height: 40 }} />
                                <Text style={{ fontFamily: fonts.POPPINS_MEDIUM, fontWeight: '600', fontSize: normalize(14), color: '#FFFFFF', marginTop: 15 }}>Change Password</Text>
                            </View>
                        </View>
                        <View style={{ width: '90%', alignSelf: "center", justifyContent: 'space-between', flexDirection: 'row', marginTop: 15 }}>
                            <View style={{ width: '48%', height: 150, backgroundColor: '#0772B3', borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                                <Image source={logo} resizeMode="contain" style={{ width: 40, height: 40 }} />
                                <Text style={{ fontFamily: fonts.POPPINS_MEDIUM, fontWeight: '600', fontSize: normalize(14), color: '#FFFFFF', marginTop: 15 }}>Support</Text>
                            </View>
                            <View style={{ width: '48%', height: 150, backgroundColor: '#BB7701', borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                                <Image source={logo} resizeMode="contain" style={{ width: 40, height: 40 }} />
                                <Text style={{ fontFamily: fonts.POPPINS_MEDIUM, fontWeight: '600', fontSize: normalize(14), color: '#FFFFFF', marginTop: 15 }}>Logout</Text>
                            </View>
                        </View>
                    </> */}
                    {/* {
                        ['', '','', ''].map((item, index) => {
                            return (
                                <View style={{ width: '95%', borderRadius: 10, alignSelf: "center", padding: 15, backgroundColor: '#424242', marginTop: 10 }}>
                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-between' }}>
                                        <Text style={{ fontFamily: fonts.POPPINS_BOLD, fontWeight: '800', fontSize: normalize(14), color: '#C33231' }}>Password reset request</Text>
                                        <TouchableOpacity style={{ height: 40, width: '40%', alignItems: "center", justifyContent: 'center', borderRadius: 10, backgroundColor: '#398E3D' }}>
                                            <Text style={{ fontFamily: fonts.POPPINS_MEDIUM, fontWeight: '600', fontSize: normalize(12), color: 'white' }}>Pending</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ width: '100%', height: 2, backgroundColor: '#963736', marginVertical: 15 }} />
                                    <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '600', fontSize: normalize(16), color: '#979797', marginTop: 3 }}>#7530765</Text>
                                    <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '600', fontSize: normalize(16), color: '#979797', marginTop: 5 }}>Testing issue with  MI Mobile</Text>
                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'flex-end', marginTop: 10 }}>
                                        <TouchableOpacity style={{ height: 50, width: '40%', alignItems: "center", justifyContent: 'center', borderRadius: 10, backgroundColor: '#D32F2E' }}>
                                            <Text style={{ fontFamily: fonts.POPPINS_MEDIUM, fontWeight: '600', fontSize: normalize(12), color: 'white' }}>View More</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        })
                    } */}

                </View>
            </HOCComponents>
        )
    }
}

export default connect(DashboardComponent.mapStateToProps, DashboardComponent.mapDispatchToProps)(Dashboard);