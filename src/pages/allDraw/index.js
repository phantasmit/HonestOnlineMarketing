import React from "react";
import { View, Text, Image, TouchableOpacit, FlatList, ActivityIndicator, Dimensions, TouchableOpacity } from "react-native";
import { AllDrawComponent } from "./allDrawComponent";
import { connect } from "react-redux";
import colors from "../../assets/appColor/colors";
import { TabView, TabBar } from 'react-native-tab-view';
import HeaderComponent from "../../hoc/headerComponent";
import HOCComponent from "../../hoc/hocComponent";
import fonts from "../../assets/fonts/fonts";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { normalize } from "../../utils/normalize";
import { logo, shree_01, jp, jp_3 } from "../../utils/images";
import DashedLine from 'react-native-dashed-line';
import CountDown from 'react-native-countdown-fixed';
import { data } from './data';
//
const HeaderComponents = HeaderComponent(View)
const HOCComponents = HOCComponent(HeaderComponents);
//
class AllDraw extends AllDrawComponent {

    render() {
        const { width, height } = Dimensions.get('window');
        return (
            <HOCComponents
                isHeader={true}
                isFromHome={false}
                title="All Draw"
                isBack={true}
                onPress={() => {
                    this.props.navigation.goBack()
                }}
            >
                <View style={{ flex: 1 }}>
                    {
                        {
                            true:
                                <ActivityIndicator />,
                            false:
                                <>
                                    {this.state.allDrawData.length > 0 ?
                                        <FlatList
                                            style={{ flex: 1, margin: 5, alignSelf: 'flex-start', }}
                                            data={this.state.allDrawData}
                                            numColumns={5}
                                            renderItem={({ item, index }) => {
                                                const { DrawTime = "", DrawDate = "", YantraIds = "", YantraName = "", YantraImage = "", DrawType = "", BonusAmount = "", DrawId = "" } = item;
                                                const yantraData = data.filter(yantraObj => yantraObj.title === YantraImage.toLowerCase())
                                                return (
                                                    <>
                                                        {
                                                            (yantraData.length > 0) ?
                                                                (YantraImage.toLowerCase().includes('dbd.png')) ?
                                                                    <TouchableOpacity
                                                                        onPress={() => {
                                                                            this.checkDhamakaOffer(DrawId)
                                                                        }}
                                                                        style={{
                                                                            width: (width - 60) / 5,
                                                                            alignItems: "center",
                                                                            justifyContent: 'space-around',
                                                                            borderRadius: 10,
                                                                            backgroundColor: '#FFFFFF',
                                                                            height: 150,// Dimensions.get('window').height / 2.5,
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
                                                                            <Image source={yantraData[0]?.image} style={{ width: 80, height: 80 }} />
                                                                        </View>
                                                                        <Text style={{ fontFamily: fonts.POPPINS_BOLD, fontWeight: '800', fontSize: normalize(5.2), color: colors.BLACK_SHADE_03, textAlign: 'center' }}>{YantraName.replace('</br>', '\n').toUpperCase()}</Text>
                                                                    </TouchableOpacity>
                                                                    :
                                                                    (DrawType.toLowerCase() == "Normal".toLowerCase()) ?
                                                                        <View style={{
                                                                            width: (width - 60) / 5,
                                                                            alignItems: "center",
                                                                            justifyContent: 'space-around',
                                                                            borderRadius: 10,
                                                                            backgroundColor: '#FFFFFF',
                                                                            height: 150,//height: Dimensions.get('window').height / 2.5,
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
                                                                                <Image source={yantraData[0]?.image} style={{ width: 80, height: 80 }} />
                                                                            </View>
                                                                            <Text style={{ fontFamily: fonts.POPPINS_BOLD, fontWeight: '800', fontSize: normalize(5.2), color: colors.BLACK_SHADE_03 }}>{YantraName.toUpperCase()}</Text>
                                                                            {
                                                                                DrawType == 'Good Luck' &&
                                                                                <Text style={{ fontFamily: fonts.POPPINS_BOLD, position: "absolute", bottom: 33, marginLeft: 8, textAlign: "center", fontWeight: '800', fontSize: normalize(5.2), color: colors.BLACK_SHADE_03 }}>{BonusAmount}</Text>
                                                                            }
                                                                        </View>
                                                                        : (DrawType.toLowerCase() == "Jackpot".toLowerCase()) ?
                                                                            <View style={{
                                                                                width: (width - 60) / 5,
                                                                                alignItems: "center",
                                                                                justifyContent: 'space-around',
                                                                                borderRadius: 10,
                                                                                backgroundColor: '#FFFFFF',
                                                                                height: 150,// height: Dimensions.get('window').height / 2.5,
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
                                                                                    <Image source={jp} style={{ width: 80, height: 80 }} />
                                                                                </View>
                                                                                <Text style={{ fontFamily: fonts.POPPINS_BOLD, fontWeight: '800', fontSize: normalize(5.2), color: colors.BLACK_SHADE_03 }}>{YantraName.toUpperCase()}</Text>
                                                                                {
                                                                                    DrawType == 'Good Luck' &&
                                                                                    <Text style={{ fontFamily: fonts.POPPINS_BOLD, position: "absolute", bottom: 33, marginLeft: 8, textAlign: "center", fontWeight: '800', fontSize: normalize(5.2), color: colors.BLACK_SHADE_03 }}>{BonusAmount}</Text>
                                                                                }
                                                                            </View>
                                                                            :
                                                                            <View style={{
                                                                                width: (width - 60) / 5,
                                                                                alignItems: "center",
                                                                                justifyContent: 'space-around',
                                                                                borderRadius: 10,
                                                                                backgroundColor: '#FFFFFF',
                                                                                height:150,//height: Dimensions.get('window').height / 2.5,
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
                                                                                    <Image source={jp_3} style={{ width: 80, height: 80 }} />
                                                                                </View>
                                                                                <Text style={{ fontFamily: fonts.POPPINS_BOLD, fontWeight: '800', fontSize: normalize(5.2), color: colors.BLACK_SHADE_03 }}>{YantraNames.toUpperCase()}</Text>
                                                                                {
                                                                                    DrawType == 'Good Luck' &&
                                                                                    <Text style={{ fontFamily: fonts.POPPINS_BOLD, position: "absolute", bottom: 33, marginLeft: 8, textAlign: "center", fontWeight: '800', fontSize: normalize(5.2), color: colors.BLACK_SHADE_03 }}>{BonusAmount}</Text>
                                                                                }
                                                                            </View>
                                                                : null
                                                        }
                                                    </>
                                                )
                                            }} />
                                        :
                                        <Text style={{ fontFamily: fonts.POPPINS_BOLD, fontWeight: '600', fontSize: normalize(12), color: colors.BLACK_SHADE_02, width: "100%", textAlign: 'center', padding: 100 }}>No Record Found</Text>
                                    }
                                </>
                        }[this.state.isLoading]
                    }

                </View>
            </HOCComponents>
        )
    }
}

export default connect(AllDrawComponent.mapStateToProps, AllDrawComponent.mapDispatchToProps)(AllDraw);