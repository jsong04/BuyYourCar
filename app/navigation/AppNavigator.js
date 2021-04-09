import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PlaySound from '../../PlaySound';
import ListingEditScreen from '../screens/ListingEditScreen';
import ComboNavigator from './ComboNavigator';
import AccountNavigator from './AccountNavigator';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
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
                component={PlaySound} 
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