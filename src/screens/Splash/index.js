import React from 'react';
import { View, StyleSheet, StatusBar, ActivityIndicator } from 'react-native';
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
    },
    activityIndicator: {
      marginTop: 50,
    },
  });
  StatusBar.setBackgroundColor('#FFFFFF');
  StatusBar.setBarStyle('dark-content');
  return (
    <View style={styles.background}>
      <BigGreenTreeLogo />
      <ActivityIndicator
        color={'#86B738'}
        size={'large'}
        style={styles.activityIndicator}
      />
      <EvolutionLogo style={styles.bottomLogo} />
    </View>
  );
}
