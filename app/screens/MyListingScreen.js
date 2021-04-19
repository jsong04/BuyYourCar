import React, { useState, useEffect, useContext } from 'react';
import { FlatList, View, SafeAreaView, StyleSheet, Platform, StatusBar, Button } from 'react-native';

import ListItem from '../components/ListItem';
import ListItemDeleteAction from '../components/ListItemDeleteAction';
import ListItemSeparator from '../components/ListItemSeparator';
import Screen from '../components/Screen';
import listingsApi from '../api/listings';
import useApi from '../hooks/useApi';
import AuthContext from '../auth/context';
import axios from 'axios';

const baseUrl = 'http://172.22.112.53:7000/api/';

function ListingScreen({ navigation }) {
    // const [listings, setListings] = useState();
    const { user, setUser } = useContext(AuthContext);
    const [filteredListings, setFilteredListings] = useState();
    const [refreshing, setRefreshing] = useState(false);

    const { data: listings, error, loading, request: load } = useApi(listingsApi.getListings);

    useEffect(() => {
        // load();
        getMyListings();
    }, []);

    const handleDelete = listing => {
        const newListings = filteredListings.filter(l => l.id !== listing.id);
        console.log(newListings);
        setFilteredListings(newListings);
    }

    const getMyListings = async () => {
        console.log(baseUrl + "recommendation?budget=" + user.budget);
        const res = await axios.get(baseUrl + "recommendation?budget=" + user.budget);
        console.log(res.data);
        res.data.sort(function(a,b) {
            return (a["title"].indexOf('BMW') >= 0 || a["title"].indexOf('Toyota') >= 0) ? -1 : 1;
        })
        setFilteredListings(res.data);
    }


    return (
        <Screen>
            <FlatList data={filteredListings} keyExtractor={(listing) => listing.id.toString()} renderItem={({item}) => <ListItem 
            title={item.title} 
            subTitle={item.price} 
            image={{uri:item.images[0].url}}
            onPress={() => navigation.navigate("ListingDetails", item)}
            renderRightActions={() => <ListItemDeleteAction onPress={() => handleDelete(item)} />} />} 
            ItemSeparatorComponent={ListItemSeparator}
            refreshing={refreshing}
            onRefresh={() => {
                getMyListings();
            }} />
        </Screen>
    );
}

const styles = StyleSheet.create({
    
})

export default ListingScreen;