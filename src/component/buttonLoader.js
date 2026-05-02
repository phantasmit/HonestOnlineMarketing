import { TouchableOpacity, Image, Text, View, ActivityIndicator } from 'react-native';
import fonts from '../assets/fonts/fonts';
import colors from '../assets/appColor/colors';
import { normalize } from '../utils/normalize';
import { gray_bg_t } from '../utils/images';
//
const ButtonLoader = (props) => {

    return (
        <>
            {
                {
                    true:
                        <View style={[{ width: '85%', alignItems: 'center', justifyContent: 'center', height: 50, marginVertical: 30,backgroundColor:"#C12607" }, props.loaderStyle]}>
                            {/* <Image source={gray_bg_t} resizeMode="contain" style={{ width: '100%', height: '100%' }} /> */}
                            <ActivityIndicator size="small" color={colors.WHITE} style={{ position: 'absolute' }} />
                        </View>,
                    false:
                        <TouchableOpacity
                            onPress={props.onPress}
                            style={[{ width: '85%', alignItems: 'center', justifyContent: 'center', height: 50, marginVertical: 30 }, props.style]}>
                            {/* {
                                (!props.isGray) ?
                                    <Image source={button_bg} resizeMode="cover" style={{ width: '100%', height: '100%', borderRadius: 10 }} />
                                    :
                                    <Image source={gray_bg} resizeMode="cover" style={{ width: '100%', height: '100%', borderRadius: 10 }} />
                            } */}
                            {/* <Image source={gray_bg_t} resizeMode="cover" style={{ width: '100%', height: '100%', borderRadius: 10 }} /> */}
                            <Text style={[{
                                fontFamily: fonts.POPPINS_REGULAR,
                                fontWeight: '700',
                                fontSize: normalize(14),
                                color: colors.WHITE,
                                position: 'absolute'
                            }, props.textStyle]}>
                                {props.title}
                            </Text>
                        </TouchableOpacity>
                }[props.isLoading]
            }
        </>
    )
}

export default ButtonLoader;