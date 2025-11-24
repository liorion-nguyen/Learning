import { createStackNavigator } from '@react-navigation/stack';
import Home from '../app/(user)/home/Index';
import Login from '../app/auth/Login';
import SignUp from '../app/auth/SignUp';

const Stack = createStackNavigator();

const StackNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="SignIn" component={Login}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen name="SignUp" component={SignUp}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    )
}

export default StackNavigation;