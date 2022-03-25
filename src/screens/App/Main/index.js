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
    },
    colorButton: {
      backgroundColor: '#86B738',
      color: '#FFFFFF',
    }
  })
  return (
    <View style={styles.background}>
      <Profile />
      <Planet />
      <Widgets />
      { 
        !compact ? 
        <ColorButton text={i18n.t('23915b10-0e7c-45c6-8c02-4e21d0bbdaf6')} style={styles.colorButton} event={()=>navigation.navigate('PlantMap')} />
        : null  
      }
      <OptionsButton style={styles.optionsButton}/>
    </View>
  );
}
