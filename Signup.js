import React, { Component } from 'react';
import { AppRegistry, View, Image, StyleSheet,TextInput } from 'react-native';

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
      <View> 
      

    <View>
        <TextInput style={style.inputs} placeholder = "Enter Full Name "/>
    </View>

    <View>
        <TextInput style={style.inputs} placeholder = "Enter email"/>
    </View>

    <View>
        <TextInput secureTextEntry={true}
          style={style.inputs} placeholder = "Set your Password" />
    </View>
    
    
    </View>
    );
  
}

