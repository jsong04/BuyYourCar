import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {  Button,StyleSheet, Text, View } from 'react-native';
import Login from './Login';
export default function Form({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Main App.js!</Text>
      <StatusBar style="auto" />
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate('Login')}
      />
      <Button
        title="Go to Main page"
        onPress={() => navigation.navigate('Main')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
});
