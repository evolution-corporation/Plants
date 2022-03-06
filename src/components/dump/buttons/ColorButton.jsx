import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';

export default function ({ text, backgroundColor, style={}, color, event, fullWidth=true }) {
  
  const styles = StyleSheet.create({
    background: {
      width: style.flex ? null : style.width ?? fullWidth ? '100%' : 'auto',
      backgroundColor: style.backgroundColor ?? backgroundColor ?? '#EFEFEF',
      justifyContent: 'center',
      alignItems: 'center',
      height: style.flex ? null : style.height ?? 40,
      borderRadius: style.borderRadius ?? 10,
    },
    text: {
      color:  style.color ?? color ?? '#4C4C4C',
      fontWeight: '500',
      fontSize: 14,
      fontStyle: 'normal',
      lineHeight: 17,
      fontFamily: Platform.OS == 'android' ? 'Roboto-Medium' : 'System',
    },
  });
  return (
    <TouchableOpacity style={[style, styles.background]} onPress={event}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}
