import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, Text, Platform, TouchableOpacity } from 'react-native';

import { Leaflet } from './assets';

export default function ({ style, countPlant }) {
  const navigation = useNavigation()
  const styles = StyleSheet.create({
    backGround: {
      backgroundColor: '#FFFFFF',
      height: 37,
      borderRadius: 18.5,
      paddingLeft: 10,
      paddingRight: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    textCount: {
      color: '#404040',
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: 12,
      lineHeight: 14,
      marginRight: 4,
      fontFamily: Platform.OS === 'android' ? 'Roboto-Medium' : 'System',
    },
    leaflet: {
      backgroundColor: '#75B904',
      height: 18,
      width: 18,
      borderRadius: 9,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  return(
    <TouchableOpacity style={[style, styles.backGround]} onPress={()=>navigation.navigate('Social', { screen: 'Raiting' })}>
      <Text style={styles.textCount}>{countPlant}</Text>
      <View style={styles.leaflet}>
        <Leaflet />
      </View>
    </TouchableOpacity>
  )
}
