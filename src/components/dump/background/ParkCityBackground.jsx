import React from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from 'react-native';

export default function ({ children, style, headerHeight }) {
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
      height: Dimensions.get('window').height,
    },
    page: {
      position: 'absolute',
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      top: 0,
      left: 0,
      paddingTop: headerHeight ?? 0,
    },
  });

  return (
    <View style={styles.background}>
      <ImageBackground
        source={require('./assets/ParkCity.png')}
        style={styles.image}
      >
        <SafeAreaView style={[styles.page, style]}>{children}</SafeAreaView>
      </ImageBackground>
    </View>
  );
}
