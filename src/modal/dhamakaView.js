import React, { useEffect, useState } from 'react';
import { View, Text, Image } from "react-native";
import fonts from "../assets/fonts/fonts";
import ButtonLoader from "../component/buttonLoader";
import { normalize } from "../utils/normalize";
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { animation, close, coin } from '../utils/images';
import colors from '../assets/appColor/colors';
import { takeBalanceData } from '../pages/program/action';

function DhamakaView(props) {
    //
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { user_id = "" } = useSelector(state => state.StackReducer.userData);
    const [yantraData, setYantraData] = useState([]);
    const [yantraName, setYantraName] = useState([]);
    const [drawType, setDrawType] = useState('');
    //
    useEffect(() => {
        setYantraData(props.route.params.data[0]?.YantraImages)
        setYantraName(props.route.params.data[0]?.YantraName.split(','))
        setDrawType(props.route.params.data[0]?.DrawType)
    }, []);
    //
    return (
        <>
            <View style={{ flex: 1, backgroundColor: "#00000089", justifyContent: "center", alignItems: "center" }}>
                <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: 'white', borderRadius: 5 }}>

                    <Text style={{ fontFamily: fonts.POPPINS_BOLD, fontWeight: '800', fontSize: normalize(8), color: colors.LIGHT_RED, paddingTop: 15 }}>{drawType}</Text>
                    <View style={{ flexDirection: "row", justifyContent: "center", padding: 20 }}>
                        {
                            yantraData.map((item, index) => {
                                return (
                                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                                        <Image source={{ uri: item }} resizeMode='contain' style={{ width: 80, height: 80, marginHorizontal: 15 }} />
                                        <Text style={{ fontFamily: fonts.POPPINS_BOLD, fontWeight: '800', fontSize: normalize(6), color: colors.BLACK_SHADE_03, marginTop: 5 }}>{yantraName[index]}</Text>
                                    </View>
                                )
                            })
                        }
                    </View>
                    <ButtonLoader
                        onPress={() => { navigation.goBack() }}
                        style={{ backgroundColor: '#7e57c2', borderBottomLeftRadius: 5,borderBottomRightRadius: 5, bottom: 0, width: (80 * yantraData.length) + 40 + (30 * yantraData.length), height: 45, marginVertical: 0 }}
                        textStyle={{ fontSize: normalize(7) }}
                        title="Close"
                        isLoading={false}
                    />
                </View>


            </View>

        </>
    )
}
export default DhamakaView;