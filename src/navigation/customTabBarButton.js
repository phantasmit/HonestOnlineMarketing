import { TouchableOpacity, Image, View, Text, StyleSheet } from 'react-native';
import { home_o2, logout, calculator } from '../utils/images';
import fonts from '../assets/fonts/fonts';
import colors from '../assets/appColor/colors';
import { normalize } from '../utils/normalize';
//
const imageArray = {
    "dashboard": home_o2,
    "calculator": calculator,
    "logout": logout
}
//
const CustomTabBarButton = (props) => {
    const { children, accessibilityState, onPress, accessibilityLabel, icon = "" } = props;
    const lableName = icon;
    //
    if (accessibilityState.selected) {
        return (
            <TouchableOpacity onPress={onPress} style={styles.activeButtonStyle}>
                <Image
                    source={imageArray[lableName.toLowerCase()]}
                    resizeMode='contain'
                    tintColor={colors.SELECTED_TAB_COLOR}
                    style={{ width: 30, height: 30 }}
                />
            </TouchableOpacity>
        )
    } else {
        return (
            <TouchableOpacity onPress={onPress} style={styles.activeButtonStyle}>
                <Image
                    source={imageArray[lableName.toLowerCase()]}
                    resizeMode='contain'
                    style={{ width: 25, height: 25 }}
                />
            </TouchableOpacity>
        )
    }
}



export default CustomTabBarButton;

const styles = StyleSheet.create({
    activeButtonStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        paddingBottom: 10
    },
    inActiveButtonStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        paddingBottom: 10
    }
})