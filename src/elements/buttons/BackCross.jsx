import { useNavigation } from '@react-navigation/native';
import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Cross } from './assets';
import CrossGray from '~assets/svg/CrossGray.svg'

export default function ({ style, goBack, color='white' }) {
  const navigation = useNavigation()
  const styles = StyleSheet.create({
    background: {
      padding: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <TouchableOpacity style={[styles.background, style]} onPress={goBack ?? navigation.goBack}>
      {
        color == 'white' ? <Cross /> :
        color == 'gray' ? <CrossGray /> :
        null
      }
    </TouchableOpacity>
  );
}
