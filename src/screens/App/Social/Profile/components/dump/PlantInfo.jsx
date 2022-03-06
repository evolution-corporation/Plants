import React from 'react';
import { Text, StyleSheet, View, Platform, TouchableOpacity } from 'react-native';
import { i18n } from '~services';
import { PlantImageSmall } from '~components';
import { useNavigation } from '@react-navigation/native';

export default function ({ coordinate, name, type, country, id, onPress }) {
  const navigation = useNavigation()
  const styles = StyleSheet.create({
    background: {
      height: 61,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 7,
      paddingBottom: 12,
      paddingLeft: 14,
      paddingRight: 12,
      backgroundColor: '#FFFFFF',
    },
    info: {
      flex: 1,
    },
    name: {
      fontWeight: '600',
      fontSize: 14,
      lineHeight: 17,
      fontFamily: Platform.OS === 'android' ? 'Roboto-Medium' : 'System',
      textAlign: 'left',
    },
    country: {
      fontWeight: '400',
      fontSize: 10,
      lineHeight: 12,
      fontFamily: Platform.OS === 'android' ? 'Roboto-Regular' : 'System',
      textAlign: 'left',
    },
    coordinate: {
      fontWeight: '400',
      fontSize: 10,
      lineHeight: 12,
      fontFamily: Platform.OS === 'android' ? 'Roboto-Regular' : 'System',
      textAlign: 'left',
    },
    image: {
      alignSelf: 'flex-end',
      marginBottom: 1,
      maxHeight: 40,
      maxWidth: 40,
    },
  });
  const position = `${Math.abs(coordinate.latitude)}° ${
    coordinate.latitude != 0
      ? coordinate.latitude > 0
        ? i18n.t('892738fb-7086-47df-87d2-ad5e20fa0379')
        : i18n.t('e11e25b7-0958-4e46-8889-63b208ea34a1')
      : ''
  }, ${Math.abs(coordinate.longitude)}° ${
    coordinate.longitude != 0
      ? coordinate.longitude > 0
        ? i18n.t('bf805df3-fe05-4b97-a836-870fae6f8aaf')
        : i18n.t('c6ba3037-9b48-4864-979a-ddd12dfbd272')
      : ''
  }`;
  return (
    <TouchableOpacity style={styles.background} onPress={()=>{onPress(); navigation.push('PlantCard', { id });}}>
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.country}>{country}</Text>
        <Text style={styles.coordinate}>{position}</Text>
      </View>
      <PlantImageSmall style={styles.image} type={type} />
    </TouchableOpacity>
  );
}
