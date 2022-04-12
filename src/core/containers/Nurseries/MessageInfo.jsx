import React, { memo } from 'react'
import { View, Text, Image, StyleSheet, Platform, ActivityIndicator } from 'react-native'
import { BackLeaves, ColorButton } from '~components'
import { useNavigation } from '@react-navigation/native';

import { i18n } from '~services'

export function MessageInfo({ status }) {
  const navigation = useNavigation();
  const styles = StyleSheet.create({
    background: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 60,
    },
    image: {
      height: 164,
      width: 164,
      borderRadius: 82,
      marginBottom: 13,
    },
    title: {
      fontFamily: Platform.OS == 'android' ? 'Roboto-Bold' : 'System',
      color: '#4C4C4C',
      fontSize: 18,
      fontWeight: '700',
      textAlign: 'center',
    },
    message: {
      fontFamily: Platform.OS == 'android' ? 'Roboto-Medium' : 'System',
      color: '#4C4C4C',
      fontSize: 14,
      fontWeight: '500',
      textAlign: 'center',
      marginVertical: 13,
    },
    button: {
      width: '100%',
    },
  });
  if (status == 'OK') {
    return (
      <BackLeaves style={styles.background}>
        <View style={{ alignItems: 'center' }}>
          <Image source={require('~assets/ManOk.png')} style={styles.image} />
          <Text style={styles.title}>{i18n.t('06535b2a-7183-408f-92e5-82b4d715a58c')}</Text>
          <Text style={styles.message}>{i18n.t('16a57b53-6fd3-4cbb-8967-b69cb730eed5')}</Text>
        </View>
        <ColorButton
          style={styles.button}
          text={i18n.t('1b626dbf-20e0-40ec-b407-449617eb10ac')}
          fullWidth={true}
          event={() => navigation.navigate('NurseriesList')}
        />
      </BackLeaves>
    );
  }

  return (
    <BackLeaves style={styles.background}>
      <ActivityIndicator size={'large'} color={'#FFFFFF'} />
    </BackLeaves>
  );
}

export default memo(MessageInfo);