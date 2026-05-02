
import { View, TouchableOpacity, Image, Text, SafeAreaView, StyleSheet, ScrollView, DeviceEventEmitter } from "react-native";
import * as RootNavigation from "./RootNavigation";
import { CommonActions, DrawerActions, useNavigation } from '@react-navigation/native';
import { connect, useSelector, useDispatch } from "react-redux";
import DeviceInfo from 'react-native-device-info';
import fonts from "../assets/fonts/fonts";
import { normalize } from "../utils/normalize";
import colors from "../assets/appColor/colors";
import { changeStack, doLogout } from "./action";
import stacks from './stackEnum';
import { contactus, user, star, share, home_o2, man } from "../utils/images";
//
const DrawerOption = (props) => {
    //
    const menuOptiopn = [
        {
            title: "Dashboard",
            navigateTo: "Dashboard",
            icon: home_o2
        },
        {
            title: "Share",
            navigateTo: "Share",
            icon: share
        },
        {
            title: "Rate us",
            navigateTo: "Rate us",
            icon: star
        },
        {
            title: "Contact Us ",
            navigateTo: "Contact Us ",
            icon: contactus
        },
        {
            title: "Profile",
            navigateTo: "Profile",
            icon: user
        }
    ]
    //
    const navigation = useNavigation();
    const dispatch = useDispatch();
    //
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.WHITE }}>
            <View style={{ flex: 1, backgroundColor: colors.WHITE, paddingTop: 50 }}>
                <View style={{flexDirection:'row',alignItems:"center",padding:10}}>
                    <Image source={man} style={{ width: 50, height: 50 }} />
                    <Text
                        style={{
                            fontFamily: fonts.POPPINS_BOLD,
                            fontWeight: '700',
                            fontSize: normalize(16),
                            paddingLeft: 16,
                            color: colors.FONT_STYLE_COLOR_01
                        }}>{`Hi Guest`}</Text>
                </View>
                <ScrollView>
                    <>
                        {
                            menuOptiopn.map((item, index) => {
                                return (
                                    <TouchableOpacity key={index} onPress={() => {

                                    }} style={{ flexDirection: 'row', marginTop: 10, alignSelf: 'flex-end', alignItems: 'center' }}>
                                        <View style={{ borderBottomWidth: 0.2, flex: 1, padding: 15, paddingLeft: 0, marginLeft: 0, borderBottomColor: colors.BLUE_BORDER_COLOR, alignItems: "center", flexDirection: 'row' }}>
                                            <Image source={item.icon} tintColor={colors.FONT_STYLE_COLOR_02} style={{ width: 25, height: 25, marginLeft: 15, }} />
                                            <Text style={{ fontFamily: fonts.MONTSERRAAT_REGULAR, fontSize: 16, textAlign: "left", paddingLeft: 10, color: colors.FONT_STYLE_COLOR_02 }}>{item.title}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </>
                </ScrollView>
                <Text style={{ fontFamily: fonts.MONTSERRAAT_MEDIUM, color: colors.FONT_STYLE_COLOR_01, fontSize: 16, marginBottom: 10, textAlign: "left", alignSelf: 'center' }}>Version {DeviceInfo.getVersion()}</Text>
            </View>
        </SafeAreaView>
    )
}
//
export { DrawerOption };