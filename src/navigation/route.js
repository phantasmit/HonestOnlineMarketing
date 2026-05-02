import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { navigationRef } from "./RootNavigation";
import stacks from "./stackEnum";
//

import { OnBoardStack } from './onboardStack';
//import { DrawerStack } from "./drawerStack";
import { AppStack } from "./appStack";
import { ModalStack } from "./modalStack";
//import { Tabs } from "./tabs";
import Dashboard from '../pages/dashboard';
import Splash from '../pages/splash';
//
const Stack = createNativeStackNavigator();
//
function RouteContainer() {
    const stackReducer = useSelector(state => state.StackReducer);
    //
    //console.log('stackReducer>> ', JSON.stringify(stackReducer.stack_name));
    //debugger;
    //
    return (
        <NavigationContainer
            ref={navigationRef}
        >
            {

                manageStack(stackReducer.stack_name)
            }
        </NavigationContainer>
    )
}

const manageStack = (stacks_option) => {
    switch (stacks_option) {
        case stacks.ON_BOARD_STACK:
            return (
                <Stack.Navigator
                    hideNavbar={true}
                    initialRouteName="Splash2"
                    screenOptions={{
                        headerShown: false,
                        gestureEnabled: false,
                        cardStyle: { backgroundColor: 'transparent' },
                        cardOverlayEnabled: true,
                    }}
                >
                    <Stack.Screen name="Splash2" component={Splash} />
                    {
                        ModalStack(Stack)
                    }
                    {
                        OnBoardStack(Stack)
                    }
                </Stack.Navigator>
            )

        case stacks.APP_STACK:
            return (
                <Stack.Navigator
                    ref={navigationRef}
                    hideNavbar={true}
                    initialRouteName="Splash"
                    screenOptions={{ headerShown: false, gestureEnabled: false, cardOverlayEnabled: false, backgroundColor: 'transparent' }}>
                    <Stack.Screen name="Splash" component={Splash} />
                    {
                        ModalStack(Stack)
                    }
                    {
                        AppStack(Stack)
                    }
                </Stack.Navigator>
            )
    }
}
//
export default RouteContainer;