import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PlaySound from '../../PlaySound';
import ListingEditScreen from '../screens/ListingEditScreen';
import ComboNavigator from './ComboNavigator';
import AccountNavigator from './AccountNavigator';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Combo" component={ComboNavigator} />
            <Tab.Screen name="ListingEdit" component={ListingEditScreen} />
            <Tab.Screen name="SearchScreen" component={PlaySound} />
            <Tab.Screen name="Account" component={AccountNavigator} />
        </Tab.Navigator>
    );
}

export default AppNavigator;