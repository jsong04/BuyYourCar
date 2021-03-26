import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppButton from './app/components/AppButton';
import ViewImageScreen from './app/screens/ViewImageScreen';
import WelcomeScreen from './app/screens/WelcomeScreen';
import Card from './app/components/Card';

export default function App() {
  return (
    <Card image={require('./app/assets/civic.jpg')} title="Civic 2013 model" subtitle="$12999"/>
  );
}

