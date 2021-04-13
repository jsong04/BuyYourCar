import React, { useContext } from 'react';
import {View, StyleSheet, FlatList } from 'react-native';
import AuthContext from '../auth/context';
import authStorage from '../auth/storage';
import Icon from '../components/Icon';
import ListItem from '../components/ListItem';
import ListItemSeparator from '../components/ListItemSeparator';
import Screen from '../components/Screen';

import colors from '../config/colors';

const menuItems = [
    {
        title: "Recommendations",
        icon: {
            name: "format-list-bulleted",
            backgroundColor: colors.primary
        },
        targetScreen: "MyListings"
    },
    {
        title: "My Messages",
        icon: {
            name: "email",
            backgroundColor: colors.secondary
        },
        targetScreen: "Messages"
    },
    {
        title: "Pay",
        icon: {
            name: "credit-card",
            backgroundColor: "#00fa9a",
        },
        targetScreen: "Pay"
    },
    {
        title: "Settings",
        icon: {
            name: "account-settings",
            backgroundColor: colors.medium
        },
        targetScreen: "Settings"
    }
]

function AccountScreen({ navigation }) {
    const { user, setUser } = useContext(AuthContext);

    const handleLogOut = () => {
        setUser(null);
        authStorage.removeToken();
    }
    return (
        <Screen style={styles.screen}>
            <View style={styles.container}>
                <ListItem title={user.name} subTitle={user.email} image={require('../assets/me.jpg')} onPress={() => console.log("presses")} />
            </View>
            <View style={styles.container}>
                <FlatList 
                    data={menuItems} 
                    ItemSeparatorComponent={ListItemSeparator} 
                    keyExtractor={menuItem => menuItem.title} 
                    renderItem={({ item }) => {
                    return <ListItem 
                                onPress={() => navigation.navigate(item.targetScreen)}
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
            />}
            onPress={handleLogOut} />
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