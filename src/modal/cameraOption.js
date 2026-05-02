//
import React, { useEffect, useState } from 'react';
import { View, Pressable, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import ButtonLoader from '../component/buttonLoader';
import colors from '../assets/appColor/colors';
//
function CameraOption(props) {
    //
    const navigation = useNavigation();
    const dispatch = useDispatch();
    //
    useEffect(() => {

    }, []);

    return (
        <>
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <Pressable style={[StyleSheet.absoluteFill, { backgroundColor: 'transparent' }]} onPress={() => { navigation.goBack() }} />
                <View style={{ backgroundColor: '#FFFFFF', paddingVertical: 30, width: '100%', borderTopLeftRadius: 20, borderTopRightRadius: 20, alignItems: "center", justifyContent: "center" }}>
                    <ButtonLoader
                        onPress={() => {
                            ImagePicker.openCamera({
                                width: 600,
                                height: 600,
                                compressImageMaxWidth: 500,
                                compressImageMaxHeight: 500,
                                compressImageQuality: 0.7,
                                cropping: true,
                                mediaType: 'photo'
                            }).then(image => {
                                props.route.params.onSelect({ ...image });
                                navigation.goBack()
                            });
                        }}
                        style={{ height: 50, marginVertical: 10, backgroundColor: colors.BLACK_SHADE_03 }}
                        title="Take Photo"
                        isLoading={false}
                    />
                    <ButtonLoader
                        onPress={() => {
                            ImagePicker.openPicker({
                                width: 600,
                                height: 600,
                                cropping: true,
                                includeExif: true
                            }).then(image => {
                                props.route.params.onSelect({ ...image });
                                navigation.goBack()
                            });
                        }}
                        style={{ height: 50, marginVertical: 10, backgroundColor: colors.BLACK_SHADE_03 }}
                        title="Choose from Library"
                        isLoading={false}
                    />
                    <ButtonLoader
                        onPress={() => { navigation.goBack() }}
                        style={{ height: 50, marginVertical: 10 }}
                        title="Cancel"
                        isLoading={false}
                    />
                </View>
            </View>
        </>
    )
}
//
export default CameraOption;