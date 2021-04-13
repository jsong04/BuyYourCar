import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyListingScreen from '../screens/MyListingScreen';
import ListingDetailScreen from '../screens/ListingDetailScreen';

const Stack = createStackNavigator();

const ComboMyListNavigator = () => {
    return (
        <Stack.Navigator mode="modal">
            <Stack.Screen name="MyListings" component={MyListingScreen} options={{headerShown: false}} />
            <Stack.Screen name="ListingDetails" component={ListingDetailScreen} options={{headerShown: false}} />
        </Stack.Navigator>
    );
}

export default ComboMyListNavigator;