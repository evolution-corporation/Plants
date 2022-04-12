import React from 'react';
import { StyleSheet, TouchableOpacity, Platform, Text } from 'react-native';

export default function ({
  isSelected,
  style,
  setSelected,
  colorSelected,
  colorNoSelected,
  text,
}) {
  const styles = StyleSheet.create({
    background: {
      height: 26,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      borderRadius: 13,
      backgroundColor: isSelected
        ? colorSelected.background
        : colorNoSelected.background,
      borderColor: isSelected ? colorSelected.border : colorNoSelected.border,
      bodrderWidth: 1,
      borderStyle: 'solid',
    },
    text: {
      color: isSelected ? colorSelected.text : colorNoSelected.text,
      fontSize: 11,
      lineHeight: 13,
      fontWeight: '600',
      fontFamily: Platform.OS === 'android' ? 'Roboto-Medium' : 'System',
    },
  });

  return (
    <TouchableOpacity style={[styles.background, style]} onPress={setSelected}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}
