import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function ({ style, isSelected, selectColor, noSelectColor }) {
  const styles = StyleSheet.create({
    background: {},
  });
  return (
    <View
      style={[
        style,
        styles.background,
        { backgroundColor: isSelected ? selectColor : noSelectColor },
      ]}
    />
  );
}
