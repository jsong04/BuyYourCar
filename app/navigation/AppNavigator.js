import React, { useEffect } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions';
import ASRScreen from '../screens/ASRScreen';
import ListingEditScreen from '../screens/ListingEditScreen';
import ComboNavigator from './ComboNavigator';
import AccountNavigator from './AccountNavigator';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {

    useEffect(() => {
        registerForPushNotifications();
    }, []);

    const registerForPushNotifications = async () => {
        try {
            const permission = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            if (!permission.granted) return;
            const token = await Notifications.getExpoPushTokenAsync();
            console.log("token", token);
        } catch (error) {
            console.log("Error getting a push token", error);
        }
    }
    return (
        <Tab.Navigator>
            <Tab.Screen 
                name="Main" 
                component={ComboNavigator} 
                options={{
                    tabBarIcon: ({ color, size}) => <MaterialCommunityIcons 
                                        name="home" color={color} size={size} />
                }} 
            />
            <Tab.Screen 
                name="Sell" 
                component={ListingEditScreen}
                options={{
                    tabBarIcon: ({ color, size}) => <MaterialCommunityIcons 
                                        name="cash-usd" color={color} size={size} />
                }} 
            />
            <Tab.Screen 
                name="Search" 
                component={ASRScreen} 
                options={{
                    tabBarIcon: ({ color, size}) => <MaterialCommunityIcons 
                                        name="search-web" color={color} size={size} />
                }} 
            />
            <Tab.Screen 
                name="Account" 
                component={AccountNavigator} 
                options={{
                    tabBarIcon: ({ color, size}) => <MaterialCommunityIcons 
                                        name="account" color={color} size={size} />
                }} 
            />
        </Tab.Navigator>
    );
}

export default AppNavigator;