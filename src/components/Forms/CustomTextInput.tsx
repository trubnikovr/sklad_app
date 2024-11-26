import React from 'react';
import { TextInput, TextInputProps } from 'react-native-paper';

// @ts-ignore
const CustomTextInput = (prop: TextInputProps) => {
  return (
    <TextInput
      mode="outlined"
      label="Поиск"
      placeholder="Поиск..."
      borderColor={'#d9d9d9'}
      outlineStyle={{
        borderWidth: 1,

      }}
      style={{
        backgroundColor: 'white',
        height: 40,
        borderRadius: 8,
        paddingHorizontal: 10,
        justifyContent: 'center',
      }}
      outlineColor="#d9d9d9"          // Sets outline color when not focused
      activeOutlineColor="#6200ee"    // Sets outline color when focused
      theme={{ colors: { text: '#000000', placeholder: '#9e9e9e' } }} // Text and placeholder colors
      {...prop}
    />
  );
};

export default CustomTextInput;
