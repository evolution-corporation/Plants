import React from 'react';
import { View, Text, TextInput, StyleSheet, Platform } from 'react-native';

export default function ({ onChange, title, initValue, style }) {
  const styles = StyleSheet.create({
    background: {
      width: '100%',
      borderBottomColor: '#EBEBEB',
      borderBottomWidth: 1,
      borderBottomStyle: 'solid',
      justifyContent: 'center',
    },
    title: {
      color: 'rgba(128, 128, 128, 0.8)',
      fontWeight: '500',
      fontFamily: Platform.OS === 'android' ? 'Roboto-Medium' : 'System',
      fontSize: 11,
    },
    textInput: {
      color: '#273F00',
      fontWeight: '500',
      fontFamily: Platform.OS === 'android' ? 'Roboto-Medium' : 'System',
      fontSize: 13,
      width: '100%',
    },
  });

  return (
    <View style={[styles.background, style]}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={onChange}
        defaultValue={initValue}
      />
    </View>
  );
}
