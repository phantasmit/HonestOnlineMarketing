import React from "react";
import { View, Text, Image, TouchableOpacit, FlatList, ActivityIndicator, Dimensions, TouchableOpacity, ScrollView, NativeModules, DeviceEventEmitter,TouchableNativeFeedback } from "react-native";
import { ProgramSelectionComponent } from "./programSelectionComponent";
import { connect } from "react-redux";
import colors from "../../assets/appColor/colors";
import { TabView, TabBar } from 'react-native-tab-view';
import HeaderComponent from "../../hoc/headerComponent";
import HOCComponent from "../../hoc/hocComponent";
import fonts from "../../assets/fonts/fonts";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { normalize } from "../../utils/normalize";
import { logo, shree_01 } from "../../utils/images";
import DashedLine from 'react-native-dashed-line';
import ButtonLoader from "../../component/buttonLoader";
import CountDown from 'react-native-countdown-fixed';
//
const HeaderComponents = HeaderComponent(View)
const HOCComponents = HOCComponent(HeaderComponents);
//
class ProgramSelection extends ProgramSelectionComponent {

    render() {
        const { width, height } = Dimensions.get('window');
        return (
            <HOCComponents
                isHeader={true}
                title="All Draw"
                isBack={true}
                onPress={() => {
                    this.props.navigation.goBack()
                }}
            >
                <View>
                    <View style={{ flexDirection: 'row', width: '100%', height: 40, backgroundColor: "#EEEEEE" }}>
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>

                        </View>
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(7), color: colors.BLACK_SHADE_03 }}>{'Yantra'}</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(7), color: colors.BLACK_SHADE_03 }}>{'Quantity'}</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(7), color: colors.BLACK_SHADE_03 }}>{'Price'}</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(7), color: colors.BLACK_SHADE_03 }}>{'Total'}</Text>
                        </View>
                    </View>
                    <ScrollView style={{ flexGrow: 1 }} contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}>
                        {

                            this.state.programSelectionData.map((item, index) => {
                                const { image, title, counter } = item;
                                return (
                                    <View style={{
                                        flexDirection: 'row',
                                        width: '100%',
                                        marginBottom: 5,
                                        padding: 5,
                                        backgroundColor: 'white',
                                        shadowColor: '#000',
                                        shadowOffset: { width: 0, height: -2, },
                                        shadowOpacity: 0.5,
                                        shadowRadius: 2,
                                        elevation: 5,
                                    }}>
                                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                                            <Image source={image} resizeMode="contain" style={{ width: 45, height: 45 }} />
                                        </View>
                                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                                            <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(6), color: colors.BLACK_SHADE_03 }}>{title}</Text>
                                        </View>
                                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                                            <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(6), color: colors.BLACK_SHADE_03 }}>{counter}</Text>
                                        </View>
                                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                                            <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(6), color: colors.BLACK_SHADE_03 }}>{`11`}</Text>
                                        </View>
                                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                                            <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(6), color: colors.BLACK_SHADE_03 }}>{(counter * 11)}</Text>
                                        </View>
                                    </View>
                                )
                            })

                        }
                    </ScrollView>

                </View>
                <View style={{
                    position: "absolute", bottom: 0, flexDirection: 'row', width: '100%', justifyContent: "space-between", alignItems: "center", backgroundColor: colors.WHITE, padding: 10, shadowColor: '#000',
                    shadowOffset: { width: 0, height: -2, },
                    shadowOpacity: 0.5,
                    shadowRadius: 2,
                    elevation: 5,
                }}>
                    <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(7), color: colors.BLACK_SHADE_03 }}>{`Time ${this.state.currentTime}`}</Text>
                    <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(7), color: colors.BLACK_SHADE_03 }}>{`Total Quantity ${this.state.totalQty} / Total Price ${(this.state.totalQty * 11)}`}</Text>
                    <ButtonLoader
                        onPress={() => {
                            if (this.state.isSessionClosed) {
                                this.props.checkUserActivOrNotData({
                                    reqData: {
                                        "user_id": this.props.userData.user_id
                                    },
                                    onSuccessResponse: (response => {
                                        if (!response?.result) {
                                            this.props.updateErrroInfo({ errorCode: 2 })
                                            this.props.navigation.navigate('ErrorPage');
                                        } else {
                                            this.props.updateErrroInfo({ errorCode: 0 })
                                            this.checkDrawTimeReq()
                                        }
                                    }),
                                    onErrorResponse: (error => {
                                        console.log(JSON.stringify(error));
                                    }),
                                })
                            } else {
                                NativeModules.ToastModule.showToast('Session Closed');
                            }
                        }}
                        style={{ width: '15%', height: 35, backgroundColor: '#7e57c2', borderRadius: 8, marginVertical: 0, fontSize: normalize(6), }}
                        textStyle={{ fontSize: normalize(6) }}
                        title="SUBMIT"
                        isLoading={false}
                    />
                </View>
                {/* <View style={{ position: "absolute", bottom: 0, left: 0, height: 5, width: 5, backgroundColor: "transparent" }}>
                    <CountDown
                        id={this.state.untilid}
                        size={0}
                        until={this.state.remainTimer}
                        onFinish={() => {
                            this.checkCurrentDrawTime()
                        }}
                        onChange={(seconds) => {
                            console.log('seconds '+seconds);
                            if (parseInt(seconds / 60) == 0 && parseInt(seconds % 60) <= 15 && this.state.isSessionClosed) {
                                console.log("inside it");
                                this.setState({
                                    isSessionClosed: false
                                })
                            }
                        }}
                        style={{ alignSelf: "flex-start" }}
                        digitStyle={{ backgroundColor: 'transparent', borderWidth: 0, borderColor: 'transparent', alignSelf: 'flex-start' }}
                        digitTxtStyle={{
                            color: 'transparent',
                        }}
                        separatorStyle={{ color: 'transparent' }}
                        timeToShow={['M', 'S']}
                        timeLabels={{ m: null, s: null }}
                    />
                </View> */}
            </HOCComponents>
        )
    }
}

export default connect(ProgramSelectionComponent.mapStateToProps, ProgramSelectionComponent.mapDispatchToProps)(ProgramSelection);