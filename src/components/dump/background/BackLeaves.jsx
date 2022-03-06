import React from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';

export default function ({ children, style, headerHeight }) {
  const headerHeightHook = useHeaderHeight();
  const styles = StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: '#86B738',
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
      flex: 1,
      paddingTop: headerHeight ?? headerHeightHook,
    },
  });

  return (
    <View style={styles.background}>
      <StatusBar backgroundColor={'#688934'} barStyle={'light-content'} />
      <ImageBackground
        source={require('./assets/Leaves.png')}
        style={styles.image}
      >
        <SafeAreaView style={[styles.page, style]}>{children}</SafeAreaView>
      </ImageBackground>
    </View>
  );
}
