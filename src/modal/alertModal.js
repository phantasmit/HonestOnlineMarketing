import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Pressable, StyleSheet, Dimensions } from "react-native";
import fonts from "../assets/fonts/fonts";
import ButtonLoader from "../component/buttonLoader";
import { normalize } from "../utils/normalize";
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { animation, close, coin } from '../utils/images';
import colors from '../assets/appColor/colors';
import { takeBalanceData } from '../pages/program/action';
import OutLinedTextInput from '../component/outLinedTextInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { addBalanceData, withdrawBalanceData } from '../pages/userProfile/action';
import Orientation from 'react-native-orientation-locker';
//
function AlertModal(props) {
    //
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [screenCheck, setScreenCheck] = useState(props.route.params.orientation);//0-Portrait 1-Landscape
    //
    // useEffect(() => {
    //     var initial = Orientation.getInitialOrientation();
    //     if (initial === 'PORTRAIT') {
    //         setScreenCheck(0)
    //     } else {
    //         setScreenCheck(1)
    //     }
    // }, [])
    //
    return (
        <>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: "center" }}>
                <Pressable style={[StyleSheet.absoluteFill, { backgroundColor: 'transparent' }]} onPress={() => { navigation.goBack() }} />
                <View style={{ backgroundColor: '#FFFFFF', width: (screenCheck == 'PORTRAIT') ? Dimensions.get('window').height / 2.5 : Dimensions.get('window').width / 2.5, borderRadius: 10, alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ fontFamily: fonts.POPPINS_BOLD, fontWeight: '800', fontSize: normalize((screenCheck == 'PORTRAIT') ? 12 : 6), color: colors.BLACK_SHADE_03, padding: 10, textAlign: "center" }}>{(props.route.params?.title) ? props.route.params?.title : `Are you sure you want to exit from program?`}</Text>
                    <View style={{ height: 1, width: '100%', backgroundColor: colors.GRAY_SHADE_LIGHT_TRANSPARENT }}></View>
                    <View style={{ flexDirection: 'row', }}>
                        <TouchableOpacity onPress={() => { navigation.goBack() }} style={{ alignItems: "center", justifyContent: "center", width: '48%' }}>
                            <Text style={{ fontFamily: fonts.POPPINS_BOLD, fontWeight: '800', fontSize: normalize((screenCheck == 'PORTRAIT') ? 12 : 6), color: colors.BLACK_SHADE_03, padding: 10 }}>{`No`}</Text>
                        </TouchableOpacity>
                        <View style={{ width: 1, backgroundColor: colors.GRAY_SHADE_LIGHT_TRANSPARENT }}></View>
                        <TouchableOpacity onPress={() => {
                            navigation.goBack()
                            props.route.params.onYesPress()
                        }} style={{ alignItems: "center", justifyContent: "center", width: '48%' }}>
                            <Text style={{ fontFamily: fonts.POPPINS_BOLD, fontWeight: '800', fontSize: normalize((screenCheck == 'PORTRAIT') ? 12 : 6), color: colors.LIGHT_RED, padding: 10 }}>{`Yes`}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        </>
    )
}
export default AlertModal;