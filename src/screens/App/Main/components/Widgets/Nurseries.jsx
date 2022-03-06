import React, { useRef, useState, memo, useEffect } from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Leaf } from './assets';
import { i18n } from '~services';
import { Widget } from '~components';

export default function NurseriesWidget({ style, index=0, onPress, isCompact = false }) {
  const navigation = useNavigation();
  const styles = StyleSheet.create({
    background: {
      backgroundColor: '#86B738',
    },
    title: {
      color: '#FFFFFF',
      fontFamily: Platform.OS === 'android' ? 'Roboto-Bold' : 'System',
      fontSize: 18,
      fontWeight: '700',
    },
    descriprion: {
      color: 'rgba(255, 255, 255, 0.7)',
      fontFamily: Platform.OS === 'android' ? 'Roboto-Medium' : 'System',
      fontSize: 11,
      fontWeight: '500',
    },
    goOver: {
        marginTop: 5,
      color: '#FFD200',
      fontFamily: Platform.OS === 'android' ? 'Roboto-Bold' : 'System',
      fontSize: 11,
      fontWeight: '700',
    },
  });
  useEffect(() => {
    return () => {};
  }, [isCompact]);

  return (
    <Widget
      onPress={() =>{
        onPress()
        navigation.navigate('Nurseries', { screen: 'NurseriesList' })
      }}
      style={[style, styles.background]}
      isCompact={isCompact}
      key={'Nurseries'}
      index={index}  
    >
      <Leaf />
      <View
        style={{ flex: 1, justifyContent: 'space-between' }}>
        <Text style={styles.title}>{i18n.t('Nurseries')}</Text>
        <Text style={styles.descriprion}>
          {i18n.t('0ca5097f-6f96-461e-9103-3c8dfaabc155')}
        </Text>
        <Text style={styles.goOver}>{i18n.t('GoOver')}</Text>
      </View>
    </Widget>
  );
}