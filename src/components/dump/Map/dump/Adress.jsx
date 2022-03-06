import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { i18n, geocoding } from '~services';

export default function ({ coordinate, style }) {
  const [adress, setAddress] = useState({});
  const styles = StyleSheet.create({
    background: {
      backgroundColor: '#FFFFFF',
      height: 50,
      borderRadius: 25,
      paddingLeft: 23,
      paddingRight: 23,
      alignItems: 'center',
      justifyContent: 'center',
    },
    titleAddress: {
      color: '#75B904',
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: 11,
      lineHeight: 13,
    },
    textAddress: {
      color: '#404040',
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: 13,
      lineHeight: 16,
    },
  });
  var isActivate = true;
  useEffect(()=>{
    
    return ()=> {
      isActivate = false
    }
  },[setAddress])

  useEffect(() => {
    
    geocoding.getAdress(coordinate, i18n.currentLocale()).then(adress=>isActivate ? setAddress(adress) : null);
    return () => {};
  }, [coordinate]);

  return (
    <View style={[style, styles.background]}>
      <Text style={styles.titleAddress}>
        {i18n.t('7017c6eb-a3f7-4745-8b96-d2732a524d1e')}
      </Text>
      <Text style={styles.textAddress}>{adress.street} {adress.number}</Text>
    </View>
  );
}
