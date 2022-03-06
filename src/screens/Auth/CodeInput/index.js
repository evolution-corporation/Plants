import React, { useState, useCallback, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  Platform,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { useFocusEffect } from '@react-navigation/native';
import { BackLeaves, TextHref } from '~components';
import { i18n, database } from '~services';
import { SMSCode } from './components';

export default function ({ navigation, route }) {
  const headerHeight = useHeaderHeight();
  const [confirm, setConfirm] = useState(null);
  const showSMSCodeInput = new Animated.Value(0);
  const _showSMSCodeInput = Animated.timing(showSMSCodeInput, {
    toValue: 1,
    duration: 300,
    useNativeDriver: false,
  });

  useFocusEffect(
    useCallback(() => {
      if (route.params.phone) {
        // setTimeout(() => {
        //   if (!route.params.status) {
        //     alert('Error!');
        //     navigation.navigate('PhoneInput');
        //   }
        // }, 60 * 1000);

        database.requestsSMS(route.params.phone).then(
          (confirmation) => {
            setConfirm(confirmation);
            navigation.setParams({ status: true });
          },
          (error) => {
            alert(error);
            navigation.navigate('PhoneInput');
          },
        );
      }
    }, []),
  );

  useEffect(() => {
    if (confirm) _showSMSCodeInput.start();
  }, [route.params.status]);

  const ResopnseSMS = async (code) => {
    try {
      await confirm.confirm(code);
    } catch (error) {
      return error.code;
    }
  };

  const styles = StyleSheet.create({
    background: {
      paddingLeft: 30,
      paddingRight: 30,
      alignItems: 'center',
      justifyContent: 'center',
    },
    SMSCode: { marginTop: 11, marginBottom: 13 },
    TextHref: { color: 'rgba(239, 239, 239, 0.75)', fontSize: 11 },
    title: {
      color: '#EFEFEF',
      fontSize: 18,
      lineHeight: 21,
      fontWeight: '600',
      fontFamily: Platform.OS == 'android' ? 'Roboto-Medium' : 'System',
      textAlign: 'center',
    },
  });

  return (
    <BackLeaves style={styles.background} headerHeight={headerHeight}>
      {route.params.status ? (
        <Animated.View style={{ opacity: showSMSCodeInput }}>
          <Text style={styles.title}>{i18n.t('confirmation')}</Text>
          <SMSCode style={styles.SMSCode} event={ResopnseSMS} />
          <TextHref
            text={i18n.t('9196b9c2-74b5-4fb8-8c3f-8745f3dfcc72')}
            style={styles.TextHref}
          />
        </Animated.View>
      ) : (
        <ActivityIndicator color={'#FFFFFF'} size={'large'} />
      )}
    </BackLeaves>
  );
}
