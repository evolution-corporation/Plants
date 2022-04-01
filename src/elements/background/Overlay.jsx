import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ({ style, children }) {
  const navigation = useNavigation()
  const styles = StyleSheet.create({
    main: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'transparent',
    },
    background: {
      backgroundColor: 'transparent',
    },
  });

  return (
    <View style={styles.main}>
      <Pressable
        style={[StyleSheet.absoluteFill, styles.background]}
        onPress={navigation.goBack}
      />
      <View style={style}>
        {children}
      </View>
    </View>
  );
}
