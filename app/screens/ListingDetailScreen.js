import React, { useContext } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

import AuthContext from '../auth/context';
import AppText from '../components/AppText';
import ListItem from '../components/ListItem';
import colors from '../config/colors';

function ListingDetailScreen({ route }) {
    const { user, setUser } = useContext(AuthContext);
    const orderImage = Image.resolveAssetSource(require('../assets/civic.jpg'));
    console.info(orderImage);
    let windowWidth = Dimensions.get('window').width;
    let windowHeight = Dimensions.get('window').height;
    let ratio = windowWidth / windowHeight;

    const listing = route.params;
    
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{uri: listing.images[0].url}}/>
            <View style={styles.detailContainer}>
                <AppText style={styles.title}>{listing.title}</AppText>
                <AppText style={styles.price}>${listing.price}</AppText>
                <View style={styles.userContainer}>
                    <ListItem image={require('../assets/me.jpg')} title={user.name} subTitle={"budget: " + user.budget} />
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