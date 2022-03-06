import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

export default function ({ event, style, children }) {
  const styles = StyleSheet.create({
    backGround: {
      flexDirection: 'row',
      borderColor: '#EFEFEF',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      borderWidth: 1,
      borderRadius: 10,
      borderStyle: 'solid',
      justifyContent: 'center',
      alignItems: 'center',
      height: 40,
    },
  });

  return (
    <TouchableOpacity onPress={event} style={[styles.backGround, style]}>
      {children}
    </TouchableOpacity>
  );
}
