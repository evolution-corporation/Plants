import React from 'react';
import { View, StyleSheet, StatusBar, ActivityIndicator, Text } from 'react-native';
import { BigGreenTreeLogo, EvolutionLogo } from './assets';

export default function () {
  const styles = StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      alignItems: 'center',
    },
    bottomLogo: {
      position: 'absolute',
      bottom: 35,
      alignSelf: 'center',
      alignItems: 'center'
    },
    activityIndicator: {
      marginTop: 50,
    },
    text: {
      color: '#879096',
      fontFamily: 'Roboto-Medium',
      fontSize: 13,
      marginBottom: 9
    }
  });
  StatusBar.setBackgroundColor('#FFFFFF');
  StatusBar.setBarStyle('dark-content');
  return (
    <View style={styles.background}>
      <BigGreenTreeLogo />
      {/* <ActivityIndicator
        color={'#86B738'}
        size={'large'}
        style={styles.activityIndicator}
      /> */}
      <View style={styles.bottomLogo}>
        <Text style={styles.text}>from</Text>
        <EvolutionLogo />
      </View>
    </View>
  );
}
