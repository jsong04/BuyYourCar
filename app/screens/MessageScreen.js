import React, { useState } from 'react';
import { FlatList, View, SafeAreaView, StyleSheet, Platform, StatusBar } from 'react-native';

import ListItem from '../components/ListItem';
import ListItemDeleteAction from '../components/ListItemDeleteAction';
import ListItemSeparator from '../components/ListItemSeparator';
import Screen from '../components/Screen';

const initialMessages = [
    {
        id: 1,
        title: 'Civic 2017 do you want it?',
        description: 'Hi, I would like to sell my car',
        image: require('../assets/avatar.png')
    },
    {
        id: 2,
        title: 'New BMW M6 lowest price on Internet',
        description: 'Fairfax, Virginia',
        image: require('../assets/miaowazhongzi.jpg')
    },
    {
        id: 3,
        title: 'Jeep 120,000 miles',
        description: '$3599',
        image: require('../assets/huge.jpg')
    }
];

function MessageScreen(props) {
    const [messages, setMessages] = useState(initialMessages);
    const [refreshing, setRefreshing] = useState(false);

    const handleDelete = message => {
        const newMessages = messages.filter(m => m.id !== message.id);
        setMessages(newMessages);
    }


    return (
        <Screen>
            <FlatList data={messages} keyExtractor={(message) => message.id.toString()} renderItem={({item}) => <ListItem 
            title={item.title} 
            subTitle={item.description} 
            image={item.image}
            onPress={() => console.log("Message selected")}
            renderRightActions={() => <ListItemDeleteAction onPress={() => handleDelete(item)} />} />} 
            ItemSeparatorComponent={ListItemSeparator}
            refreshing={refreshing}
            onRefresh={() => {
                setMessages([
                    {
                        id: 1,
                        title: 'T1',
                        description: 'D1',
                        image: require('../assets/me.jpg')
                    },
                ])
            }} />
        </Screen>
    );
}

const styles = StyleSheet.create({
    
})

export default MessageScreen;