import React, { useState } from 'react';
import { StyleSheet, ToastAndroid, Platform } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import validator from 'validator';
import { BackLeaves, ColorButton, Phone } from '~components';
import { i18n } from '~services';

export default function ({ navigation, route }) {
  const [phone, setPhone] = useState('');
  const headerHeight = useHeaderHeight();

  async function RequestSMS() {
    if (validator.isMobilePhone(phone, 'any', { strictMode: true })) {
      navigation.navigate('CodeInput', { phone: phone });
    } else {
      if (Platform.OS == 'android') {
        ToastAndroid.show(
          i18n.t('ea09983a-d497-4227-a6fa-f9924f266c45'),
          ToastAndroid.BOTTOM,
        );
      }
    }
  }

  const styles = StyleSheet.create({
    background: {
      paddingLeft: 30,
      paddingRight: 30,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    phone: { marginTop: 21, marginBottom: 13 },
    colorButton: { marginTop: 14, backgroundColor: '#EFEFEF' },
  });

  return (
    <BackLeaves style={styles.background} headerHeight={headerHeight}>
      <Phone returnPhone={setPhone} style={styles.phone} />
      <ColorButton
        text={i18n.t('continue')}
        style={styles.colorButton}
        event={RequestSMS}
      />
    </BackLeaves>
  );
}
