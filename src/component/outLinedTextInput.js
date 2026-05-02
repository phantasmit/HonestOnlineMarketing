import { TextInput, HelperText } from 'react-native-paper';
import fonts from '../assets/fonts/fonts';
import { Text, Image } from 'react-native';
import colors from '../assets/appColor/colors';
import { normalize } from '../utils/normalize';
//
const OutLinedTextInput = (props) => {

    return (
        <>
            <TextInput
                label={
                    <Text style={[{
                        backgroundColor: colors.WHITE,
                        fontFamily: fonts.POPPINS_REGULAR,
                        fontWeight: '700',
                        fontSize: normalize(12),
                        color: colors.LIGHT_GRAY
                    }, props.lableStyle]}>
                        {`   ${props.label}  `}
                    </Text>
                }
                value={props.value}
                onChangeText={props.onChangeText}
                onBlur={props.onBlur}
                onPress={props.onPress}
                mode='outlined'
                disabled={props.disabled}
                editable={props.editable}
                autoCapitalize='none'
                placeholder={props.placeholder}
                multiline={props.multiline}
                maxLength={props.maxLength}
                onKeyPress={props.onKeyPress}
                keyboardType={props.keyboardType}
                style={[
                    {
                        color: colors.LIGHT_BLACK,
                        backgroundColor: 'transparent',
                        width: '100%',
                        flex:1,
                        textAlign:"left",
                        paddingLeft:0,
                        fontFamily: fonts.POPPINS_REGULAR,
                        fontWeight: '400',
                        fontSize: normalize(12),
                    }, props.style]}
                outlineStyle={[{
                    borderRadius: 10,
                    borderColor: colors.BLACK_SHADE,
                    borderWidth: 1
                },props.outlineStyle]}
                secureTextEntry={props.secureTextEntry}
                underlineColorAndroid='transparent'
                inputMode={props.inputMode}
                right={
                    <TextInput.Icon
                        onPress={props.onPress}
                        color="transparent"
                        style={{ activeOpacity: 1 }}
                        icon={() => {
                            return <Image tintColor={colors.GRAY_SHADE_LIGHT} activeOpacity={1.0} source={props.rightIcon} resizeMode='contain' style={{ width: 16, height: 16, marginTop: 6 }} />
                        }}
                    />
                }
                left={
                    (props?.leftIcon) &&
                    <TextInput.Icon
                        color="transparent"
                        style={{ activeOpacity: 1 }}
                        icon={() => {
                            return <Image tintColor={colors.GRAY_SHADE_LIGHT} activeOpacity={1.0} source={props.leftIcon} resizeMode='contain' style={{ width: 16, height: 16, marginTop: 0,paddingHorizontal:0,marginHorizontal:0 }} />
                        }}
                    />
                }
            />
            {
                props.visible &&
                <HelperText style={[{ width: '85%', alignSelf: 'center', color: colors.LIGHT_RED, fontFamily: fonts.POPPINS_REGULAR, fontWeight: '400', fontSize: normalize(10) }, props.errorStyle]} type="error" visible={props.visible}>
                    {props.error}
                </HelperText>
            }

        </>
    )
}

export default OutLinedTextInput;