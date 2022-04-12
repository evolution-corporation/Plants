import React, { memo } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { PlantImageSmall, TextHref } from '~components'
import { i18n } from '~services';
import { InputMessage } from './dump'

export function PlantInfo ({ style, onClick }) {
  
  const plant = useSelector(state => state.plant)
  const compact = useSelector((state) => state.navigator.compact);
  const navigation = useNavigation()
  const styles = StyleSheet.create({
    background: {
      alignItems: 'center',
      justifyContent: 'flex-start',
      flexGrow: 1
    },
    textInfo: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    main: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    name: {
      fontWeight: '700',
      color: '#FFFFFF',
      fontSize: 18,
      lineHeight: 21,
      fontFamily: Platform.OS === 'android' ? 'Roboto-Bold' : 'System',
    },
    text: {
      fontWeight: '500',
      color: '#FFFFFF',
      fontSize: 12,
      fontFamily: Platform.OS === 'android' ? 'Roboto-Medium' : 'System',
      textAlign: 'left',
      maxWidth: 190,
    },
    onChangeText: {
      fontFamily: Platform.OS === 'android' ? 'Roboto-Medium' : 'System',
      fontWeight: '500',
      fontSize: 13,
      color: '#4B780F',
      marginVertical: 16,
    },

  });

    return (
      <View style={[style, styles.background]}>
        <View style={styles.textInfo}>
          <View style={styles.main}>
            <Text style={styles.name}>{plant.name}</Text>
            <Text style={styles.text}>{i18n.t('71b08c04-7030-11ec-90d6-0242ac120003')}</Text>
          </View>
          <PlantImageSmall type={plant.type} style={{ transform: [{ scale: 2 }] }} />
        </View>
        <InputMessage photo={plant.photo} style={{ flexGrow: 1 }}>
          <TextHref event={onClick} style={styles.onChangeText} text={i18n.t('toChange')} />
        </InputMessage>
      </View>
    );
}

export default memo(PlantInfo)