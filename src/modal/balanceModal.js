import React, { useEffect, useState } from 'react';
import { View, Text, Image, NativeModules } from "react-native";
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
//
function BalanceModal(props) {
    //
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { user_id = "" } = useSelector(state => state.StackReducer.userData);
    const [balance, setBalance] = useState('')
    const [isLoading, setLoading] = useState(false)
    //
    useEffect(() => {
        
    }, []);
    //
    return (
        <>
            <View style={{ flex: 1, backgroundColor: "#00000089", justifyContent: "center", alignItems: "center" }}>
                <KeyboardAwareScrollView
                    keyboardShouldPersistTaps='handled'
                    enableOnAndroid={true}
                    enableAutomaticScroll={true}
                    style={{ width: '100%', flexGrow: 1 }}
                    contentContainerStyle={{ width: '100%', flexGrow: 1, justifyContent: "center", alignItems: "center", }}>
                    {
                        {
                            0:
                                <View style={{ width: "85%", justifyContent: "center", alignItems: "center", backgroundColor: 'white', borderRadius: 5, paddingVertical: 20 }}>
                                    <Text style={{ fontFamily: fonts.POPPINS_BOLD, fontWeight: '800', fontSize: normalize(12), color: colors.LIGHT_RED, }}>{`Add Balance`}</Text>
                                    <View style={{ width: '85%', height: 60, marginVertical: 20 }}>
                                        <OutLinedTextInput
                                            style={{ marginTop: 0, width: '100%', height: 50 }}
                                            label="Add Balance"
                                            placeholder=''
                                            value={balance}
                                            onChangeText={(text) => {
                                                setBalance(text)
                                            }}
                                            keyboardType="number-pad"
                                        />
                                    </View>
                                    <View style={{ width: '85%', flexDirection: "row", justifyContent: "space-between", }}>
                                        <ButtonLoader
                                            onPress={() => {
                                                navigation.goBack()
                                            }}
                                            textStyle={{ fontSize: normalize(12), fontWeight: '800', }}
                                            style={{ backgroundColor: colors.GRAY_SHADE_LIGHT, borderRadius: 3, width: '48%', height: 40, marginVertical: 0 }}
                                            title="Cancel"
                                            isLoading={false}
                                        />
                                        <ButtonLoader
                                            onPress={() => {
                                                setLoading(true)
                                                dispatch(
                                                    addBalanceData({
                                                        reqData: {
                                                            "user_id": user_id,
                                                            "amount": parseInt(balance)
                                                        },
                                                        onSuccessResponse: (response => {
                                                            NativeModules.ToastModule.showToast(response?.Message);
                                                            setLoading(false)
                                                            navigation.goBack()
                                                        }),
                                                        onErrorResponse: (error => {
                                                            NativeModules.ToastModule.showToast('Error!');
                                                            setLoading(false)
                                                        })
                                                    })
                                                )
                                            }}
                                            textStyle={{ fontSize: normalize(12), fontWeight: '800', }}
                                            style={{ backgroundColor: 'green', borderRadius: 3, width: '48%', height: 40, marginVertical: 0 }}
                                            loaderStyle={{ backgroundColor: 'green', borderRadius: 3, width: '48%', height: 40, marginVertical: 0 }}
                                            title="Add"
                                            isLoading={isLoading}
                                        />
                                    </View>

                                </View>
                            ,
                            1:
                                <View style={{ width: "85%", justifyContent: "center", alignItems: "center", backgroundColor: 'white', borderRadius: 5, paddingVertical: 20 }}>
                                    <Text style={{ fontFamily: fonts.POPPINS_BOLD, fontWeight: '800', fontSize: normalize(12), color: colors.LIGHT_RED, }}>{`Withdraw Balance`}</Text>
                                    <View style={{ width: '85%', height: 60, marginVertical: 20 }}>
                                        <OutLinedTextInput
                                            style={{ marginTop: 0, width: '100%', height: 50 }}
                                            label="Withdraw Balance"
                                            placeholder=''
                                            value={balance}
                                            onChangeText={(text) => {
                                                setBalance(text)
                                            }}
                                            keyboardType="number-pad"
                                        />
                                    </View>
                                    <View style={{ width: '85%', flexDirection: "row", justifyContent: "space-between", }}>
                                        <ButtonLoader
                                            onPress={() => {
                                                navigation.goBack()
                                            }}
                                            textStyle={{ fontSize: normalize(12), fontWeight: '800', }}
                                            style={{ backgroundColor: colors.GRAY_SHADE_LIGHT, borderRadius: 3, width: '48%', height: 40, marginVertical: 0 }}
                                            title="Cancel"
                                            isLoading={false}
                                        />
                                        <ButtonLoader
                                            onPress={() => {
                                                setLoading(true)
                                                dispatch(
                                                    withdrawBalanceData({
                                                        reqData: {
                                                            "user_id": user_id,
                                                            "amount": parseInt(balance)
                                                        },
                                                        onSuccessResponse: (response => {
                                                            NativeModules.ToastModule.showToast(response?.Message);
                                                            setLoading(false)
                                                            navigation.goBack()
                                                        }),
                                                        onErrorResponse: (error => {
                                                            NativeModules.ToastModule.showToast('Error!');
                                                            setLoading(false)
                                                        })
                                                    })
                                                )
                                            }}
                                            textStyle={{ fontSize: normalize(12), fontWeight: '800', }}
                                            style={{ backgroundColor: 'orange', borderRadius: 3, width: '48%', height: 40, marginVertical: 0 }}
                                            loaderStyle={{ backgroundColor: 'orange', borderRadius: 3, width: '48%', height: 40, marginVertical: 0 }}
                                            title="Withdraw"
                                            isLoading={isLoading}
                                        />
                                    </View>

                                </View>
                        }[props.route.params?.type]
                    }

                </KeyboardAwareScrollView>
            </View>

        </>
    )
}
export default BalanceModal;