//

import Program from '../pages/program';
import History from '../pages/history';
import AllDraw from '../pages/allDraw';
import HistoryDetail from '../pages/historyDetail';
import ChangePassword from '../pages/changePassword';
import ProgramSelection from '../pages/programSelection';
import UserProfile from '../pages/userProfile';
import Notification from '../pages/notificaion';
import Support from '../pages/support';
import Dashboard from '../pages/dashboard';
//
const AppStack = (Stack) => {
    return (
        <Stack.Group
            screenOptions={{
                headerShown: false,
                gestureEnable: true,
            }}
        >
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="Program" component={Program} />
            <Stack.Screen name="History" component={History} />
            <Stack.Screen name="AllDraw" component={AllDraw} />
            <Stack.Screen name="HistoryDetail" component={HistoryDetail} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} />
            <Stack.Screen name="ProgramSelection" component={ProgramSelection} />
            <Stack.Screen name="UserProfile" component={UserProfile} />
            <Stack.Screen name="Notification" component={Notification} />
            <Stack.Screen name="Support" component={Support} />
        </Stack.Group>
    )
}

export { AppStack };