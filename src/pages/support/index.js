import React from "react";
import { View, Text, Image, TouchableOpacity, FlatList, ActivityIndicator, RefreshControl } from "react-native";
import { SupportComponent } from "./supportComponent";
import { connect } from "react-redux";
import colors from "../../assets/appColor/colors";
import { TabView, TabBar } from 'react-native-tab-view';
import HeaderComponent from "../../hoc/headerComponent";
import HOCComponent from "../../hoc/hocComponent";
import fonts from "../../assets/fonts/fonts";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { normalize } from "../../utils/normalize";
import { bottom_bg, logo, shree_01, office, power, user_p, calendar, wallet_user, close } from "../../utils/images";
import DashedLine from 'react-native-dashed-line';
import DeviceInfo from 'react-native-device-info';
import ButtonLoader from "../../component/buttonLoader";
//
const HeaderComponents = HeaderComponent(View)
const HOCComponents = HOCComponent(HeaderComponents);
const Tab = createMaterialTopTabNavigator();
//
class Support extends SupportComponent {

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
                <View style={{ flex: 1, backgroundColor: 'transparent', alignItems: "center" }}>
                    <FlatList
                        data={this.state.supportData}
                        style={{ flexGrow: 1, width: '100%' }}
                        contentContainerStyle={{ flexGrow: 1, width: '100%', paddingBottom: 50 }}
                        renderItem={({ item, index }) => {
                            const { createdate, active, image, message, subject, department, ticketid, sid, status = "" } = item;
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.navigation.navigate('ViewMoreSupport', { ...item })
                                    }}
                                    style={{
                                        width: '90%',
                                        alignSelf: "center",
                                        backgroundColor: colors.WHITE,
                                        shadowColor: '#000',
                                        shadowOffset: { width: 0, height: -2, },
                                        shadowOpacity: 0.5,
                                        shadowRadius: 2,
                                        elevation: 5,
                                        borderRadius: 3,
                                        //padding: 10,
                                        marginTop: 10,
                                        alignItems: "center"
                                    }}>

                                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: "space-between", paddingHorizontal: 10, paddingTop: 10 }}>
                                        <View>
                                            <Text style={{ width: '100%', fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(12), color: colors.BLACK_SHADE_03, textAlign: "left" }}>{`${department} - #${ticketid}`}</Text>
                                            <Text style={{ width: '100%', fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(10), color: colors.GRAY_SHADE_LIGHT, textAlign: "left" }}>{createdate}</Text>
                                        </View>
                                        {
                                            {
                                                'inprogress':
                                                    <ButtonLoader
                                                        onPress={() => { }}
                                                        style={{ backgroundColor: "#43a8bf", borderRadius: 5, marginVertical: 0, width: "30%", height: 25 }}
                                                        textStyle={{ fontSize: normalize(10) }}
                                                        title={status}
                                                        isLoading={false}
                                                    />,
                                                'open':
                                                    <ButtonLoader
                                                        onPress={() => { }}
                                                        style={{ backgroundColor: "#c14456", borderRadius: 5, marginVertical: 0, width: "30%", height: 25 }}
                                                        textStyle={{ fontSize: normalize(10) }}
                                                        title={status}
                                                        isLoading={false}
                                                    />,
                                                'awaiting':
                                                    <ButtonLoader
                                                        onPress={() => { }}
                                                        style={{ backgroundColor: "#f8c366", borderRadius: 5, textAlign: "center", marginVertical: 0, width: "30%", height: 25 }}
                                                        textStyle={{ fontSize: normalize(10) }}
                                                        title={status}
                                                        isLoading={false}
                                                    />,
                                                'close':
                                                    <ButtonLoader
                                                        onPress={() => { }}
                                                        style={{ backgroundColor: "#15967d", borderRadius: 5, marginVertical: 0, width: "30%", height: 25 }}
                                                        textStyle={{ fontSize: normalize(10) }}
                                                        title={status}
                                                        isLoading={false}
                                                    />
                                            }[status.toLowerCase()]
                                        }

                                    </View>
                                    <View style={{ width: '100%', marginVertical: 5, alignSelf: "center" }}>
                                        <DashedLine dashLength={8} dashThickness={1} dashGap={1} dashColor='#c32626' />
                                    </View>

                                    <View style={{ width: '100%', paddingHorizontal: 10 }}>
                                        {/* <Text style={{ width: '100%', fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(10), color: colors.GRAY_SHADE_LIGHT, textAlign: "left" }}>{`#${ticketid}`}</Text> */}
                                        <Text style={{ width: '100%', fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(12), color: colors.BLACK_SHADE_03, textAlign: "left", marginVertical: 0 }}>{subject}</Text>
                                        <Text style={{ width: '100%', fontFamily: fonts.POPPINS_ITALIC, fontStyle: "italic", fontWeight: '800', fontSize: normalize(12), color: colors.GRAY_SHADE_LIGHT, textAlign: "left", marginVertical: 5 }}>{`"${message}"`}</Text>
                                    </View>
                                    {/* <Image source={{ uri: `data:image/jpeg;base64,${image}` }} resizeMode="contain" style={{ width: 100, height: 100 }} /> */}
                                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: "flex-end", paddingHorizontal: 10, paddingBottom: 10 }}>
                                        {/* <View style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: "red", marginRight: 10, alignItems: "center", justifyContent: "center" }}>
                                            <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(10), color: colors.BLACK_SHADE_03 }}>{`10`}</Text>
                                        </View> */}
                                        <ButtonLoader
                                            onPress={() => {
                                                this.props.navigation.navigate('ViewMoreSupport', { ...item })
                                            }}
                                            style={{ backgroundColor: '#7e57c2', borderRadius: 8, marginVertical: 0, width: "30%", height: 28 }}
                                            textStyle={{ fontSize: normalize(12) }}
                                            title="View More"
                                            isLoading={false}
                                        />
                                    </View>
                                </TouchableOpacity>
                            )
                        }}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={() => {
                                    this.setState({
                                        refreshing: true
                                    }, () => {
                                        this.fetchSupportData()
                                    })
                                }}
                            />
                        }
                    />
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate('CreateSupport')
                        }}
                        style={{
                            position: 'absolute', alignItems: "center", justifyContent: "center", width: 40, height: 40, backgroundColor: '#7e57c2', borderRadius: 20, bottom: 0, right: 0, margin: 30, shadowColor: '#000000',
                            shadowOffset: { width: 0, height: -2, },
                            shadowOpacity: 0.5,
                            shadowRadius: 2,
                            elevation: 5,
                        }}>
                        <Image source={close} resizeMode="contain" tintColor={colors.WHITE} style={{ width: 15, height: 15, transform: [{ rotate: '45deg' }] }} />

                    </TouchableOpacity>
                </View>
            </HOCComponents>
        )
    }
}

export default connect(SupportComponent.mapStateToProps, SupportComponent.mapDispatchToProps)(Support);