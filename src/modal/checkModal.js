import React, { useEffect, useState } from 'react';
import { View, Text, Image } from "react-native";
import fonts from "../assets/fonts/fonts";
import ButtonLoader from "../component/buttonLoader";
import { normalize } from "../utils/normalize";
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { animation, coin } from '../utils/images';
import colors from '../assets/appColor/colors';
import { takeBalanceData } from '../pages/program/action';
//
function CheckModal(props) {
    //
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { user_id = "" } = useSelector(state => state?.StackReducer?.userData)
    const [message, setMessage] = useState('')
    const [winning, setWinning] = useState(0)
    //
    useEffect(() => {
        const { Message = "", Winning = "" } = props?.route?.params ?? { Message: "", Winning: "" };
        setMessage(Message)
        setWinning(Winning)
    }, [props?.route?.params !== undefined]);
    //
    takeBalanceDataFun = () => {
        dispatch(
            takeBalanceData({
                reqData: {
                    "user_id": user_id
                },
                onSuccessResponse: (response => {
                    navigation.goBack()
                }),
                onErrorResponse: (error => {
                    console.log(JSON.stringify(error));
                }),
            })
        )
    }
    //
    return (
        <>
            <View style={{ flex: 1, backgroundColor: "#00000089", justifyContent: 'flex-end' }}>
                <View style={{ flexDirection: "row" }}>
                    <Image
                        style={{
                            flex: 1,
                            resizeMode: 'contain',
                        }}
                        source={animation} ></Image>
                    <Image
                        style={{
                            flex: 1,
                            resizeMode: 'contain',
                        }}
                        source={animation} ></Image>
                    <Image
                        style={{
                            flex: 1,
                            resizeMode: 'contain',
                        }}
                        source={animation} >

                    </Image>
                </View>
                <View style={{ alignSelf: "center", position: "absolute", alignItems: "center", backgroundColor: 'white', width: '30%', height: '45%', borderRadius: 3, bottom: 120 }}>

                    <Image
                        style={{ width: '250%', height: '250%', bottom: 100 }}
                        source={coin} ></Image>
                    <View style={{ position: "absolute", top: 0, paddingTop: 10, alignItems: "center", justifyContent: "center", height: '100%' }}>
                        <Text style={{ fontFamily: fonts.POPPINS_BOLD, fontWeight: '800', fontSize: normalize(14), color: colors.BLACK_SHADE_03 }}>{winning}</Text>
                        <Text style={{ fontFamily: fonts.POPPINS_BOLD, fontWeight: '800', fontSize: normalize(8), color: colors.LIGHT_RED }}>{`Congratulation !`}</Text>
                        <Text style={{ fontFamily: fonts.POPPINS_BOLD, fontWeight: '800', fontSize: normalize(7), color: colors.BLACK_SHADE_03 }}>{message}</Text>
                    </View>
                    <ButtonLoader
                        onPress={() => { takeBalanceDataFun() }}
                        style={{ backgroundColor: '#7e57c2', borderRadius: 3, width: '100%', height: 35, position: "absolute", bottom: -65 }}
                        textStyle={{ fontSize: normalize(7) }}
                        title="TAKE"
                        isLoading={false}
                    />
                </View>
            </View>
        </>
    )

}

export default CheckModal;