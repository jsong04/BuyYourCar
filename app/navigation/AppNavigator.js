import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PlaySound from '../../PlaySound';
import AccountScreen from '../screens/AccountScreen';
import ListingEditScreen from '../screens/ListingEditScreen';
import ListingsScreen from '../screens/ListingsScreen';
import ComboNavigator from './ComboNavigator';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Combo" component={ComboNavigator} />
            <Tab.Screen name="ListingEdit" component={ListingEditScreen} />
            <Tab.Screen name="SearchScreen" component={PlaySound} />
            <Tab.Screen name="Account" component={AccountScreen} />
        </Tab.Navigator>
    );
}

export default AppNavigator;