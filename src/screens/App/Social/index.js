import React from 'react';
import { StyleSheet, Platform, Alert } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';

import { BackArrow, TextHref, ReadyButton } from '~components';
import { i18n, database } from '~services';
import Profile from './Profile';
import EditProfile from './EditProfile';
import Raiting from './Raiting';
const { Group, Navigator, Screen } = createNativeStackNavigator();

const styles = StyleSheet.create({
  headerStyle: {
    color: '#EFEFEF',
    fontWeight: '600',
    fontSize: 18,
    fontFamily: Platform.OS == 'android' ? 'Roboto-Medium' : 'System',
  },
  buttonExit: { color: '#FFFFFF', fontWeight: '500', fontSize: 10 },
});

export default function () {
  const user = useSelector((state) => state.user);
  return (
    <Navigator
      screenOptions={({ navigation, route }) => ({
        headerTransparent: true,
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        headerLeft: () => <BackArrow goBack={navigation.goBack} />,
        headerBackVisible: false,
        headerTitleStyle: styles.headerStyle,
      })}
    >
      <Screen
        name={'Profile'}
        component={Profile}
        //initialParams={{...user}}
        getId={({ params }) => params.uid}
        options={({ navigation, route }) => ({
          title: route.params.login,
          headerRight: route.params.uid == user.uid ? () => (
            <TextHref
              event={() => {
                Alert.alert(
                  i18n.t('1e765936-736f-4ba1-90c0-71378d72de0a'),
                  i18n.t('82da3b15-c96b-455f-aed3-e2ed370f31fa'),
                  [
                    { text: i18n.t('cancel') },
                    { text: i18n.t('exit'), onPress: database.exitAccount },
                  ],
                  { cancelable: true },
                );
              }}
              style={styles.buttonExit}
              text={i18n.t('exit')}
            />
          ) : null,
        })}
      />
      <Screen
        name="EditProfile"
        component={EditProfile}
        initialParams={{ permision: false, isPress: false, updateParent: true }}
        options={({ navigation, route }) => ({
          title: i18n.t('14093b80-9aac-4b17-81e3-22d9da9f1dc4'),
          headerRight: () =>
            route.params.permision ? (
              <ReadyButton
                onPress={() => navigation.setParams({ isPress: true })}
              />
            ) : null,
        })}
      />
      <Screen
        name={"Raiting"}
        component={Raiting}
        initialParams={{}}
        options={({ route, navigation })=> ({
          title: i18n.t('Raiting')
        })}
      />
    </Navigator>
  );
}
