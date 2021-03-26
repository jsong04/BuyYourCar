import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import colors from '../config/colors';

function ViewImageScreen(props) {
    return (
        <View style={styles.container}>
            <View style={styles.closeIcon}></View>
            <View style={styles.deleteIcon}></View>
            <Image style={styles.image} source={require('../assets/Audi_R8.jpg')}/>
        </View>
    );
}

const styles = StyleSheet.create({
    closeIcon: {
        position: 'absolute',
        top: 40,
        left: 30,
        width: 50,
        height: 50,
        backgroundColor: colors.primary
    },
    container: {
        flex: 1,
        backgroundColor: colors.black
    },
    deleteIcon: {
        position: 'absolute',
        top: 40,
        right: 30,
        width: 50,
        height: 50,
        backgroundColor: colors.secondary
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    }
})

export default ViewImageScreen;