import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, NativeModules } from "react-native";
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
import { setSupportSubmitData } from '../pages/support/action';
//
function CreateSupport(props) {
    //
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { user_id = "" } = useSelector(state => state.StackReducer.userData);
    const [imageData, setImageData] = useState('');
    const [selectedItem, setSelectedItem] = useState({ label: 'Item 1', value: '1' });
    //
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setLoading] = useState(false);
    //
    const HeaderComponents = HeaderComponent(View)
    const HOCComponents = HOCComponent(HeaderComponents);
    //
    // useEffect(() => {

    // }, []);
    //
    submitSupportInfo = () => {
        // 
        setLoading(true)
        //
        let params = new FormData()
        params.append("user_id", user_id)
        params.append("subject", subject)
        params.append("department", selectedItem?.value)
        params.append("message", message)
        if (imageData) {
            params.append("image", {
                uri: imageData,
                name: "test.jpg",
                type: "image/jpg"
            })
        } else {
            params.append("image", '')
        }
        //
        dispatch(
            setSupportSubmitData({
                reqData: params,
                onSuccessResponse: ((response) => {
                    NativeModules.ToastModule.showToast(response?.Message);
                    setLoading(false)
                    navigation.goBack()
                }),
                onErrorResponse: (error => {
                    console.log(JSON.stringify(error));
                    setLoading(false)
                }),
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
            <View style={{ flex: 1, backgroundColor: "white", }}>
                <View style={{ paddingVertical: 30, justifyContent: "center", alignItems: "center", backgroundColor: 'white', borderRadius: 5, width: '100%' }}>
                    <Dropdown
                        inputSearchStyle={{
                            color: colors.LIGHT_BLACK,
                            fontFamily: fonts.POPPINS_REGULAR,
                            fontWeight: '400',
                            fontSize: normalize(12),
                        }}
                        fontFamily={fonts.POPPINS_REGULAR}
                        placeholderStyle={{
                            color: colors.LIGHT_GRAY,
                            fontFamily: fonts.POPPINS_REGULAR,
                            fontWeight: '400',
                            fontSize: normalize(12),
                            paddingLeft: 20
                        }}
                        selectedTextStyle={{
                            color: colors.LIGHT_BLACK,
                            fontFamily: fonts.POPPINS_REGULAR,
                            fontWeight: '400',
                            fontSize: normalize(12),
                            paddingLeft: 5
                        }}
                        itemTextStyle={{
                            color: colors.LIGHT_BLACK,
                            fontFamily: fonts.POPPINS_REGULAR,
                            fontWeight: '400',
                            fontSize: normalize(12),
                            //paddingLeft:20
                        }}
                        style={[{ width: '85%', height: 50, padding: 10, borderWidth: 1, borderColor: colors.TEXT_BORDER_COLOR, borderRadius: 10 }]}
                        data={[
                            { label: 'Technical', value: 'Techical' },
                            { label: 'Account', value: 'Account' },
                            { label: 'General', value: 'General' }
                        ]}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={'Select Department'}
                        value={selectedItem}
                        onChange={item => {
                            setSelectedItem(item)
                        }}
                    />
                    <OutLinedTextInput
                        style={{ marginTop: 0, width: '85%', height: 40, flex: 0, marginTop: 20 }}
                        label="Subject"
                        value={subject}
                        placeholder='Please enter subject'
                        onChangeText={(text) => {
                            setSubject(text)
                        }}

                    />
                    <OutLinedTextInput
                        multiline={true}
                        style={{ marginTop: 0, width: '85%', height: 140, flex: 0, marginTop: 20 }}
                        label="Message"
                        value={message}
                        placeholder='Please enter message'
                        onChangeText={(text) => {
                            setMessage(text)
                        }}

                    />
                    {
                        imageData &&
                        <View style={{ width: '85%', marginTop: 20, flexDirection: "row" }}>
                            {/* {
                            imageData.map((item, index) => {
                                return (
                                   
                                )
                            })
                        } */}
                            <Image source={{ uri: imageData }} resizeMode='contain' style={{ width: '40%', height: 150 }} />
                        </View>
                    }

                    <ButtonLoader
                        onPress={() => {
                            navigation.navigate('CameraOption', {
                                onSelect: (image) => {
                                    setImageData(image.path)
                                }
                            })
                        }}
                        style={{ backgroundColor: '#7e57c2', borderRadius: 8, width: '35%', height: 30, marginVertical: 20, alignSelf: 'flex-end', marginRight: 30 }}
                        title="Upload Image"
                        isLoading={false}
                    />
                    <ButtonLoader
                        onPress={() => {
                            submitSupportInfo()
                        }}
                        style={{ backgroundColor: '#7e57c2', borderRadius: 8, marginVertical: 20 }}
                        title="Submit"
                        isLoading={isLoading}
                    />
                </View>
            </View>
            <Image source={bottom_bg} resizeMode="cover" style={{ width: '100%', height: '12%', position: "absolute", bottom: 0, transform: [{ rotate: "0deg" }] }} />
        </>
    )
}
export default CreateSupport;