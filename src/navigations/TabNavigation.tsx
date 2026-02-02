import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../app/(user)/profile/Index';
import Home from '../app/(user)/home/Index';
import { Ionicons } from '@expo/vector-icons';
import ChatBot from '../app/(user)/ai/Index';


const Tab = createBottomTabNavigator();

export const TabNavigation = () => {
    return (
        <Tab.Navigator
            screenOptions={
                ({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: string = '';

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    } else if (route.name === 'Chat') {
                        iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
                    }
                    return <Ionicons name={iconName as any} size={size} color={color} />;
                },
            })}
            >
            <Tab.Screen name="Home" component={Home} options={{ headerShown: false }}/>
            <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
            <Tab.Screen name="Chat" component={ChatBot} options={{ headerShown: false }}/>
        </Tab.Navigator>
    )
}