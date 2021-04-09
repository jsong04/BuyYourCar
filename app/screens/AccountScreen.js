import React from 'react';
import {View, StyleSheet, FlatList } from 'react-native';
import Icon from '../components/Icon';
import ListItem from '../components/ListItem';
import ListItemSeparator from '../components/ListItemSeparator';
import Screen from '../components/Screen';

import colors from '../config/colors';

const menuItems = [
    {
        title: "My Listings",
        icon: {
            name: "format-list-bulleted",
            backgroundColor: colors.primary
        },
        targetScreen: "Messages"
    },
    {
        title: "My Messages",
        icon: {
            name: "email",
            backgroundColor: colors.secondary
        },
        targetScreen: "Messages"
    },
]

function AccountScreen({ navigation }) {
    return (
        <Screen style={styles.screen}>
            <View style={styles.container}>
                <ListItem title="Jingzheng" subTitle="song.jz@northeastern.edu" image={require('../assets/me.jpg')} onPress={() => console.log("presses")} />
            </View>
            <View style={styles.container}>
                <FlatList 
                    data={menuItems} 
                    ItemSeparatorComponent={ListItemSeparator} 
                    keyExtractor={menuItem => menuItem.title} 
                    renderItem={({ item }) => {
                    return <ListItem 
                                onPress={() => navigation.navigate("Messages")}
                                title={item.title} 
                                IconComponent={ <Icon name={item.icon.name} 
                                backgroundColor={item.icon.backgroundColor}
                        />} />
                    }} 
                />
            </View>
            <ListItem 
                title="Log Out" 
                IconComponent={<Icon name="logout" backgroundColor="#ffe66d"
            />} />
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
    },
    screen: {
        backgroundColor: colors.light
    }
})

export default AccountScreen;