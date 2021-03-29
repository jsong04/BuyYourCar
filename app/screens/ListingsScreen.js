import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import Screen from '../components/Screen';
import Card from '../components/Card';

import colors from '../config/colors';

const listings = [
    {
        id: 1,
        title: "Audi",
        price: 39999,
        image: require('../assets/Audi_R8.jpg')
    },
    {
        id: 2,
        title: "Civic",
        price: 12999,
        image: require('../assets/civic.jpg')
    }
];

function ListingsScreen(props) {
    return (
        <Screen style={styles.screen}>
            <FlatList data={listings} keyExtractor={listing => listing.id.toString()} renderItem={({ item }) => {
                return <Card title={item.title} subTitle={"$" + item.price} image={item.image}  />
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