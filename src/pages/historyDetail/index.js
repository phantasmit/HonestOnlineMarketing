import React from "react";
import { View, Text, Image, ScrollView, FlatList, Dimensions, ActivityIndicator, TouchableOpacity, Alert } from "react-native";
import { HistoryDetailComponent } from "./historyDetailComponent";
import { connect } from "react-redux";
import colors from "../../assets/appColor/colors";
import HeaderComponent from "../../hoc/headerComponent";
import HOCComponent from "../../hoc/hocComponent";
import fonts from "../../assets/fonts/fonts";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { normalize } from "../../utils/normalize";
import DashedLine from 'react-native-dashed-line';
import ButtonLoader from "../../component/buttonLoader";
//
const HeaderComponents = HeaderComponent(View)
const HOCComponents = HOCComponent(HeaderComponents);
const Tab = createMaterialTopTabNavigator();
//
class HistoryDetail extends HistoryDetailComponent {

    render() {
        //console.log(JSON.stringify(this.state.historyDetail));

        const { DrawTime = "", DrawDate = "", CopuonCreateDate = "", CopuonCreateTime = "", CouponTotalNumber = "", Shree = "", Vashikaran = "", Sudarshan = "", Vastu = "", Planet = "", Love = "", Tara = "", Grah = "", Matsya = "", Meditation = "", DrawType = null, YantraId = null, YantraName = [], WinningAmount = null, WinningDate = null, BarcodeNumber = "" } = this.state.historyDetail;
        const YantraNameLower = (YantraName.length > 0) ? YantraName?.toLocaleString().toLowerCase().split(',') : [];//YantraName?.filter(v => v?.toLowerCase());
        return (
            <HOCComponents
                isHeader={true}
                title="History"
                isBack={true}
                onPress={() => {
                    this.props.navigation.goBack()
                }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 5, backgroundColor: 'white' }}>
                    {
                        {
                            true:
                                <ActivityIndicator />,
                            false:
                                <>
                                    <>
                                        {
                                            (DrawType == null && YantraId == null && YantraName.length == 0) ?
                                                <Text style={{ fontFamily: fonts.POPPINS_MEDIUM, fontWeight: '800', fontSize: normalize(18), color: colors.LIGHT_RED, marginTop: 15, marginLeft: 10, }}>Pending</Text>
                                                :
                                                <>
                                                    <Text style={{ fontFamily: fonts.POPPINS_MEDIUM, fontWeight: '800', fontSize: normalize(18), color: 'green', marginTop: 5, marginLeft: 10, }}>Declared</Text>
                                                    <View style={{
                                                        width: '95%', flexDirection: "row", borderRadius: 5, backgroundColor: 'white', padding: 5, alignSelf: 'center', marginTop: 15, shadowColor: '#000',
                                                        shadowOffset: { width: 0, height: -2, },
                                                        shadowOpacity: 0.5,
                                                        shadowRadius: 2,
                                                        elevation: 5
                                                    }}>
                                                        {
                                                            this.state.masterPptionData.map((items) => {

                                                                return (
                                                                    <>
                                                                        {
                                                                            (YantraNameLower.includes(items.title.toLowerCase())) &&
                                                                            <View style={{ padding: 10, alignItems: "center" }}>
                                                                                <Image source={items.image} style={{ width: 30, height: 30 }} />
                                                                                <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(12), color: colors.BLACK_SHADE_03, textAlign: 'center', marginTop: 5 }}>{`${items.title}`}</Text>
                                                                            </View>
                                                                        }
                                                                    </>

                                                                )
                                                            })
                                                        }

                                                        {
                                                            (WinningAmount !== null && WinningDate !== null) &&
                                                            <View style={{ flex: 1, justifyContent: 'flex-start', padding: 10 }}>
                                                                <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '600', fontSize: normalize(13), color: colors.LIGHT_RED }}>{`${WinningAmount} coin taken at ${WinningDate}`}</Text>
                                                            </View>
                                                        }

                                                    </View>
                                                </>
                                        }
                                    </>

                                    <View style={{ width: '95%', marginVertical: 10, alignSelf: "center" }}>
                                        <DashedLine dashLength={8} dashThickness={1} dashGap={2} dashColor='#c32626' />
                                    </View>
                                    <View style={{ flexDirection: "row", justifyContent: 'space-between', width: '95%', alignSelf: "center" }}>
                                        <Text style={{ fontFamily: fonts.POPPINS_MEDIUM, fontWeight: '800', fontSize: normalize(12), color: colors.BLACK_SHADE_03 }}>Ticket Id</Text>
                                        <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(12), color: colors.BLACK_SHADE_03 }}>{`#${BarcodeNumber}`}</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", justifyContent: 'space-between', width: '95%', alignSelf: "center", marginTop: 5 }}>
                                        <Text style={{ fontFamily: fonts.POPPINS_MEDIUM, fontWeight: '800', fontSize: normalize(12), color: colors.BLACK_SHADE_03 }}>Draw Time</Text>
                                        <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(12), color: colors.BLACK_SHADE_03 }}>{DrawTime}</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", justifyContent: 'space-between', width: '95%', alignSelf: "center", marginVertical: 5 }}>
                                        <Text style={{ fontFamily: fonts.POPPINS_MEDIUM, fontWeight: '800', fontSize: normalize(12), color: colors.BLACK_SHADE_03 }}>Purchase Time</Text>
                                        <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(12), color: colors.BLACK_SHADE_03, textAlign: "right" }}>{`${CopuonCreateDate} ${CopuonCreateTime}`}</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", justifyContent: 'space-between', width: '95%', alignSelf: "center" }}>
                                        <Text style={{ fontFamily: fonts.POPPINS_MEDIUM, fontWeight: '800', fontSize: normalize(12), color: colors.BLACK_SHADE_03 }}>Total Yantra</Text>
                                        <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(12), color: colors.BLACK_SHADE_03 }}>{CouponTotalNumber}</Text>
                                    </View>
                                    <View style={{ width: '95%', marginVertical: 10, alignSelf: "center" }}>
                                        <DashedLine dashLength={8} dashThickness={1} dashGap={2} dashColor='#c32626' />
                                    </View>

                                    <FlatList
                                        style={{ width: '100%', alignSelf: 'center' }}
                                        data={this.state.optionData}
                                        scrollEnabled={false}
                                        numColumns={4}
                                        renderItem={({ item, index }) => {
                                            const { counter = 0, image = "", title = "", value = 0 } = item;
                                            return (
                                                <View
                                                    style={{
                                                        width: Dimensions.get('window').width / 4 - 15,
                                                        alignItems: "center",
                                                        justifyContent: 'flex-start',
                                                        borderRadius: 5,
                                                        backgroundColor: 'white',
                                                        height: undefined,
                                                        margin: 5,
                                                        shadowColor: '#000',
                                                        shadowOffset: { width: 0, height: -2, },
                                                        shadowOpacity: 0.5,
                                                        shadowRadius: 2,
                                                        elevation: 5
                                                    }}>
                                                    <View style={{ width: 75, height: 75, alignItems: "center", justifyContent: "center" }} >
                                                        <Image source={image} resizeMode="contain" style={{ width: 60, height: 60 }} />
                                                    </View>
                                                    <View style={{ paddingBottom: 0, bottom: 10, alignItems: "center" }}>
                                                        <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(10), color: colors.BLACK_SHADE_03 }}>{title}</Text>
                                                        <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(12), color: colors.BLACK_SHADE_03 }}>{value}</Text>
                                                    </View>
                                                </View>
                                            )
                                        }
                                        } />

                                </>
                        }[this.state.isLoading]
                    }
                    {((DrawType == null && YantraId == null && YantraName.length == 0) && (this.props.route.params.TransectionType.toLowerCase() === 'purchased') && !this.state.isLoading) &&
                        <ButtonLoader
                            loaderStyle={{ borderRadius: 10, alignSelf: "center", width: "60%", height: 45, marginBottom: 10 }}
                            onPress={() => {

                                Alert.alert('Cancel Ticket', 'Are you sure you want to cancel ticket ?', [
                                    {
                                        text: 'Cancel',
                                        onPress: () => console.log('Cancel Pressed'),
                                        style: 'cancel',
                                    },
                                    {
                                        text: 'OK', onPress: () => {
                                            this.setState({
                                                isDeleteTicket: true
                                            }, () => {
                                                this.canCelTicketData()
                                            })
                                        }
                                    },
                                ]);
                            }}
                            style={{ backgroundColor: '#C12607', width: "60%", height: 45, borderRadius: 10, marginBottom: 10, alignSelf: "center" }}
                            title="Cancel Ticket"
                            isLoading={this.state.isDeleteTicket}
                        />
                    }
                </ScrollView>
            </HOCComponents >
        )
    }
}

export default connect(HistoryDetailComponent.mapStateToProps, HistoryDetailComponent.mapDispatchToProps)(HistoryDetail);