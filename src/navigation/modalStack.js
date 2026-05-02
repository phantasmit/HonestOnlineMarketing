import { CardStyleInterpolators, TransitionPresets } from '@react-navigation/stack';
import CheckModal from '../modal/checkModal';
import DhamakaView from '../modal/dhamakaView';
import CameraOption from '../modal/cameraOption';
import CreateSupport from '../modal/createSupport';
import ViewMoreSupport from '../modal/viewMoreSupport';
import FullImageView from '../modal/fullImageView';
import BalanceModal from '../modal/balanceModal';
import BalanceStatus from '../modal/balanceStatus';
import ErrorPage from '../modal/errorPage';
import AlertModal from '../modal/alertModal';
//
const ModalStack = (Stack) => {
    return (
        <Stack.Group
            screenOptions={{
                headerShown: false,
                presentation: 'transparentModal',
                gestureEnable: true
            }}
        >

            <Stack.Screen name="CheckModal" component={CheckModal}
                options={{
                    headerShown: false,
                    presentation: 'transparentModal',
                    animationEnabled: true,
                    contentStyle: {
                        backgroundColor: 'rgba(0,0,0,0.7)'
                    },
                    gestureEnabled: true,
                }} />
            <Stack.Screen name="DhamakaView" component={DhamakaView}
                options={{
                    headerShown: false,
                    presentation: 'transparentModal',
                    animationEnabled: true,
                    contentStyle: {
                        backgroundColor: 'rgba(0,0,0,0.7)'
                    },
                    gestureEnabled: true,
                }} />
            <Stack.Screen name="CameraOption" component={CameraOption}
                options={{
                    headerShown: false,
                    presentation: 'transparentModal',
                    animationEnabled: true,
                    contentStyle: {
                        backgroundColor: 'rgba(0,0,0,0.7)'
                    },
                    gestureEnabled: true,
                }} />
            <Stack.Screen name="CreateSupport" component={CreateSupport}
                options={{
                    headerShown: false,
                    presentation: 'transparentModal',
                    animationEnabled: true,
                    contentStyle: {
                        backgroundColor: 'rgba(0,0,0,0.7)'
                    },
                    gestureEnabled: true,
                }} />
            <Stack.Screen name="ViewMoreSupport" component={ViewMoreSupport}
                options={{
                    headerShown: false,
                    presentation: 'transparentModal',
                    animationEnabled: true,
                    contentStyle: {
                        backgroundColor: 'rgba(0,0,0,0.7)'
                    },
                    gestureEnabled: true,
                }} />
            <Stack.Screen name="FullImageView" component={FullImageView}
                options={{
                    headerShown: false,
                    presentation: 'transparentModal',
                    animationEnabled: true,
                    contentStyle: {
                        backgroundColor: 'rgba(0,0,0,0.7)'
                    },
                    gestureEnabled: true,
                }} />
            <Stack.Screen name="BalanceModal" component={BalanceModal}
                options={{
                    headerShown: false,
                    presentation: 'transparentModal',
                    animationEnabled: true,
                    contentStyle: {
                        backgroundColor: 'rgba(0,0,0,0.7)'
                    },
                    gestureEnabled: true,
                }} />
            <Stack.Screen name="BalanceStatus" component={BalanceStatus}
                options={{
                    headerShown: false,
                    presentation: 'transparentModal',
                    animationEnabled: true,
                    contentStyle: {
                        backgroundColor: 'rgba(0,0,0,0.7)'
                    },
                    gestureEnabled: true,
                }} />
            <Stack.Screen name="ErrorPage" component={ErrorPage}
                options={{
                    headerShown: false,
                    presentation: 'transparentModal',
                    animationEnabled: true,
                    contentStyle: {
                        backgroundColor: 'rgba(0,0,0,0.7)'
                    },
                    gestureEnabled: true,
                }} />
            <Stack.Screen name="AlertModal" component={AlertModal}
                options={{
                    headerShown: false,
                    presentation: 'transparentModal',
                    animationEnabled: true,
                    contentStyle: {
                        backgroundColor: 'rgba(0,0,0,0.7)'
                    },
                    gestureEnabled: true,
                }} />

        </Stack.Group>
    )
}

export { ModalStack };