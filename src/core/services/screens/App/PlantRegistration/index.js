import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { i18n } from '~services';
import { BackArrow, BackCross } from '~components';

import InputDataPlant from './InputDataPlant';
import CreatePhoto from './CreatePhoto';
import RegistrationPlant from './RegistrationPlant';
import Status from './Status'
import Instruction from './Instruction';

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
        name={"InputDataPlant"}
        component={InputDataPlant}
        initialParams={{ coordinate: { latitude: 0, longitude: 0 } }}
        options={({ navigation, route }) => ({
          title: i18n.t('87dd187f-2b2a-49a0-afb6-5c5a0f7fa686'),
        })}
      />
      <Screen
        name={"CreatePhoto"}
        component={CreatePhoto}
        options={({ navigation, route }) => ({
          title: null,
        })}
      />
      <Screen
        name={'RegistrationPlant'}
        component={RegistrationPlant}
        options={({ navigation, route }) => ({
          title: i18n.t('confirmation')
        })}
      />
      <Screen
        name={'Status'}
        component={Status}
        initialParams={{ result: true }}
        options={({ navigation, route }) => ({
          title: null,
          headerShown: (!route.params.result)
        })}
      />
      <Screen
        name={'Instruction'}
        component={Instruction}
        initialParams={{ page: 1 }}
        options={({ route, navigation }) => ({
          headerLeft: route.params.page == 1 ? ()=>(<BackCross goBack={navigation.goBack} />) : ()=>(<BackArrow goBack={()=>navigation.setParams({ page: route.params.page - 1 })}/> ),
          title: null
        })}
      />
    </Navigator>
  );
}
