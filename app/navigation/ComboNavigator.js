import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ListingsScreen from '../screens/ListingsScreen';
import ListingDetailScreen from '../screens/ListingDetailScreen';

const Stack = createStackNavigator();

const ComboNavigator = () => {
    return (
        <Stack.Navigator mode="modal">
            <Stack.Screen name="Listings" component={ListingsScreen} options={{headerShown: false}} />
            <Stack.Screen name="ListingDetails" component={ListingDetailScreen} options={{headerShown: false}} />
        </Stack.Navigator>
    );
}

export default ComboNavigator;