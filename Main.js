import { StatusBar } from 'expo-status-bar';
import React,{ useState } from 'react';
import {  Button,StyleSheet, Text, View,FlatList,Image } from 'react-native';


export default function Main() {
  const [source, setSource] = useState([]);
   function renderItem({item}){
    return(
        <View style={styles.row}>
            <Text style={styles.text}>{item}</Text>
            
        </View>
    );
}
function fetchtodo(){
  fetch('https://api.pexels.com/v1/search?query=audi&per_page=1',{
    headers:{
      'authorization':'563492ad6f917000010000018d20000695144089956edc823141d37f',
      'content-type':'application/json'
    }
  })
  .then((response)=>response.json())
  .then((source)=>{
      setSource(source);
      console.log(source);
      console.log(source.photos[0].src.original);
      renderItem(source);
  })
}
  return (
    <View style={styles.container}>
      <Text>Main.js to browse listings!</Text>
      <StatusBar style="auto" />
      <Button title="Click Here" onPress={fetchtodo} />
      <FlatList style={styles.container}
            data={source}
            renderItem={renderItem}
            keyExtractor={item=>item.photos[0].id}
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
