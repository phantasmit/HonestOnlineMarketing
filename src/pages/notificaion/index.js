import React from "react";
import { View, Text, Image, TouchableOpacity, FlatList, ActivityIndicator, RefreshControl } from "react-native";
import { NotificationComponent } from "./notificationComponent";
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
//
const HeaderComponents = HeaderComponent(View)
const HOCComponents = HOCComponent(HeaderComponents);
const Tab = createMaterialTopTabNavigator();
//
class Notification extends NotificationComponent {

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
                    {
                        {
                            true:
                                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                                    <ActivityIndicator size="small" color={colors.BLACK_SHADE_03} />
                                </View>,
                            false:
                                <>
                                    {
                                        (this.state.notificationData) ?
                                            <FlatList
                                                data={this.state.notificationData}
                                                style={{ flexGrow: 1, width: '100%' }}
                                                contentContainerStyle={{ flexGrow: 1, width: '100%' }}
                                                renderItem={({ item, index }) => {
                                                    const { content = "", createdate = "" } = item;
                                                    return (
                                                        <View
                                                            style={{
                                                                width: '95%',
                                                                alignSelf: "center",
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
                                                            {/* <Image source={user_p} resizeMode="contain" tintColor="orange" style={{ width: 15, height: 15, marginRight: 10 }} /> */}
                                                            <Text style={{ width: '100%', fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(12), color: colors.BLACK_SHADE_03, textAlign: "left" }}>{content}</Text>
                                                            <Text style={{ width: '100%', fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(8), color: colors.GRAY_SHADE_LIGHT, textAlign: "right" }}>{createdate}</Text>
                                                        </View>
                                                    )
                                                }}
                                                refreshControl={
                                                    <RefreshControl
                                                        refreshing={this.state.refreshing}
                                                        onRefresh={() => {
                                                            this.setState({
                                                                refreshing: true
                                                            }, () => {
                                                                this.fetchNotificationData()
                                                            })
                                                        }}
                                                    />
                                                }
                                            />
                                            :
                                            <Text style={[{
                                                fontFamily: fonts.POPPINS_REGULAR,
                                                fontWeight: '700',
                                                fontSize: normalize(14),
                                                color: colors.BLACK_SHADE_03
                                            }]}>
                                                {'No Data Found'}
                                            </Text>

                                    }
                                </>
                        }[this.state.isLoading]
                    }

                </View>
            </HOCComponents>
        )
    }
}

export default connect(NotificationComponent.mapStateToProps, NotificationComponent.mapDispatchToProps)(Notification);