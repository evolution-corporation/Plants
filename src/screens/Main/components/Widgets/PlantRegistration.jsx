import React, { useRef, useState, memo, useEffect } from 'react'
import { View, Text, Animated, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Tree } from './assets'
import { i18n } from '~services'
import { Widget, TextHref } from '~components';

export default function PlantRegistrationWidget({ style, index=0, onPress, isCompact=false }) {
    const navigation = useNavigation()
    const styles = StyleSheet.create({
        background: {
            backgroundColor: '#FFD200',
        },
        title: {
          color: '#86B738',
          fontFamily: Platform.OS === 'android' ? 'Roboto-Bold' : 'System',
          fontSize: 18,
          fontWeight: '700'
        }, 
        descriprion: {
          color: '#FFFFFF',
          fontFamily: Platform.OS === 'android' ? 'Roboto-Medium' : 'System',
          fontSize: 11,
          fontWeight: '500'
        },
        goOver: {
          alignSelf: 'flex-start',
          marginTop: 5,
          color: '#FFFFFF',
          fontFamily: Platform.OS === 'android' ? 'Roboto-Bold' : 'System',
          fontSize: 11,
          fontWeight: '700'
        }
    })
    useEffect(()=> {
        return () => {

        }
    }, [isCompact])

    return (
      <Widget
        onPress={() => {
          onPress();
          // navigation.navigate('HelpPlant', { screen: 'Question' });
        }}
        style={[style, styles.background]}
        isCompact={isCompact}
        key={'PlantRegistration'}
        index={index}>
        <Tree />
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <Text style={styles.title}>{i18n.t('Registration')}</Text>
          <Text style={styles.descriprion}>{i18n.t('5b812df6-87b5-473c-bb4d-8340aa3d7928')}</Text>
          <TextHref
            style={styles.goOver}
            text={i18n.t('GoOver')}
            event={() => {
              onPress();
              navigation.navigate('HelpPlant', { screen: 'Question' });
            }}
          />
        </View>
      </Widget>
    );
}