import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

import AppText from '../components/AppText';
import ListItem from '../components/ListItem';
import colors from '../config/colors';

function ListingDetailScreen(props) {
    const orderImage = Image.resolveAssetSource(require('../assets/civic.jpg'));
    console.info(orderImage);
    let windowWidth = Dimensions.get('window').width;
    let windowHeight = Dimensions.get('window').height;
    let ratio = windowWidth / windowHeight;
    
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('../assets/civic.jpg')}/>
            <View style={styles.detailContainer}>
                <AppText style={styles.title}>Civic model 2013</AppText>
                <AppText style={styles.price}>$12999</AppText>
                <View style={styles.userContainer}>
                    <ListItem image={require('../assets/me.jpg')} title="Jingzheng" subTitle="甩卖" />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    detailContainer: {
        padding: 20
    },
    image: {
        width: '100%',
        height: 300,
    },
    price: {
        color: colors.secondary,
        fontWeight: 'bold',
        fontSize: 20,
        marginVertical: 10
    },
    title: {
        fontSize: 24,
        fontWeight: '500'
    },
    userContainer: {
        marginVertical: 30
    }
})

export default ListingDetailScreen;