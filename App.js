import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView, Button, Image } from 'react-native';
import AppButton from './app/components/AppButton';
import ViewImageScreen from './app/screens/ViewImageScreen';
import WelcomeScreen from './app/screens/WelcomeScreen';
import Card from './app/components/Card';
import ListingDetailScreen from './app/screens/ListingDetailScreen';
import MessageScreen from './app/screens/MessageScreen';
import Screen from './app/components/Screen';
import Icon from './app/components/Icon';
import ListItem from './app/components/ListItem';
import AccountScreen from './app/screens/AccountScreen';
import ListingsScreen from './app/screens/ListingsScreen';
import ListingEditScreen from './app/screens/ListingEditScreen';
import LoginScreen from './app/screens/LoginScreen';
import AppTextInput from './app/components/AppTextInput';
import Form from './Form';
import Login from './Login';
import Main from './Main';
import Signup from './Signup';
import PlaySound from './PlaySound';
import RecordSound from './RecordSound';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import ImageInput from './app/components/ImageInput';
import ImageInputList from './app/components/ImageInputList';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './app/navigation/AuthNavigator';
import SignupScreen from './app/screens/SignupScreen';


export default function App() {
  return (
    // <NavigationContainer>
    //   <AuthNavigator />
    // </NavigationContainer>
    <SignupScreen />
  );
}