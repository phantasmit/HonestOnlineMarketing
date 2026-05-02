//import { createNativeStackNavigator } from "@react-navigation/native-stack";
//
import Login from "../pages/login";
import Register from "../pages/register";
import Splash from '../pages/splash';
//
//const Stack = createNativeStackNavigator();
//
const OnBoardStack = (Stack) => {
    return (
        <Stack.Group>
            <Stack.Screen name="SplashOnBoard" component={Splash} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            {/* <Stack.Screen name="EventList" component={EventList} /> */}
        </Stack.Group>
    )
}
//
export { OnBoardStack };