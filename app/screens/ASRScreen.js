import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ActivityIndicator, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import FadeInView from '../components/search/FadeInView'
import { Audio } from 'expo-av';
import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';
import { InstantSearch } from 'react-instantsearch-native';
import algoliasearch from 'algoliasearch/lite';

import ASRConfig from '../config/ASRConfig';
import SearchBox from '../components/search/SearchBox'
import Hits from '../components/search/Hits';

const searchClient = algoliasearch(
    ASRConfig.ALGOLIA_APP_ID,
    ASRConfig.ALGOLIA_API_KEY,
);

const recordingOptions = {
    // android not currently in use. Not getting results from speech to text with .m4a
    // but parameters are required
    android: {
        extension: '.m4a',
        outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
        audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
        sampleRate: 44100,
        numberOfChannels: 2,
        bitRate: 128000,
    },
    ios: {
        extension: '.wav',
        audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
        // sampleRate: 44100,
        sampleRate: 16000,
        numberOfChannels: 1,
        bitRate: 128000,
        linearPCMBitDepth: 16,
        linearPCMIsBigEndian: false,
        linearPCMIsFloat: false,
    },
};

const ASRScreen = () => {
    const [recording, setRecording] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [query, setQuery] = useState('');

    useEffect(() => {
        Permissions.askAsync(Permissions.AUDIO_RECORDING);
    }, []);

    const deleteRecordingFile = async () => {
        try {
            const info = await FileSystem.getInfoAsync(recording.getURI());
            await FileSystem.deleteAsync(info.uri)
        } catch(error) {
            console.log("There was an error deleting recording file", error);
        }
    }

    const getTranscription = async () => {
        setIsFetching(true);
        try {
            console.log("recordingURI: ", recording.getURI());
            const info = await FileSystem.getInfoAsync(recording.getURI());
            console.log(`FILE INFO: ${JSON.stringify(info)}`);
            const uri = info.uri;
            const formData = new FormData();
            formData.append('file', {
                uri,
                type: 'audio/x-wav',
                name: 'speech2text'
            });
            const response = await fetch(ASRConfig.CLOUD_FUNCTION_URL, {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            console.log(data);
            setQuery(data.transcript);
        } catch(error) {
            console.log('There was an error reading file', error);
            stopRecording();
            resetRecording();
        }
        setIsFetching(false);
    }

    const startRecording = async () => {
        const { status } = await Permissions.getAsync(Permissions.AUDIO_RECORDING);
        if (status !== 'granted') return;

        setIsRecording(true);
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            playThroughEarpieceAndroid: true,
        });
        const recording = new Audio.Recording();

        try {
            await recording.prepareToRecordAsync(recordingOptions);
            await recording.startAsync();
        } catch (error) {
            console.log(error);
            stopRecording();
        }

        setRecording(recording);
    }

    const stopRecording = async () => {
        setIsRecording(false);
        try {
            await recording.stopAndUnloadAsync();
        } catch (error) {
            // Do nothing -- we are already unloaded.
        }
    }

    const resetRecording = () => {
        deleteRecordingFile();
        setRecording(null);
    };

    const handleOnPressIn = () => {
        startRecording();
    };

    const handleOnPressOut = () => {
        stopRecording();
        getTranscription();
    };

    const handleQueryChange = (query) => {
        setQuery(query);
    };

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>
                {isRecording &&
                    <FadeInView>
                        <FontAwesome name="microphone" size={32} color="#48C9B0" />
                    </FadeInView>
                }
                {!isRecording &&
                    <FontAwesome name="microphone" size={32} color="#48C9B0" />
                }
                <Text>Voice Search</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPressIn={handleOnPressIn}
                    onPressOut={handleOnPressOut}
                >
                    {isFetching && <ActivityIndicator color="#ffffff" />}
                    {!isFetching && <Text>Hold for Voice Search</Text>}
                </TouchableOpacity>
            </View>
            <View style={{paddingHorizontal: 20}}>
                <InstantSearch
                    indexName={ASRConfig.ALGOLIA_INDEX}
                    searchClient={searchClient}
                >
                    <SearchBox query={query} onChange={handleQueryChange} />
                    <Hits filter={query} />
                    {/* <FlatList /> */}
                </InstantSearch>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#48C9B0',
        paddingVertical: 20,
        width: '90%',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 20,
    }
});

export default ASRScreen;
