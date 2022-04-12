import React from 'react';
import { View, Text, Platform, StyleSheet } from 'react-native';

export default function ({ text, image, style }) {
  const styles = StyleSheet.create({
    background: {
      flex: 1,
      justifyContent: 'space-between',
    },
    text: {
      color: '#FFFFFF',
      fontWeight: '500',
      fontSize: 16,
      lineHeight: 19,
      textAlign: 'left',
      fontFamily: Platform.OS === 'android' ? 'Roboto-Medium' : 'System',
    },
  });

  return (
    <View style={[style.background, style]}>
      <Text style={styles.text}>{text}</Text>
      {image}
    </View>
  );
}
