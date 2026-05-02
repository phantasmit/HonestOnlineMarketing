import { View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Dimensions } from "react-native";
import { Tabs } from "./tabs";
//
import { DrawerOption } from './drawerOption';
// import PrivacyPolicy from '../pages/privacyPolicy';
// import Order from '../pages/order';
//
const Drawer = createDrawerNavigator();
//
const DrawerStack = () => {
    //
    return (
        <Drawer.Navigator
            headerMode="none"
            initialRouteName="Tabs"
            openByDefault={false}
            screenOptions={{
                drawerType: 'front',
                headerShown: false,
                gestureEnabled: true,
                swipeEnabled: true,
                drawerPosition: 'left',
                drawerStyle: {
                    overlayColor: "rgba(0 ,0 ,0, 0.5)",
                    width: Dimensions.get('window').width / 1.9 + 50,
                    backgroundColor: '#3C94FF'
                },
            }}
            drawerContent={() => <DrawerOption />}
        >
            <Drawer.Screen name="Tabs" component={Tabs} />
        </Drawer.Navigator>
    )
}

export { DrawerStack };