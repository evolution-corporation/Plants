import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ({ price, isSelected, style, currency, onChange }) {
  const styles = StyleSheet.create({
    background: {
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontFamily: Platform.OS === 'android' ? 'Roboto-Medium' : 'System',
      fontSize: 12,
      lineHeight: 14,
    },
  });

  return (
    <TouchableOpacity
      style={[
        style,
        styles.background,
        { backgroundColor: isSelected ? '#9FDE13' : '#FFFFFF' },
      ]}
      onPress={onChange}>
      <Text
        style={[styles.text, { color: isSelected ? '#FFFFFF' : '#4C4C4C' }]}>
        {`${price} ${currency}`}
      </Text>
    </TouchableOpacity>
  );
}
