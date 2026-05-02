import React, { PureComponent, Component } from "react";
import { TouchableOpacity, Image, Text, View, StyleSheet, StatusBar, Animated, Easing, Dimensions, TouchableNativeFeedback } from 'react-native';
import fonts from '../assets/fonts/fonts';
import colors from '../assets/appColor/colors';
import { normalize } from '../utils/normalize';
import { store } from "../store/configureStore";
import { SafeAreaView } from 'react-native-safe-area-context';
import { fifty_50, one_01, five_05, ten_10, twenty_20, left_arrow, notification, back_image_01, wallet_user, profile_user, wave_top } from "../utils/images";
import * as RootNavigation from "../navigation/RootNavigation";
import ButtonLoader from "../component/buttonLoader";
//
const HeaderComponent = WrappedComponent => {
    //
    const cartCounter = store.getState().StackReducer.cartCounter;
    const rotateAnimation = Array.from({ length: 5 }, () => new Animated.Value(0));
    var infiniteLoop = null;
    //
    const startAnimation = (index) => {
        //rotateAnimation[index].setValue(0)
        return Animated.loop(
            Animated.timing(rotateAnimation[index], {
                toValue: 1,
                duration: 1500,
                easing: Easing.linear,
                useNativeDriver: true
            })
        )
    }
    // rotate = rotateAnimation.interpolate({
    //     inputRange: [0, 1],
    //     outputRange: ['0deg', '360deg']
    // })
    //
    class Wrapped extends PureComponent {

        constructor(props) {
            super(props);

        }

        render() {

            const { children, ...props } = this.props;
            return (
                <>
                    {/* <Image source={orange_bg} resizeMode="cover" style={{ width: '100%', position: "absolute", top: 0 }} /> */}
                    {
                        !props?.isFromHome ?
                            props.isHeader &&
                            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: '#C12607' }}>

                                {
                                    props.isBack &&
                                    <TouchableOpacity onPress={() => {
                                        if (infiniteLoop)
                                            infiniteLoop.reset()
                                        //
                                        if (props?.selectedIndex && props?.selectedIndex !== -1) {
                                            //
                                            rotateAnimation[props.selectedIndex].setValue(0)
                                            //
                                        }
                                        //
                                        props.onPress()
                                        //
                                    }} hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}>
                                        <Image source={back_image_01} tintColor={colors.LIME_GEEEN} resizeMode="contain" style={{ width: 20, height: 20 }} />
                                    </TouchableOpacity>
                                }

                                <Text style={[styles.titleStyle]}>
                                    {`Honest 1 Online Marketing`}
                                </Text>

                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: "flex-end" }}>
                                    {
                                        props.isChip &&
                                        <View style={{ width: 250, flexDirection: "row", alignSelf: "center", justifyContent: "space-between", alignItems: "center" }}>
                                            {
                                                [
                                                    {
                                                        "image": one_01,
                                                        "value": 1,
                                                    },
                                                    {
                                                        "image": five_05,
                                                        "value": 5,
                                                    },
                                                    {
                                                        "image": ten_10,
                                                        "value": 10,
                                                    }, {
                                                        "image": twenty_20,
                                                        "value": 20,
                                                    }, {
                                                        "image": fifty_50,
                                                        "value": 50,
                                                    }
                                                ].map((item, index) => {

                                                    return (
                                                        <TouchableNativeFeedback
                                                            background={TouchableNativeFeedback.Ripple('rgba(0, 0, 0, 0.4)', false)}
                                                            onPress={() => {
                                                                //
                                                                if (infiniteLoop)
                                                                    infiniteLoop.reset()
                                                                //
                                                                rotateAnimation[index].setValue(0)
                                                                //
                                                                infiniteLoop = startAnimation(index)
                                                                infiniteLoop.start()
                                                                // Animated.timing(rotateAnimation, {
                                                                //     toValue: 1,
                                                                //     duration: 1500,
                                                                //     easing: Easing.linear,
                                                                //     useNativeDriver: true
                                                                // }).start()
                                                                //
                                                                props.onChipPress(item.value, index)
                                                            }}>
                                                            <View style={{ width: 30, height: 30, alignItems: 'center', justifyContent: 'center' }}>

                                                                <Animated.View

                                                                    //source={item.image}
                                                                    style={[{
                                                                        transform: [{
                                                                            rotate: rotateAnimation[index].interpolate({
                                                                                inputRange: [0, 1],
                                                                                outputRange: ['0deg', '360deg']
                                                                            })
                                                                        }],
                                                                        width: '100%',
                                                                        height: '100%',
                                                                        backgroundColor: colors.LIME_GEEEN,
                                                                        borderRadius: 50,
                                                                        alignItems: "center",
                                                                        justifyContent: "center"
                                                                    }]} >
                                                                    <Text style={[styles.titleStyle, { color: '#C12607', textAlign: "center", marginLeft: 0, fontSize: normalize(6) }]}>{`${item.value}`}</Text>
                                                                </Animated.View>
                                                            </View>
                                                        </TouchableNativeFeedback>
                                                    )
                                                })
                                            }
                                        </View>
                                    }
                                    {
                                        props.isActionButton &&
                                        <View style={{ flexDirection: "row", justifyContent: "flex-end", marginLeft: 10 }}>
                                            <TouchableNativeFeedback
                                                background={TouchableNativeFeedback.Ripple('rgba(0, 0, 0, 0.4)', false)}
                                                onPress={() => {
                                                    if (infiniteLoop)
                                                        infiniteLoop.reset()
                                                    //
                                                    props.okayPress()
                                                }}>
                                                <View style={{ backgroundColor: '#5560F7', alignItems: "center", justifyContent: "center", borderRadius: 5, width: 70 }}>
                                                    <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontSize: normalize(6), fontWeight: "800", color: colors.WHITE }}>Ok</Text>
                                                </View>
                                            </TouchableNativeFeedback>
                                            <TouchableNativeFeedback
                                                background={TouchableNativeFeedback.Ripple('rgba(0, 0, 0, 0.4)', false)}
                                                onPress={() => {
                                                    if (infiniteLoop)
                                                        infiniteLoop.reset()
                                                    //
                                                    props.cancelPress()
                                                }}>
                                                <View style={{ backgroundColor: colors.GRAY_SHADE_01, alignItems: "center", justifyContent: "center", width: 80, marginLeft: 5, borderRadius: 5 }}>
                                                    <Text style={{ fontFamily: fonts.POPPINS_REGULAR, fontSize: normalize(6), fontWeight: "800", color: colors.BLACK_SHADE_03 }}>Clear</Text>
                                                </View>
                                            </TouchableNativeFeedback>
                                        </View>
                                    }
                                    {
                                        props.isDashbaord &&
                                        <View style={{ flexDirection: 'row' }}>
                                            <TouchableOpacity onPress={() => { RootNavigation.navigate('Notification') }}>
                                                <Image source={notification} tintColor={colors.WHITE} resizeMode="contain" style={{ width: 20, height: 20, marginRight: 15, }} />
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => { RootNavigation.navigate('BalanceStatus') }}>
                                                <Image source={wallet_user} tintColor={colors.WHITE} resizeMode="contain" style={{ width: 20, height: 20 }} />
                                                <Text style={{
                                                    fontFamily: fonts.MONTSERRAAT_MEDIUM,
                                                    fontWeight: '600',
                                                    textAlign: 'center',
                                                    fontSize: normalize(10),
                                                    color: colors.WHITE,
                                                    marginLeft: 2,
                                                    paddingTop: 5,
                                                    marginRight: 15,
                                                }}>{props?.totalBalance}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => { RootNavigation.navigate('UserProfile') }}>
                                                <Image source={profile_user} tintColor={colors.WHITE} resizeMode="contain" style={{ width: 20, height: 20 }} />
                                            </TouchableOpacity>
                                        </View>
                                    }
                                </View>
                            </View>
                            : null

                    }


                    <SafeAreaView
                        style={styles.safeViewStyle}
                        edges={['right']}>
                        {
                            props?.isFromHome &&
                            <Image source={wave_top} resizeMode="cover" style={{ width: '100%', height: 70 }} />
                        }
                        <WrappedComponent {...props}>
                            {children}
                        </WrappedComponent>
                    </SafeAreaView>
                </>
            )
        }
    }
    return Wrapped;
};
//['top', 'bottom']edges={['left', 'right']}>
const styles = StyleSheet.create({
    safeViewStyle: {
        flex: 1,
        backgroundColor: colors.GRAY_SHADE_01,
    },
    titleStyle: {
        fontFamily: fonts.MONTSERRAAT_MEDIUM,
        fontWeight: '600',
        textAlign: 'center',
        fontSize: normalize(13),
        color: colors.LIME_GEEEN,
        marginLeft: 15,
        textAlignVertical: 'top',
        paddingBottom: 5

    }
})

export default HeaderComponent;