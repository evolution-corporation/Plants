import React from 'react';
import { View, StyleSheet, StatusBar, ActivityIndicator, Text } from 'react-native';

import AppLogo from '~assets/logo/AppLogo_Green.svg'
import EvolutionLogo from '~assets/logo/EvolutionLogo_Green.svg'
import { LoadingStatus } from '~constant'
import type { FC } from 'react'

export type Props = {
  status: LoadingStatus.NOT_LOADING | LoadingStatus.LOADING
}

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

const Loading: FC<Props> = ({ status = LoadingStatus.NOT_LOADING }) => {
  StatusBar.setBackgroundColor('#FFFFFF');
  StatusBar.setBarStyle('dark-content');
  return (
    <View style={styles.background}>
      <AppLogo />
      {
        status == LoadingStatus.LOADING ? 
        <ActivityIndicator
          color={'#86B738'}
          size={'large'}
          style={styles.activityIndicator}
        />
        : null
      }
      <View style={styles.bottomLogo}>
        <Text style={styles.text}>from</Text>
        <EvolutionLogo />
      </View>
    </View>
  );
}

export default Loading