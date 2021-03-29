import React, { useState } from 'react';
import { FlatList, View, SafeAreaView, StyleSheet, Platform, StatusBar } from 'react-native';

import ListItem from '../components/ListItem';
import ListItemDeleteAction from '../components/ListItemDeleteAction';
import ListItemSeparator from '../components/ListItemSeparator';
import Screen from '../components/Screen';

const initialMessages = [
    {
        id: 1,
        title: 'T1',
        description: 'D1',
        image: require('../assets/me.jpg')
    },
    {
        id: 2,
        title: 'T2',
        description: 'D2',
        image: require('../assets/me.jpg')
    },
    {
        id: 3,
        title: 'T3',
        description: 'D3',
        image: require('../assets/me.jpg')
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