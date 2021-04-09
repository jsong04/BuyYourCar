import React, { useRef } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import ImageInput from './ImageInput';

function ImageInputList({imageUris = [], onRemoveImage, onAddImage }) {
  const scrollView = useRef();

  return (
    <View>
      <ScrollView ref={scrollView} horizontal={true} onContentSizeChange={() => scrollView.current.scrollToEnd()}>
        <View style={styles.container}>
            {imageUris.map(uri => <ImageInput 
                imageUri={uri}
                onChangeImage={() => onRemoveImage(uri)}
                key={uri} />)}
            <ImageInput onChangeImage={uri => onAddImage(uri)} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flexDirection: 'row',

  }
});

export default ImageInputList;