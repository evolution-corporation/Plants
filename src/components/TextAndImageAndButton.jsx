import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';

export default function ({ textTitle, textButton, image, onPress, style }) {
  const styles = StyleSheet.create({
    background: {
      flex: 1,
      justifyContent: 'space-between',
    },
    textTitle: {
      fontWeight: '700',
      fontFamily: Platform.OS === 'android' ? 'Roboto-Bold' : 'System',
      color: '#FFFFFF',
      fontSize: 24,
      lineHeight: 29,
      textAlign: 'left',
      marginBottom: 24,
    },
    botton: {
      marginTop: 8,
      backgroundColor: '#EFEFEF',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      height: 45,
      width: '100%',
    },
    textButton: {
      color: '#4C4C4C',
      fontSize: 14,
      fontFamily: Platform.OS === 'android' ? 'Roboto-Medium' : 'System',
      fontWeight: '500',
    },
  });

  return (
    <View style={[styles.background, style]}>
      <Text style={styles.textTitle}>{textTitle}</Text>
      {image}
      <TouchableOpacity style={styles.botton} onPress={onPress}>
        <Text style={styles.textButton}>{textButton}</Text>
      </TouchableOpacity>
    </View>
  );
}
