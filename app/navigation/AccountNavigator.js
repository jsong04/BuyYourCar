import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AccountScreen from '../screens/AccountScreen';
import MessageScreen from '../screens/MessageScreen';
// import MyListingScreen from '../screens/MyListingScreen';
import ComboMyListNavigator from './ComboMyListNavigator';

const Stack = createStackNavigator();

const AccountNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Account" component={AccountScreen} options={{headerShown: false}} />
            <Stack.Screen name="Messages" component={MessageScreen} options={{headerShown: false}} />
            <Stack.Screen name="MyListings" component={ComboMyListNavigator} options={{headerShown: false}} />
        </Stack.Navigator>
    );
}

export default AccountNavigator;