import { createStackNavigator } from '@react-navigation/stack';
import Login from '../app/auth/Login';
import SignUp from '../app/auth/SignUp';
import Home from '../app/(user)/home/Index';

const Stack = createStackNavigator();

const StackNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="SignIn" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    )
}

export default StackNavigation;