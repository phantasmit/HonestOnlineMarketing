import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, ScrollView } from "react-native";
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
//
function ViewMoreSupport(props) {
    //
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { user_id = "" } = useSelector(state => state.StackReducer.userData);
    //const {} = props.route.params;
    const [replyMessage, setReplyMessage] = useState([]);
    //
    useEffect(() => {
        getSupportDetail()
    }, [])
    //
    getSupportDetail = () => {
        dispatch(
            getSupportDetailData({
                reqData: {
                    "user_id": user_id,
                    "ticketid": props?.route?.params?.ticketid
                },
                onSuccessResponse: (response => {
                    setReplyMessage(response?.data)
                }),
                onErrorResponse: (error => {
                    console.log(JSON.stringify(error));
                }),
            })
        )
    }
    //
    const { createdate, active, image, message, subject, department, ticketid, sid, status = "", reply_ticketid = "" } = props?.route?.params;
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
                <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }} >
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
                            paddingBottom: 10,
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
                                            style={{ backgroundColor: "#f8c366", borderRadius: 5, marginVertical: 0, width: "30%", height: 25 }}
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
                            <Text style={{ width: '100%', fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(12), color: colors.BLACK_SHADE_03, textAlign: "left", marginVertical: 0 }}>{subject}</Text>
                            <Text style={{ width: '100%', fontFamily: fonts.POPPINS_ITALIC, fontStyle: "italic", fontWeight: '800', fontSize: normalize(12), color: colors.GRAY_SHADE_LIGHT, textAlign: "left", marginVertical: 5 }}>{`"${message}"`}</Text>
                        </View>
                        {
                            image &&
                            <TouchableOpacity style={{ width: '100%', height: 100,alignItems:"center"}} onPress={() => { navigation.navigate('FullImageView', { image: image }) }}>
                                <Image source={{ uri: `data:image/jpeg;base64,${image}` }} resizeMode="contain" style={{ width: '50%', height: 100,borderWidth:1,borderColor:colors.GRAY_SHADE_LIGHT,borderRadius:3  }} />
                            </TouchableOpacity>
                        }
                        {/* <View style={{ width: '100%', marginVertical: 5, alignSelf: "center" }}>
                        <DashedLine dashLength={8} dashThickness={1} dashGap={1} dashColor='#c32626' />
                    </View> */}

                    </View>
                    {
                        (replyMessage?.length > 0) &&
                        <>
                            {
                                replyMessage?.map((item, index) => {
                                    if (item?.data.length > 0) {
                                        const { replymsg = "", createby = "", replydate = "" } = item?.data[0];
                                        return (
                                            <>
                                                {
                                                    index == 0 &&
                                                    <Text style={{ width: '100%', fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(16), color: 'green', textAlign: "left", marginVertical: 0, paddingHorizontal: 15, marginVertical: 10 }}>{`Reply`}</Text>
                                                }
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
                                                        //padding: 10,
                                                        marginTop: 10,
                                                        alignItems: "center"
                                                    }}>
                                                    <View style={{ width: '100%', padding: 10, backgroundColor: "white" }}>
                                                        <View style={{ flexDirection: "row", justifyContent: "space-between", width: '100%' }}>
                                                            <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(12), color: colors.BLACK_SHADE_03, textAlign: "left" }}>{createby}</Text>
                                                            <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(12), color: colors.GRAY_SHADE_LIGHT, textAlign: "right" }}>{replydate}</Text>
                                                        </View>

                                                        <RenderHtml
                                                            contentWidth={Dimensions.get('window').width}
                                                            source={{ html: replymsg }}
                                                            tagsStyles={{
                                                                a: { color: colors.GRAY_SHADE_LIGHT, textDecorationLine: 'underline', fontSize: normalize(12), fontFamily: fonts.POPPINS_ITALIC, fontStyle: "italic", textAlign: 'left', fontWeight: props.fontWeight },
                                                                p: { fontFamily: fonts.POPPINS_ITALIC, color: colors.GRAY_SHADE_LIGHT, fontSize: normalize(12), fontWeight: props.fontWeight, textAlign: 'left', fontStyle: "italic", },
                                                                img: { display: 'none' },
                                                                body: { fontFamily: fonts.POPPINS_ITALIC, color: colors.GRAY_SHADE_LIGHT, fontSize: normalize(12), fontWeight: props.fontWeight, textAlign: 'left', textDecorationLine: (props.isUnderLine) ? 'underline' : 'none', fontStyle: "italic", },
                                                            }}
                                                            systemFonts={[...defaultSystemFonts, fonts.POPPINS_REGULAR]}
                                                        />

                                                    </View>
                                                </View>
                                            </>
                                        )
                                    } else {
                                        return null
                                    }

                                })
                            }
                        </>
                    }
                    <Image source={bottom_bg} resizeMode="cover" style={{ width: '100%', height: '12%', position: "absolute", bottom: 0, transform: [{ rotate: "0deg" }] }} />
                    {/* <Text style={{ width: '100%', fontFamily: fonts.POPPINS_REGULAR, fontWeight: '800', fontSize: normalize(12), color: colors.GRAY_SHADE_LIGHT, textAlign: "left", marginVertical: 5 }}>{{ html: `${message}` }}</Text> */}
                </ScrollView>
            </View>

        </>
    )
}
export default ViewMoreSupport;