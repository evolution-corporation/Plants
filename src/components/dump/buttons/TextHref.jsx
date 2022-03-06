import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';

export default function ({ event, style, text, color, fontWeight, fontSize }) {
  const styles = StyleSheet.create({
    text: {
      fontWeight: fontWeight ?? style.fontWeight ?? '500',
      fontSize: fontSize ?? style.fontSize ?? 14,
      color: color ?? style.color ?? '#4C4C4C',
      fontStyle: 'normal',
      textAlign: 'center',
      fontFamily: Platform.OS == 'android' ? 'Roboto-Medium' : 'System',
    },
    backGround: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  return (
    <TouchableOpacity style={[styles.backGround, style]} onPress={event}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}
