import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';

export default function ({ text, backgroundColor, style={}, color, event, fullWidth=true, children }) {
const styles = StyleSheet.create({
    background: {
      width: style.flex ? null : style.width ?? fullWidth ? '100%' : 'auto',
      backgroundColor: style.backgroundColor ?? backgroundColor ?? '#EFEFEF',
      justifyContent: 'center',
      alignItems: 'center',
      height: style.flex ? null : style.height ?? 45,
      borderRadius: style.borderRadius ?? 10,
      borderColor: style.borderColor,
      borderWidth: style.borderColor ? 1 : 0, 
    },
    text: {
      color:  style.color ?? color ?? '#4C4C4C',
      fontWeight: '500',
      fontSize: 16,
      fontStyle: 'normal',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      textAlignVertical: 'center',
      flexDirection: 'row',
      lineHeight: 17,
      fontFamily: Platform.OS == 'android' ? 'Roboto-Medium' : 'System',
    },
  });
  return (
    <TouchableOpacity style={[style, styles.background, styles.text]} onPress={event}>
      {children}
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}
