import React from "react";
import { View, Text, Image, TouchableOpacit, FlatList, ScrollView, Dimensions, TouchableOpacity, NativeModules, ImageBackground, TouchableNativeFeedback } from "react-native";
import { ProgramComponent } from "./programComponent";
import { connect } from "react-redux";
import colors from "../../assets/appColor/colors";
import { TabView, TabBar } from 'react-native-tab-view';
import HeaderComponent from "../../hoc/headerComponent";
import HOCComponent from "../../hoc/hocComponent";
import fonts from "../../assets/fonts/fonts";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { normalize } from "../../utils/normalize";
import { animation, logo, orange_bg, shree_01, coin } from "../../utils/images";
import DashedLine from 'react-native-dashed-line';
import CountDown from 'react-native-countdown-fixed';
import Orientation from 'react-native-orientation-locker';
import { Marquee } from '@animatereactnative/marquee';
import RenderHtml from 'react-native-render-html';
import ButtonLoader from "../../component/buttonLoader";
import { yantraData } from '../../utils/yantra';
import stacks from "../../navigation/stackEnum";
import DeviceInfo from "react-native-device-info";
import { TouchableRipple } from 'react-native-paper';

//
const HeaderComponents = HeaderComponent(View)
const HOCComponents = HOCComponent(HeaderComponents);
const Tab = createMaterialTopTabNavigator();
//
class Program extends ProgramComponent {

    render() {
        return (
            <HOCComponents
                title="Honest 1 Online Marketing"
                isBack={true}
                isChip={true}
                isHeader={true}
                isActionButton={this.state.isActionButton}
                okayPress={() => {
                    if (parseFloat(this.state.totalBalance) < parseFloat((this.state.totalTicket * 11))) {
                        NativeModules.ToastModule.showToast('Purchase amount must not more than your balance');
                    } else {
                        if (this.state.isSessionClosed) {
                            this.checkDrawTimeReq()
                        } else {
                            NativeModules.ToastModule.showToast('Session Closed');
                        }
                    }
                    //
                }}
                cancelPress={() => {
                    this.clearAllData()
                }}
                selectedIndex={this.state.selectedIndex}
                onPress={() => {
                    this.props.navigation.navigate('AlertModal', {
                        orientation: 'LANDSCAPE',
                        onYesPress: () => {
                            this.goToPreviousScreen()
                        }
                    })
                }}
                onChipPress={(value, index) => {

                    this.setState({
                        selectCounter: (this.state.selectedIndex == index) ? 0 : value,
                        selectedIndex: (this.state.selectedIndex == index) ? -1 : index,
                        //isActionButton: true
                    })

                }}>
                <ScrollView style={{ width: "100%", flex: 1, backgroundColor: '#EFEFEF' }} showsVerticalScrollIndicator={false}>
                    <View style={{
                        flexDirection: "row", width: '100%', backgroundColor: colors.WHITE, height: 40, shadowColor: '#000',
                        shadowOffset: { width: 0, height: -2, },
                        shadowOpacity: 0.5,
                        shadowRadius: 2,
                        elevation: 5,
                    }}>
                        <View style={{ flex: 1, justifyContent: "center" }}>
                            <Marquee spacing={0} speed={1}>
                                <View style={{ flexDirection: "row", position: "relative" }}>

                                    {
                                        this.state.appMessage.map((item, index) => {
                                            return (

                                                <View style={{ marginLeft: 10, alignItems: "center", justifyContent: "center", flexDirection: "row", position: "relative" }}>
                                                    <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(6), color: colors.BLACK_SHADE_02, textAlign: "center" }}>{`${item?.content}`}</Text>
                                                    <Text style={{ marginLeft: 15, fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(12), marginTop: 5, color: "#F1556C", textAlign: "center" }}>{`*`}</Text>
                                                </View>

                                            )
                                        })
                                    }

                                </View>
                            </Marquee>
                            <View style={{ height: '100%', position: 'absolute', right: 0, width: 1, backgroundColor: '#EFEFEF' }} />
                        </View>
                        <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center", backgroundColor: 'white' }}>
                            <>
                                <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(5), color: colors.BLACK_SHADE_02 }}>Balance</Text>
                                <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(6), color: colors.BLACK_SHADE_02 }}>{this.state.totalBalance}</Text>
                            </>
                            <View style={{ height: '100%', position: 'absolute', right: 0, width: 1, backgroundColor: '#EFEFEF' }} />

                        </View>
                        <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center", backgroundColor: 'white' }}>
                            <>
                                <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(5), color: colors.BLACK_SHADE_02 }}>Ticket</Text>
                                <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(6), color: colors.BLACK_SHADE_02 }}>{this.state.totalTicket}</Text>
                            </>
                            <View style={{ height: '100%', position: 'absolute', right: 0, width: 1, backgroundColor: '#EFEFEF' }} />
                        </View>

                        <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center", backgroundColor: 'white' }}>
                            <>
                                <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(5), color: colors.BLACK_SHADE_02 }}>Amount</Text>
                                <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(6), color: colors.BLACK_SHADE_02 }}>{(this.state.totalTicket * 11).toFixed(0)}</Text>
                            </>
                        </View>
                    </View>
                    <View style={{ flex: 1, width: "100%", flexDirection: "row", alignItems: "flex-start" }}>
                        <FlatList
                            scrollEnabled={false}
                            style={{ flex: 1, alignSelf: 'flex-start' }}
                            data={this.state.programData}
                            numColumns={5}
                            renderItem={({ item, index }) => {
                                const { counter = 0, image = "", title = "" } = item;
                                return (
                                    <TouchableOpacity
                                        activeOpacity={1}
                                        onPress={() => {
                                            if (this.state.selectedIndex == -1) {
                                                NativeModules.ToastModule.showToast('Please select number');
                                            } else {
                                                var counter = this.state.selectCounter;
                                                this.state.programData.filter(item => item.counter > 0).forEach(items => {
                                                    counter += items.counter
                                                })
                                                this.state.programData[index].counter += this.state.selectCounter
                                                this.setState({
                                                    programData: this.state.programData,
                                                    totalTicket: counter,
                                                    isActionButton: true
                                                })
                                            }

                                        }}
                                        style={{
                                            flex: 1,
                                            alignItems: "center",
                                            justifyContent: 'flex-start',
                                            borderRadius: 3,
                                            backgroundColor: '#FFFFFF',
                                            height: 120,//Dimensions.get('window').height / 3,
                                            margin: 5,
                                            shadowColor: '#000',
                                            shadowOffset: { width: 0, height: -2, },
                                            shadowOpacity: 0.5,
                                            shadowRadius: 2,
                                            elevation: 5,

                                        }}
                                    >
                                        <Image source={image} resizeMode="contain" style={{ width: '55%', height: '55%' }} />
                                        <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(6), color: colors.BLACK_SHADE_03 }}>{title}</Text>
                                        <View style={{ width: '80%', height: 25, marginTop: 5, borderRadius: 5, backgroundColor: colors.BLACK_SHADE_02, alignItems: "center", justifyContent: 'center' }}>
                                            <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(6), color: colors.WHITE }}>{counter}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }} />
                        <View style={{
                            flex: 0.25,
                            alignItems: "center",
                            marginTop: 5,
                        }}
                        >
                            <View style={{
                                flex: 0.95,
                                width: '90%',
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: -2, },
                                shadowOpacity: 0.5,
                                shadowRadius: 2,
                                elevation: 5,
                                backgroundColor: colors.WHITE,
                                borderRadius: 3,
                                justifyContent: "space-between",
                                padding: 10
                            }}
                            >
                                <>
                                    <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(5), color: colors.BLACK_SHADE_03 }}>Date:</Text>
                                    <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(5), color: colors.LIGHT_RED }}>{this.state.currentDate}</Text>
                                </>
                                <>
                                    <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(5), color: colors.BLACK_SHADE_03 }}>Draw Time:</Text>
                                    <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(5), color: colors.LIGHT_RED }}>{`${this.state.drawTime}`}</Text>

                                </>
                                <>
                                    <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(5), color: colors.BLACK_SHADE_03 }}>Current Time:</Text>
                                    <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(5), color: colors.LIGHT_RED }}>{this.state.currentTime}</Text>
                                </>
                                <>
                                    <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(5), color: colors.BLACK_SHADE_03 }}>Remaining Time:</Text>
                                    <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(5), color: colors.LIGHT_RED }}>{this.formatTime(this.state.remainingTime)}</Text>
                                </>
                            </View>
                            {
                                this.state.isDisable ?
                                    <View
                                        style={{ width: '90%', backgroundColor: '#C6C6C6', borderRadius: 3, alignItems: "center", justifyContent: 'center', padding: 8, marginTop: 5 }}>
                                        <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(5), color: colors.BLACK_SHADE_03 }}>Check</Text>
                                    </View>
                                    :
                                    <TouchableNativeFeedback
                                        background={TouchableNativeFeedback.Ripple('rgba(0, 0, 0, 0.4)', false)}
                                        onPress={() => {
                                            this.props.checkAppUserUDID({
                                                reqData: {
                                                    "user_id": this.props.userData?.user_id
                                                },
                                                onSuccessResponse: (response => {
                                                    if (response.result == true) {
                                                        DeviceInfo.getUniqueId().then((value) => {
                                                            if (response?.udid === value) {
                                                                this.checkUserWinStatus()
                                                            } else {
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
                                                    }

                                                }),
                                                onErrorResponse: (error => {
                                                    console.log(JSON.stringify(error));
                                                }),
                                            })

                                        }}
                                    >
                                        <View style={{ width: '90%', backgroundColor: '#C12607', borderRadius: 3, alignItems: "center", justifyContent: 'center', padding: 8, marginTop: 5 }}>
                                            <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(5), color: colors.WHITE }}>Check</Text>
                                        </View>
                                    </TouchableNativeFeedback>

                            }
                            <TouchableNativeFeedback
                                background={TouchableNativeFeedback.Ripple('rgba(0, 0, 0, 0.4)', false)}
                                onPress={() => {
                                    Orientation.unlockAllOrientations()
                                    Orientation.lockToPortrait();
                                    this.props.navigation.navigate('History')
                                }}
                            >
                                <View style={{ width: '90%', backgroundColor: '#5560F7', borderRadius: 3, alignItems: "center", justifyContent: 'center', padding: 8, marginTop: 5 }}>
                                    <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(5), color: colors.WHITE }}>History</Text>
                                </View>
                            </TouchableNativeFeedback>

                            <TouchableNativeFeedback
                                background={TouchableNativeFeedback.Ripple('rgba(0, 0, 0, 0.4)', false)}
                                onPress={() => {
                                    this.props.navigation.navigate('AllDraw')
                                }}
                            >
                                <View style={{ width: '90%', backgroundColor: '#66BFFA', borderRadius: 3, alignItems: "center", justifyContent: 'center', padding: 8, marginTop: 5 }}>
                                    <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(5), color: colors.WHITE }}>All Draw</Text>
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                    </View>
                    <View style={{ flex: 1, width: "100%" }}>
                        <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(8), color: 'green', paddingHorizontal: 20, marginTop: 20 }}>Last 5 Draw</Text>
                        <View style={{ width: '14%', height: 2, backgroundColor: 'red', marginVertical: 10, marginLeft: 20 }} />
                        <FlatList
                            scrollEnabled={false}
                            style={{ flex: 1, width: '100%', marginHorizontal: 5, alignSelf: 'flex-start', }}
                            data={this.state.last5Record}
                            extraData={this.state.last5Record}
                            numColumns={5}
                            renderItem={({ item, index }) => {
                                const { DrawTime = "", DrawDate = "", YantraIds = "", YantraName = "", YantraImage = "", DrawType = "", BonusAmount = "", DrawId = "" } = item;
                                const yantraDataFilter = yantraData.filter(yantraObj => yantraObj.title === YantraImage.toLowerCase())
                                if (YantraImage.toLowerCase().includes('dbd.png')) {
                                    return (
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.checkDhamakaOffer(DrawId)
                                            }}
                                            style={{
                                                width: (Dimensions.get('window').width / 5) - 15,
                                                alignItems: "center",
                                                justifyContent: 'space-around',
                                                borderRadius: 10,
                                                backgroundColor: '#FFFFFF',
                                                //height: Dimensions.get('window').height / 2.5,
                                                height: 120,
                                                shadowColor: '#000',
                                                shadowOffset: { width: 0, height: -2, },
                                                shadowOpacity: 0.5,
                                                shadowRadius: 2,
                                                elevation: 5,
                                                margin: 5,
                                                paddingVertical: 5
                                            }}>
                                            <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(5), color: colors.BLACK_SHADE_02 }}>{DrawDate}</Text>
                                            <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(5), color: colors.BLACK_SHADE_02, marginBottom: 3 }}>{DrawTime}</Text>
                                            <View style={{ flex: 1 }}>
                                                <Image source={yantraDataFilter[0]?.image} style={{ width: 80, height: 80 }} />
                                            </View>
                                            {/*  */}
                                            <Text style={{ fontFamily: fonts.POPPINS_BOLD, fontWeight: '800', fontSize: normalize(5.2), color: colors.BLACK_SHADE_03 }}>{YantraName.toUpperCase()}</Text>
                                        </TouchableOpacity>
                                    )
                                } else {
                                    return (
                                        <View style={{
                                            width: (Dimensions.get('window').width / 5) - 15,
                                            alignItems: "center",
                                            justifyContent: 'space-around',
                                            borderRadius: 10,
                                            backgroundColor: '#FFFFFF',
                                            height: Dimensions.get('window').height / 2.5,
                                            shadowColor: '#000',
                                            shadowOffset: { width: 0, height: -2, },
                                            shadowOpacity: 0.5,
                                            shadowRadius: 2,
                                            elevation: 5,
                                            margin: 5,
                                            paddingVertical: 5
                                        }}>
                                            <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(5), color: colors.BLACK_SHADE_02 }}>{DrawDate}</Text>
                                            <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(5), color: colors.BLACK_SHADE_02, marginBottom: 3 }}>{DrawTime}</Text>
                                            <View style={{ flex: 1 }}>
                                                <Image source={yantraDataFilter[0]?.image} style={{ width: 80, height: 80 }} />
                                            </View>
                                            {/*  */}
                                            <Text style={{ fontFamily: fonts.POPPINS_BOLD, fontWeight: '800', fontSize: normalize(5.2), color: colors.BLACK_SHADE_03 }}>{YantraName.toUpperCase()}</Text>
                                            {
                                                DrawType == 'Good Luck' &&
                                                <Text style={{ fontFamily: fonts.POPPINS_BOLD, position: "absolute", bottom: 33, marginLeft: 8, textAlign: "center", fontWeight: '800', fontSize: normalize(5.2), color: colors.BLACK_SHADE_03 }}>{BonusAmount}</Text>
                                            }
                                        </View>
                                    )
                                }
                            }} />
                    </View>
                </ScrollView>
            </HOCComponents>
        )
    }
}

export default connect(ProgramComponent.mapStateToProps, ProgramComponent.mapDispatchToProps)(Program);