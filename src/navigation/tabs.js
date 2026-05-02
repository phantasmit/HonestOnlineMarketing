import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Alert } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
//
import Dashboard from '../pages/dashboard';
import Calculator from '../pages/calculator';
//
import colors from '../assets/appColor/colors';
import fonts from '../assets/fonts/fonts';
import { normalize } from '../utils/normalize';
import CustomTabBarButton from './customTabBarButton';
import stacks from './stackEnum';
import { doLogout, changeStack, doLogoutFun } from './action';
import { store } from "../store/configureStore";
//
const Tab = createBottomTabNavigator();
const Tabs = () => {
    const dispatch = useDispatch();
    const userData = store.getState().StackReducer.userData;
    return (
        <Tab.Navigator
            hideNavbar={true}
            screenOptions={({ route }) => ({
                headerShown: false,
                gestureEnabled: false,
                //tabBarShowLabel: false,
                tabBarIcon: ({ color, size, focused }) => {
                    return null
                },
                tabBarStyle: {
                    backgroundColor: colors.WHITE,
                    bottom: 0,
                    height: 80,
                    shadowColor: colors.BLACK_SHADE,
                    shadowOffset: { width: 1, height: 2 },
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    elevation: 5,
                    borderTopWidth: 0,
                    paddingTop: 15,
                },
                tabBarActiveTintColor: colors.BLACK_SHADE,
                tabBarInactiveTintColor: colors.GRAY_SHADE,

            })}
        >

            <Tab.Screen
                name="Dashboard"
                component={Dashboard}
                options={{
                    tabBarButton: props => <CustomTabBarButton {...props} icon={'dashboard'} />
                }}
            />
            <Tab.Screen
                name="Calculator"
                component={Calculator}
                options={{
                    tabBarButton: props => <CustomTabBarButton {...props} icon={'calculator'} />
                }}
            />
            <Tab.Screen
                name="Dashboard3"
                component={Dashboard}
                options={{
                    tabBarButton: props => <CustomTabBarButton {...props} icon={'logout'} onPress={() => {
                        Alert.alert('Logout', 'Are you sure you want to logout?', [
                            {
                                text: 'Cancel',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel',
                            },
                            {
                                text: 'OK', onPress: () => { }
                            },
                        ]);
                    }} />,
                    tabBarOnPress: ({ navigation, defaultHandler }) => {
                      
                    },
                }}
            />
            {/* <Tab.Screen
                name="Menu"
                component={Menu}
                options={{
                    tabBarButton: props => <CustomTabBarButton {...props} icon={'menu'} />
                }}
            /> */}
            {/* <Tab.Screen
                name="Logout"
                component={Dashboard}
                options={{
                    tabBarButton: props => <CustomTabBarButton {...props} icon={'logout'} onPress={() => {
                      
                    }} />,
                    tabBarOnPress: ({ navigation, defaultHandler }) => {
                        alert('test')
                    },
                }}
            /> */}
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    imageStyle: params => ({
        //tintColor: params ? 'blue' : 'gray',
        width: 25,
        height: 25
    }),
    textStyle: params => ({
        textAlign: 'center',
        color: params ? colors.BLACK_SHADE_02 : colors.GRAY_SHADE,
        fontFamily: fonts.POPPINS_REGULAR,
        fontWeight: '600',
        marginTop: 5,
        fontSize: normalize(11),
        //marginBottom: 5,
    })
})
//
export { Tabs };
