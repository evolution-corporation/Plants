import React, { useReducer } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { ParkCity as Background } from '~elements/background'
import i18n from '~i18n';
import ChoosingTheLoginMethod from '~layouts/ChoosingTheLoginMethod';
import { Auth } from '~models/account'
import { AuthType } from '~models/type';

import type { FC } from 'react'


GoogleSignin.configure({
  webClientId:
    '878799007977-cj3549ni87jre2rmg4eq0hiolp08igh2.apps.googleusercontent.com',
});

const styles = StyleSheet.create({
    background: {
      flex: 1
    },
    
  });

const InSignScreen: FC = ({  }) => {
  const googleSignIn = async () => {
    const { idToken } = await GoogleSignin.signIn();
    if (idToken) {
      Auth({  type: AuthType.GOOGLE, googleId: idToken })
    }
  };

  // const phoneSignIn = () => {navigation.navigate('PhoneInput')}

  return (
    <Background style={styles.background}>
      <ChoosingTheLoginMethod editLayout={() => console.log('test')}/>
    </Background>
  );
}


export default InSignScreen