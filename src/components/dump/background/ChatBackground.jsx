import React from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  KeyboardAvoidingView
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';

export default function ({ children, style }) {
    const headerHeight = useHeaderHeight()
  const styles = StyleSheet.create({
    background: {
      flex: 1,
    },
    image: {
      position: 'absolute',
      top: 0,
      left: 0,
      flex: 1,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height - headerHeight,
    },
    page: {
      flex: 1,
    },
  });

  return (
    <View style={styles.background}>
      <ImageBackground source={require('~assets/ChatBackground.png')} style={styles.image}></ImageBackground>
      <SafeAreaView style={[styles.page, style]}>
        {children}
      </SafeAreaView>
    </View>
  );
}
