import React from 'react';
import { Button, ButtonProps } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { theme } from "../../styles/theme.ts";

const CustomButton = (prop: ButtonProps) => {
  return (
    <Button
      {...prop}
      mode="contained"
      style={{
        ...styles.button
      }}
      labelStyle={{
        ...styles.label
      }}
      contentStyle={{
        ...styles.content
      }}
    >
      {prop.children}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary, // Purple background color
    borderRadius: 8,            // Rounded corners
    paddingVertical: 5,         // Vertical padding to increase height
    paddingHorizontal: 20,      // Horizontal padding for button width
    elevation: 3,               // Shadow effect for depth
  },
  label: {
    color: 'white',             // White text color
    fontSize: 16,               // Font size for label
  },
  content: {
    flexDirection: 'row-reverse', // Aligns icon to the left of text
  },
});

export default CustomButton;
