import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from "react-native";
import fonts from "../assets/fonts/fonts";
import ButtonLoader from "../component/buttonLoader";
import { normalize } from "../utils/normalize";
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { animation, back_image_01, close, close_01 } from '../utils/images';
import colors from '../assets/appColor/colors';
import { takeBalanceData } from '../pages/program/action';
import { Dropdown } from 'react-native-element-dropdown';
import OutLinedTextInput from '../component/outLinedTextInput';
import HOCComponent from '../hoc/hocComponent';
import HeaderComponent from '../hoc/headerComponent';
import { setSupportSubmitData } from '../pages/support/action';
import DashedLine from 'react-native-dashed-line';
import { goBack } from '../navigation/RootNavigation';

//
function FullImageView(props) {
    //
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { user_id = "" } = useSelector(state => state.StackReducer.userData);
    //
    useEffect(() => {}, [])
    //
    const { image } = props?.route?.params;
    return (
        <>

            <View style={{ flex: 1, backgroundColor: "#00000089", }}>
                <Image source={{ uri: `data:image/jpeg;base64,${image}` }} resizeMode="contain" style={{ width: '100%', height: '100%' }} />
            </View>
            <TouchableOpacity
                onPress={() => { navigation.goBack() }}
                style={{
                    position: 'absolute',
                    width: 60,
                    height: 60,
                    top: 0,
                    right: 0,
                    margin: 0
                }}
            >
                <Image source={close_01} tintColor={colors.WHITE} resizeMode="contain" style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
        </>
    )
}
export default FullImageView;