import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Arrow, DarkGreenArrow } from './assets';

export default function ({ alignItems, style, goBack, color }) {
  const navigation = useNavigation()
  const styles = StyleSheet.create({
    background: {
      justifyContent: 'center',
      padding: 10,
      alignItems: alignItems ?? 'flex-start',
    },
  });

  return (
    <TouchableOpacity style={[styles.background, style]} onPress={goBack ?? navigation.goBack}>
      {
        color == 'DarkGreen' ? <DarkGreenArrow /> :
        <Arrow />
      }
      
    </TouchableOpacity>
  );
}
