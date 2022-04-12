import React, { useEffect } from 'react';
import { StyleSheet, Text, Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { i18n } from '~services';
import { BackArrow, NurseriesMenu } from '~components';

import NurseriesList from './NurseriesList';
import Nurserie from './Nurserie';
import MyNurseries from './MyNurseries';
import { useDispatch, useSelector } from 'react-redux';

const { Group, Navigator, Screen } = createNativeStackNavigator();

const styles = StyleSheet.create({
  headerStyle: {
    color: '#EFEFEF',
    fontWeight: '600',
    fontSize: 18,
    fontFamily: Platform.OS == 'android' ? 'Roboto-Medium' : 'System',
  },
  buttonBackground: { backgroundColor: '#86B738', alignContent: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: 20 },
  header: {
      backgroundColor: '#86B738'
    },
  buttonMenu: {

  }
});

export default function () {
  const myNurseries = useSelector(state => state.nurserie)
  return (
    <Navigator
      screenOptions={({ navigation, route }) => ({
        headerTitleAlign: 'center',
        headerLeft: () => <BackArrow goBack={navigation.goBack} />,
        headerTitleStyle: styles.headerStyle,
        headerStyle: styles.header,
      })}
    >
      <Screen
        name={"NurseriesList"}
        component={NurseriesList}
        initialParams={{ isShowMenu: false, filter: {} }}
        options={({ navigation, route }) => ({
          title: i18n.t('Nurseries'),
           headerRight: () => <NurseriesMenu style={styles.buttonMenu} direction={'bottom'} />
        })}
      />
      <Screen
        name={'Nurserie'}
        component={Nurserie}
        getId={({ params }) => params.id}
        initialParams={{ id: '3a77f0a4-b068-41cc-ad1d-6adc14607254' }}
        options={({ navigation }) => ({
          headerStyle: null,
          title: null,
          headerShown: true,
          headerTransparent: true,
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => <BackArrow goBack={navigation.goBack} style={styles.buttonBackground}/>,
        })}
      />
      <Screen
        name={'MyNurseries'}
        component={MyNurseries}
        initialParams={myNurseries}
        options={()=>({
          headerStyle: null,
          headerTransparent: true,
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerLeft: () => <BackArrow />,
          headerBackVisible: false,
          headerTitleStyle: styles.headerStyle,
          title: i18n.t('390f9acb-a543-43fe-aff6-eae4001f5208')
        })}
      />
    </Navigator>
  );
}
