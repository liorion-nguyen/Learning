import { createStackNavigator } from '@react-navigation/stack';
import Login from '../app/auth/Login';
import SignUp from '../app/auth/SignUp';

const Stack = createStackNavigator();

const StackNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="SignIn" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
    )
}

export default StackNavigation;