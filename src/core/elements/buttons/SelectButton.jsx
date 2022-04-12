import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

export default function ({ isSelected, children, style, setSelected, selectColor = '#FFFFFF', noSelectColor = '#daecbb' }) {
  const styles = StyleSheet.create({
    background: {
      height: 47,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      paddingRight: 10,
      paddingLeft: 10,
      borderRadius: 20,
      marginRight: 10,
      backgroundColor: isSelected ? selectColor : noSelectColor,
    },
  });

  return (
    <TouchableOpacity style={[styles.background, style]} onPress={setSelected}>
      {children}
    </TouchableOpacity>
  );
}
