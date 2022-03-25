import React, { useState, useEffect } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector, useDispatch } from 'react-redux';

import { BackArrow } from '~components';
import { i18n, database } from '~services';

import InputLogin from './InputLogin';
import AddUserInfo_ from './AddUserInfo';
import InSign from './InSign';
import PhoneInput from './PhoneInput';
import CodeInput from './CodeInput';
import Intro from './Intro';
import Documents from './Documents';

const { Group, Navigator, Screen } = createNativeStackNavigator();

const styles = StyleSheet.create({
  headerStyle: {
    color: '#EFEFEF',
    fontWeight: '600',
    fontSize: 18,
    fontFamily: Platform.OS == 'android' ? 'Roboto-Medium' : 'System',
  },
});

export function Auth({}) {
  const isFirstLoading = useSelector((state) => state.navigator.isFirstLoading);
  return (
    <Navigator
      initialRouteName={isFirstLoading ? 'Intro' : 'InSign'}
      screenOptions={({ navigation, route }) => ({
        headerTransparent: true,
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        headerLeft: () => <BackArrow goBack={navigation.goBack} />,
        headerBackVisible: false,
        headerTitleStyle: styles.headerStyle,
      })}
    >
      <Screen component={Intro} name="Intro" options={{ headerShown: false }} />
      <Screen
        component={InSign}
        name="InSign"
        options={{ headerShown: false }}
      />
      <Screen
        component={PhoneInput}
        name="PhoneInput"
        options={({ navigation, route }) => ({
          title: i18n.t('cb8302c3-2ae6-4b4c-bc4f-511a0827fec3'),
        })}
      />
      <Screen
        component={CodeInput}
        name="CodeInput"
        options={({ navigation, route }) => ({
          headerShown: false,
        })}
      />
    </Navigator>
  );
}

export function AddUserInfo({ isNoLogin }) {
  const [initialLogin, setInitialLogin] = useState(null);
  const [initialPhoto, setInitialPhoto] = useState(null);

  useEffect(() => {
    database.getUserDataFirebase().then((data) => {
      if (data) {
        setInitialPhoto(data.photoURL ?? '');
        setInitialLogin(
          data.displayName ? data.displayName.replace(/ /g, '_') : '',
        );
      }
    });
  }, [setInitialLogin]);

  if (typeof initialLogin != 'string') {
    return null;
  }

  return (
    <Navigator
      screenOptions={{
        headerShown: true,
        headerTransparent: true,
        headerTitleAlign: 'center',
        headerTitleStyle: styles.headerStyle,
        headerShadowVisible: false,
        headerBackVisible: false,
      }}
      initialRouteName={isNoLogin ? 'InputLogin' : 'AddUserInfo'} // Узнаем, каких данных нет у пользователя и переводим на соответсвующую страницу
    >
      <Screen
        component={InputLogin}
        name="InputLogin"
        options={() => ({
          title: i18n.t('8a8ab857-93cc-4a86-9be2-aa70cc4040c5'),
        })}
        initialParams={{ login: initialLogin }}
      />
      <Screen
        component={AddUserInfo_}
        name="AddUserInfo"
        options={() => ({
          title: i18n.t('0bdbc0f2-5ad5-4538-b7c4-4f1ce2b2b1a9'),
        })}
        initialParams={{ photo: initialPhoto }}
      />
      <Screen
        component={Documents}
        name={'Documents'}
        options={({ navigation, route }) => ({
          headerTransparent: false,
          headerBackVisible: true,
          title: i18n.t(
            route.params.document == 'politikaKonfidentsialnosti'
              ? '920be39f-29a2-43ba-98db-30ca64171938'
              : '5cf19df7-de96-4aae-9745-65f097af0961',
          ),
        })}
      />
    </Navigator>
  );
}
