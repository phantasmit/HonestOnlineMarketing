import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, ScrollView, FlatList, NativeModules } from "react-native";
import fonts from "../assets/fonts/fonts";
import ButtonLoader from "../component/buttonLoader";
import { normalize } from "../utils/normalize";
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { animation, back_image_01, close, coin, bottom_bg } from '../utils/images';
import colors from '../assets/appColor/colors';
import { takeBalanceData } from '../pages/program/action';
import { Dropdown } from 'react-native-element-dropdown';
import OutLinedTextInput from '../component/outLinedTextInput';
import HOCComponent from '../hoc/hocComponent';
import HeaderComponent from '../hoc/headerComponent';
import { getSupportDetailData, setSupportSubmitData } from '../pages/support/action';
import DashedLine from 'react-native-dashed-line';
import RenderHtml, { defaultSystemFonts } from 'react-native-render-html';
import { transactionStatusData, cancelTransactionData } from '../pages/userProfile/action';

//
function BalanceStatus(props) {
    //
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { user_id = "" } = useSelector(state => state.StackReducer.userData);
    const [transactionData, setTranscationData] = useState([]);
    useEffect(() => {
        getAllTransaction()
    }, [])
    //
    getAllTransaction = () => {
        dispatch(
            transactionStatusData({
                reqData: {
                    "user_id": user_id
                },
                onSuccessResponse: (response => {
                    setTranscationData(response?.data)
                }),
                onErrorResponse: (error => {
                    setTranscationData([])
                })
            })
        )
    }
    //
    return (
        <>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: '#EE4947', height: 45 }}>

                <TouchableOpacity onPress={() => {
                    navigation.goBack()
                }} hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}>
                    <Image source={back_image_01} tintColor={colors.WHITE} resizeMode="contain" style={{ width: 20, height: 20 }} />
                </TouchableOpacity>


                <Text style={{
                    fontFamily: fonts.MONTSERRAAT_MEDIUM,
                    fontWeight: '600',
                    textAlign: 'center',
                    fontSize: normalize(15),
                    color: colors.WHITE,
                    marginLeft: 15
                }}>
                    {`Honest 1 Online Marketing`}
                </Text>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: "flex-end" }} />
            </View>
            <View style={{ flex: 1, backgroundColor: "#efefef", }}>
                <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(12), color: colors.GREEN_SHADE,padding:10 }}>{'Recharge/Withdrawal Request'}</Text>
                <View style={{ backgroundColor: 'white', width: '95%', marginTop: 20, flexDirection: "row", height: 35, borderWidth: 1, borderColor: colors.GRAY_SHADE_LIGHT, alignSelf: "center" }}>
                    <View style={{ flex: 1, borderRightWidth: 1, borderRightColor: colors.GRAY_SHADE_LIGHT, alignItems: "center", justifyContent: 'center' }}>
                        <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(12), color: colors.BLACK_SHADE_03 }}>{'Amount'}</Text>
                    </View>
                    <View style={{ flex: 1.5, borderRightWidth: 1, borderRightColor: colors.GRAY_SHADE_LIGHT, alignItems: "center", justifyContent: 'center' }}>
                        <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(12), color: colors.BLACK_SHADE_03 }}>{'Type'}</Text>
                    </View>
                    <View style={{ flex: 1.5, borderRightWidth: 1, borderRightColor: colors.GRAY_SHADE_LIGHT, alignItems: "center", justifyContent: 'center' }}>
                        <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(12), color: colors.BLACK_SHADE_03 }}>{'Status'}</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: "center", justifyContent: 'center' }}>
                        <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(12), color: colors.BLACK_SHADE_03 }}>{'Action'}</Text>
                    </View>
                </View>
                <FlatList
                    data={transactionData}
                    style={{ alignSelf: "center", width: '95%' }}
                    renderItem={({ item, index }) => {
                        const { status, trid, amount, type } = item;
                        return (

                            <View
                                style={{
                                    borderLeftWidth: 1,
                                    borderRightWidth: 1,
                                    borderBottomWidth: 1,
                                    borderLeftColor: colors.GRAY_SHADE_LIGHT,
                                    borderRightColor: colors.GRAY_SHADE_LIGHT,
                                    borderBottomColor: colors.GRAY_SHADE_LIGHT,
                                    width: '100%',
                                    height: 35,
                                    alignSelf: "center",
                                    flexDirection: "row",
                                    backgroundColor: (index % 2 == 0) ? colors.GRAY_SHADE_01 : colors.WHITE,
                                    // shadowColor: '#000',
                                    // shadowOffset: { width: 0, height: -2, },
                                    // shadowOpacity: 0.5,
                                    // shadowRadius: 2,

                                    // justifyContent: 'space-between',
                                    //elevation: 5,
                                    // borderRadius: 3,
                                }}>
                                <View style={{ flex: 1, borderRightWidth: 1, borderRightColor: colors.GRAY_SHADE_LIGHT, alignItems: "center", justifyContent: 'center' }}>
                                    <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '600', fontSize: normalize(10), color: colors.BLACK_SHADE_03 }}>{`\u20B9 ${amount}`}</Text>
                                </View>
                                <View style={{ flex: 1.5, borderRightWidth: 1, borderRightColor: colors.GRAY_SHADE_LIGHT, alignItems: "center", justifyContent: 'center' }}>
                                    <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(10), color: (type.toLowerCase() == 'Withdrawal'.toLowerCase()) ? 'red' : 'green' }}>{type}</Text>
                                </View>
                                <View style={{ flex: 1.5, borderRightWidth: 1, borderRightColor: colors.GRAY_SHADE_LIGHT, alignItems: "center", justifyContent: 'center' }}>
                                    {
                                        {
                                            0:
                                                <View style={{ borderRadius: 3, paddingHorizontal: 8, paddingVertical: 3, backgroundColor: '#f8c366', alignItems: "center", justifyContent: "center" }}>
                                                    <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(9), color: 'white' }}>{'Pending'}</Text>
                                                </View>,
                                            1:
                                                <View style={{ borderRadius: 3, paddingHorizontal: 8, paddingVertical: 3, backgroundColor: '#15967d', alignItems: "center", justifyContent: "center" }}>
                                                    <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(9), color: 'white' }}>{'Approved'}</Text>
                                                </View>,
                                            2:
                                                <View style={{ borderRadius: 3, paddingHorizontal: 8, paddingVertical: 3, backgroundColor: '#c14456', alignItems: "center", justifyContent: "center" }}>
                                                    <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(9), color: 'white' }}>{'Rejected'}</Text>
                                                </View>,
                                            3:
                                                <View style={{ borderRadius: 3, paddingHorizontal: 8, paddingVertical: 3, backgroundColor: 'gray', alignItems: "center", justifyContent: "center" }}>
                                                    <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(9), color: 'white' }}>{'Cancelled'}</Text>
                                                </View>,
                                        }[status]
                                    }
                                </View>
                                <View style={{ flex: 1, alignItems: "center", justifyContent: 'center' }}>
                                    {
                                        (status == 0) ?
                                            <ButtonLoader
                                                onPress={() => {
                                                    dispatch(
                                                        cancelTransactionData({
                                                            reqData: {
                                                                "user_id": user_id,
                                                                "trid": trid
                                                            },
                                                            onSuccessResponse: (response => {
                                                                NativeModules.ToastModule.showToast(response?.Message);
                                                                getAllTransaction()
                                                            }),
                                                            onErrorResponse: (error => {
                                                                NativeModules.ToastModule.showToast('Error!');
                                                            })
                                                        })
                                                    )
                                                }}
                                                textStyle={{ fontSize: normalize(9), fontWeight: '800', }}
                                                style={{ backgroundColor: '#c14456', borderRadius: 3, width: 20, height: 20, marginVertical: 0 }}
                                                title="X"
                                                isLoading={false}
                                            />
                                            :
                                            <View style={{ backgroundColor: 'transparent', borderRadius: 3, width: 65, height: 30, marginVertical: 0 }} />
                                    }
                                </View>
                            </View>
                        )
                    }} />

            </View>

        </>
    )
}
export default BalanceStatus;