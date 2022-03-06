import React, { useReducer, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { ColorButton } from '~components'
import { i18n } from '~services'
import { Profile, Planet, Widgets, OptionsButton } from './components';

export default function ({ route, navigation }) {
  const compact = useSelector(state => state.navigator.compact)
  const styles = StyleSheet.create({
    background: {
      backgroundColor: '#FFFFFF',
      flex: 1,
      paddingHorizontal: 20,
      paddingBottom: 50,
      paddingTop: 31
    },
    optionsButton: {
      position: 'absolute',
      top: 29,
      right: 19
    }
  })
  return (
    <View style={styles.background}>
      <Profile />
      <Planet />
      <Widgets />
      {
        compact ? null : 
        <ColorButton text={i18n.t('23915b10-0e7c-45c6-8c02-4e21d0bbdaf6')} backgroundColor={'#75B904'} color={'#FFFFFF'} event={()=>navigation.navigate('PlantMap')} />
      }
      <OptionsButton style={styles.optionsButton}/>
    </View>
  );
}
