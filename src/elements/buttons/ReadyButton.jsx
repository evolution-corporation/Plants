import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ready } from './assets';

export default function ({ style, onPress }) {
  const styles = StyleSheet.create({
    background: {
      padding: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <TouchableOpacity style={[styles.background, style]} onPress={onPress}>
      <Ready />
    </TouchableOpacity>
  );
}
