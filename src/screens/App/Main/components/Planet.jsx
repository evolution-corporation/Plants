import React, { useState } from 'react'
import { Image, StyleSheet, Dimensions, TouchableOpacity, Text, View, Platform, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native';

import { i18n } from '~services'
import Map from './dump/Map.jsx'
import { useSelector } from 'react-redux';

export default function Planet({ style }) {
    const plants = useSelector((state) => state.user.plants);
    const navigation = useNavigation()
    const styles = StyleSheet.create({
      background: {
        alignItems: 'center'
      },
      planet: {
        
      },
      text: {
        color: '#86B738',
        fontFamily: Platform.OS == 'android' ? 'Roboto-Bold' : 'System',
        fontSize: 13,
        fontWeight: '700',
        textAlign: 'center'
      },
      textView: {
          alignSelf: 'center'
      }
    });

    return (
      <View style={styles.background}>
        <Pressable onPress={() => navigation.navigate('PlantMap')}>
          <Map style={styles.planet} markers={plants} />
        </Pressable>
        <TouchableOpacity style={styles.textView} onPress={() => navigation.navigate('Social', { screen: 'Raiting' })}>
          <Text style={styles.text}>{plants.length} / 333</Text>
          <Text style={styles.text}>{i18n.t('6b1931cd-0f3e-44dd-839d-f802bc0612a4')}</Text>
        </TouchableOpacity>
      </View>
    );
}