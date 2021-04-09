import React, { Component } from 'react';
import { AppRegistry, View, Image, StyleSheet,TextInput,Button, SafeAreaView } from 'react-native';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import AppTextInput from '../components/AppTextInput';
import { LoadingButton } from '@phomea/react-native-buttons';
import colors from '../config/colors';

const style = StyleSheet.create( {
  inputs: {
    marginTop:50,
    fontSize:20,
    marginLeft:10,
    marginRight:10,
    borderBottomColor:'red',
    borderBottomWidth:2, 
  },
}
);

export default function Signup ({ navigation }) {
  
    return (
      <SafeAreaView>
      <View style={{alignItems: 'center', marginTop: 20}}>
        <AppText style={{fontSize: 20, color: 'royalblue'}}>Please fill out the following information:</AppText>
      </View>
      <AppTextInput placeholder = "Name " />
      <AppTextInput placeholder = "Sex " />
      <AppTextInput placeholder = "Age " />
      <AppTextInput placeholder = "job " />
      <AppTextInput placeholder = "Car budget " />
      <AppTextInput placeholder = "Email " />
      <AppTextInput placeholder = "Password " />
      <View style={{marginVertical: 15}}>
        <LoadingButton title="Submit" color="red" onPress={() => console.log("Pressed!")} />
      </View>
    </SafeAreaView>
    );
  
}

