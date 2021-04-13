import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import Screen from '../components/Screen';
import Card from '../components/Card';

import colors from '../config/colors';
import listingsApi from '../api/listings';
import axios from 'axios';
import Constants from 'expo-constants';
import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import useApi from '../hooks/useApi';
const { manifest } = Constants;

// const listings = [
//     {
//         id: 1,
//         title: "Audi",
//         price: 39999,
//         image: require('../assets/Audi_R8.jpg')
//     },
//     {
//         id: 2,
//         title: "Civic",
//         price: 12999,
//         image: require('../assets/civic.jpg')
//     }
// ];

function ListingsScreen({ navigation }) {
    // const [listings, setListings] = useState([]);
    // const [error, setError] = useState(false);
    // const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { data: listings, error, loading, request: load } = useApi(listingsApi.getListings);

    useEffect(() => {
        load();
    }, []);

    // const load = async () => {
    //     setLoading(true);
    //     const res = await listingsApi.getListings();
    //     if (!res.ok) return setError(true);
    //     setError(false);
    //     // const res = await axios.get("http://192.168.1.4:7000/api/listings");
    //     setLoading(false);
    //     if (res) {
    //         console.log(res);
    //         setListings(res.data);
    //     }
    // }

    return (
        <Screen style={styles.screen}>
            {error && <>
                <AppText>No Internet Connection</AppText>
                <AppButton title="Reload" onPress={load} />
            </>}
            <ActivityIndicator animating={loading} size="large"/>
            <FlatList 
                showsVerticalScrollIndicator={false} 
                data={listings} 
                keyExtractor={listing => listing.id.toString()} 
                refreshing={isLoading}
                onRefresh={load}
                renderItem={({ item }) => {
                return <Card 
                        title={item.title} 
                        subTitle={"$" + item.price} 
                        imageUrl={item.images[0].url}
                        onPress={() => navigation.navigate("ListingDetails", item)}
                          />
            }} />
        </Screen>
    );
}

const styles = StyleSheet.create({
    screen: {
        padding: 20,
        backgroundColor: colors.light
    }
})

export default ListingsScreen;