import React from "react";
import { View, Text, Image, TouchableOpacity, FlatList, ActivityIndicator, TouchableWithoutFeedback } from "react-native";
import { HistoryComponent } from "./historyComponent";
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


//
const HeaderComponents = HeaderComponent(View)
const HOCComponents = HOCComponent(HeaderComponents);
const Tab = createMaterialTopTabNavigator();
//
class History extends HistoryComponent {

    render() {
        return (
            <HOCComponents
                isHeader={true}
                title="History"
                isBack={true}
                onPress={() => {
                    this.props.navigation.goBack()
                }}
            >
                <View style={{ flex: 1, backgroundColor: 'transparent' }}>
                    {
                        {
                            true:
                                <ActivityIndicator />,
                            false:
                                <>
                                    {
                                        this.state.historyData.length > 0 ?
                                            <FlatList
                                                data={this.state.historyData}
                                                style={{ flexGrow: 1 }}
                                                contentContainerStyle={{ flexGrow: 1 }}
                                                renderItem={({ item, index }) => {
                                                    console.log(JSON.stringify(item));
                                                    const { OpeningBalance = "", TransectionAmount = "", TransectionDate = "", TransectionType = "", Barcode = "", CloseingBalance = "", UserTransectiontype = "" } = item;

                                                    return (
                                                        <View style={{
                                                            width: '95%', borderRadius: 5, alignSelf: "center", padding: 15, backgroundColor: colors.WHITE,
                                                            shadowColor: '#000',
                                                            shadowOffset: { width: 0, height: -2, },
                                                            shadowOpacity: 0.5,
                                                            shadowRadius: 2,
                                                            elevation: 5,
                                                            borderRadius: 2, marginTop: 10
                                                        }}>
                                                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                                                <TouchableWithoutFeedback onPress={() => { this.props.navigation.navigate('HistoryDetail', { ...item }) }} hitSlop={{ top: 20, bottom: 20, left: 30, right: 30, marginBottom: 3 }}>
                                                                    <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(12), color: colors.LIGHT_RED, }}>{`# ${Barcode}`}</Text>
                                                                </TouchableWithoutFeedback>
                                                                <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(12), color: colors.BLACK_SHADE_03, marginBottom: 3 }}>{TransectionDate}</Text>
                                                                {/* {
                                                                    {
                                                                        'purchased': <Text style={{ fontFamily: fonts.POPPINS_MEDIUM, fontWeight: '800', fontSize: normalize(12), color: colors.LIGHT_RED }}>{UserTransectiontype}</Text>,
                                                                        'win': <Text style={{ fontFamily: fonts.POPPINS_MEDIUM, fontWeight: '800', fontSize: normalize(12), color: colors.GREEN_SHADE }}>{UserTransectiontype}</Text>,
                                                                        'cancel': <Text style={{ fontFamily: fonts.POPPINS_MEDIUM, fontWeight: '800', fontSize: normalize(12), color: colors.GREEN_SHADE }}>{UserTransectiontype}</Text>,
                                                                        'recharge': <Text style={{ fontFamily: fonts.POPPINS_MEDIUM, fontWeight: '800', fontSize: normalize(12), color: colors.GREEN_SHADE }}>{UserTransectiontype}</Text>,
                                                                        'withdrawal': <Text style={{ fontFamily: fonts.POPPINS_MEDIUM, fontWeight: '800', fontSize: normalize(12), color: colors.LIGHT_RED }}>{UserTransectiontype}</Text>
                                                                    }[UserTransectiontype?.toLowerCase()]
                                                                } */}
                                                            </View>
                                                            {/* <View>
                                                                <DashedLine dashLength={8} dashThickness={1} dashGap={6} dashColor='#c32626' />
                                                            </View> */}
                                                            <View style={{ width: '100%', height: 2, marginVertical: 5 }} >
                                                                <DashedLine dashLength={8} dashThickness={0.5} dashGap={1} dashColor='#c32626' />
                                                            </View>
                                                            <View style={{ width: '100%', justifyContent: 'space-between', flexDirection: 'row' }}>
                                                                <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(14), color: colors.BLACK_SHADE_03 }}>Opening Balance</Text>
                                                                <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(12), color: colors.BLACK_SHADE_03 }}>{`${OpeningBalance}`}</Text>
                                                            </View>
                                                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                                                                <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(14), color: colors.BLACK_SHADE_03 }}>{UserTransectiontype}</Text>
                                                                {
                                                                    {
                                                                        'purchased': <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(12), color: colors.BLACK_SHADE_03 }}>{`- ${TransectionAmount}`}</Text>,
                                                                        'win': <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(12), color: colors.BLACK_SHADE_03 }}>{`+ ${TransectionAmount}`}</Text>,
                                                                        'cancel': <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(12), color: colors.BLACK_SHADE_03 }}>{` ${TransectionAmount}`}</Text>,
                                                                        'cancel refunded': <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(12), color: colors.BLACK_SHADE_03 }}>{` ${TransectionAmount}`}</Text>,
                                                                        'recharge': <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(12), color: colors.BLACK_SHADE_03 }}>{`+ ${TransectionAmount}`}</Text>,
                                                                        'withdrawal': <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(12), color: colors.BLACK_SHADE_03 }}>{`- ${TransectionAmount}`}</Text>
                                                                    }[UserTransectiontype?.toLowerCase()]
                                                                }
                                                                {/* <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '600', fontSize: normalize(16), color: colors.BLACK_SHADE_03 }}>{TransectionAmount}</Text> */}
                                                            </View>
                                                            {/* <View style={{ width: '100%', height: 2, backgroundColor: '#963736', marginVertical: 15 }} /> */}
                                                            <View style={{ width: '100%', height: 2, marginVertical: 5 }} >
                                                                <DashedLine dashLength={8} dashThickness={0.5} dashGap={1} dashColor='#c32626' />
                                                            </View>
                                                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginTop: 0 }}>
                                                                <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(14), color: colors.BLACK_SHADE_03 }}>Closing Balance</Text>
                                                                <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(12), color: colors.BLACK_SHADE_03 }}>{`${CloseingBalance}`}</Text>
                                                            </View>
                                                            {
                                                                (!(UserTransectiontype?.toLowerCase() == 'withdrawal' || UserTransectiontype?.toLowerCase() == 'recharge' || UserTransectiontype?.toLowerCase() == 'cancel')) &&
                                                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'flex-end', marginTop: 8, width: '100%', marginLeft: 2 }}>
                                                                    <TouchableOpacity
                                                                        onPress={() => {
                                                                            this.props.navigation.navigate('HistoryDetail', { ...item })
                                                                        }}
                                                                        style={{ height: 35, width: '30%', alignItems: "center", justifyContent: 'center', borderRadius: 3, backgroundColor: '#D32F2E' }}>
                                                                        <Text style={{ fontFamily: fonts.POPPINS_MEDIUM, fontWeight: '800', fontSize: normalize(12), color: 'white' }}>View More</Text>
                                                                    </TouchableOpacity>
                                                                </View>
                                                            }

                                                        </View>
                                                    )
                                                }} />
                                            :
                                            <Text style={{ fontFamily: fonts.POPPINS_BOLD, fontWeight: '600', fontSize: normalize(16), color: colors.BLACK_SHADE_02, width: "100%", textAlign: 'center', padding: 80 }}>No Record Found</Text>
                                    }
                                </>
                        }[this.state.isLoading]
                    }
                </View>
            </HOCComponents>
        )
    }
}

export default connect(HistoryComponent.mapStateToProps, HistoryComponent.mapDispatchToProps)(History);