import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Image, Text } from 'react-native';
import { connectInfiniteHits } from 'react-instantsearch-native';

import listingsApi from '../../api/listings';
import filterListingsApi from '../../api/filteredListings';
import useApi from '../../hooks/useApi';
import axios from 'axios';

const Hits = connectInfiniteHits(({ hits, hasMore, refine, filter }) => {
    const { data: listings, error, loading, request: load } = useApi(listingsApi.getListings);
    const [filteredListings, setFilteredListings] = useState();

    const onEndReached = function() {
        if (hasMore) {
            refine();
        }
    };

    useEffect(() => {
        load();
    }, []);

    useEffect(() => {
        getFilteredListings();
    }, [filter])

    const getFilteredListings = async () => {
        // const res = await filterListingsApi.getFilteredListings(filter);
        console.log(filter);
        const res = await axios.get('http://172.22.112.53:7000/api/filteredListings?name=' + filter);
        console.log(res.data);
        setFilteredListings(res.data);
    }

    return (
        // <FlatList
        //     data={hits}
        //     onEndReached={onEndReached}
        //     keyExtractor={(item, index) => item.objectID}
        //     renderItem={({ item }) => {
        //         return (
        //             <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, }}>
        //                 <Image
        //                     style={{ height: 100, width: 100 }}
        //                     source={{ uri: item.image }}
        //                 />
        //                 <View style={{ flex: 1, marginLeft: 20, }}>
        //                     <Text>
        //                         {item.name}
        //                     </Text>
        //                     <Text>
        //                         {item.type}
        //                     </Text>
        //                 </View>
        //             </View>
        //         );
        //     }}
        // />
        <FlatList
            data={filter ? filteredListings : listings}
            onEndReached={onEndReached}
            keyExtractor={(item, index) => item.id.toString()}
            renderItem={({ item }) => {
                return (
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, }}>
                        <Image
                            style={{ height: 100, width: 100 }}
                            source={{ uri: item.images[0].url }}
                        />
                        <View style={{ flex: 1, marginLeft: 20, }}>
                            <Text>
                                {item.title}
                            </Text>
                            <Text>
                                {item.price}
                            </Text>
                        </View>
                    </View>
                );
            }}
        />
    );
});

export default Hits;
