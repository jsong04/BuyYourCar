import React from 'react';
import { ImageBackground, StyleSheet, View, Image, Text } from 'react-native';

import AppButton from '../components/AppButton';

function WelcomeScreen(props) {
    return (
        <ImageBackground blurRadius={5} style={styles.background} source={require('../assets/background.jpg')}>
            <View style={styles.logoContainer}>
                <Image source={require('../assets/logo.jpg')} style={styles.logo}/>
                <Text style={styles.tagline}>The Best Online Car Platform</Text>
            </View>
            <View style={styles.buttonContainer}>
                <AppButton title="Login"/>
                <AppButton title="Register" color="secondary"/>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        resizeMode: 'cover'
    },
    buttonContainer: {
        padding: 20,
        width: '100%'
    },
    logo: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    logoContainer: {
        position: 'absolute',
        top: 70,
        alignItems: 'center'
    },
    tagline: {
        fontSize: 25,
        fontWeight: "600",
        paddingVertical: 20
    }
})

export default WelcomeScreen;