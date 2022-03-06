import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { ParkCityBackground, ColorButton } from '~components';
import { i18n } from '~services';
import { CarouselText } from './components';
import { Logo } from './assets';

GoogleSignin.configure({
  webClientId:
    '878799007977-cj3549ni87jre2rmg4eq0hiolp08igh2.apps.googleusercontent.com',
});

export default function ({ navigation, route }) {
  const headerHeight = useHeaderHeight();
  const GoogleSignIn = async () => {
    try {
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      return auth().signInWithCredential(googleCredential);
    } catch (error) {}
  };

  const styles = StyleSheet.create({
    background: {
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingBottom: 49,
    },
    carouselText: { marginTop: 30, marginBottom: 50 },
    signInBackground: {
      width: '100%',
      justifyContent: 'flex-end',
      paddingLeft: 30,
      paddingRight: 30,
      marginBottom: 25,
    },
    signInBottom: { marginTop: 14, backgroundColor: '#EFEFEF' },
    logo: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  return (
    <ParkCityBackground style={styles.background} headerHeight={headerHeight}>
      <Logo />
      <CarouselText style={styles.carouselText} />
      <View style={styles.signInBackground}>
        <ColorButton
          text={i18n.t('e1c98b9a-ac6d-4355-96c5-190f770257d2')}
          style={styles.signInBottom}
          event={GoogleSignIn}
        />
        <ColorButton
          text={i18n.t('32c66492-e9c6-4cf6-a3f1-fd6003e8e2df')}
          style={styles.signInBottom}
          event={() => {
            navigation.navigate('PhoneInput');
          }}
        />
      </View>
    </ParkCityBackground>
  );
}
