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
import PlaySound from './PlaySound';
import RecordSound from './RecordSound';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import ImageInput from './app/components/ImageInput';
import ImageInputList from './app/components/ImageInputList';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './app/navigation/AuthNavigator';
import SignupScreen from './app/screens/SignupScreen';
import NavigationTheme from './app/navigation/navigationTheme';
import AppNavigator from './app/navigation/AppNavigator';
import AuthContext from './app/auth/context';
import authStorage from './app/auth/storage';
import jwtDecode from 'jwt-decode';
import AppLoading from 'expo-app-loading';


export default function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);
  
  const restoreToken = async () => {
    const token = await authStorage.getToken();
    if (!token) return;
    setUser(jwtDecode(token));
  }

  if (!isReady) {
    return <AppLoading startAsync={restoreToken} onFinish={() => setIsReady(true)} onError={console.warn} />
  }

  return (
    <AuthContext.Provider value={{user, setUser}}>
      <NavigationContainer theme={NavigationTheme}>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}