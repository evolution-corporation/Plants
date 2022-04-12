import React from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BackArrow } from '~components';

import Question from './Question';
import MapConfirmation from './MapConfirmation';

const { Group, Navigator, Screen } = createNativeStackNavigator();

const styles = StyleSheet.create({
  headerStyle: {
    color: '#EFEFEF',
    fontWeight: '600',
    fontSize: 18,
    fontFamily: Platform.OS == 'android' ? 'Roboto-Medium' : 'System',
  },
  buttonGoBackInCircule: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#86B738'
  }
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
            name='Question'
            component={Question}
            options={({ route, navigation })=> ({
              title: null
            })}
        />
        <Screen
          name='MapConfirmation'
          component={MapConfirmation}
          options={({ route, navigation })=>({
            headerShown: true,
            headerTransparent: true,
            headerTitleAlign: 'center',
            headerShadowVisible: false,
            headerBackVisible: false,
            title: null,
            headerLeft: null
            //headerLeft: ()=>(<BackArrow goBack={navigation.goBack} style={styles.buttonGoBackInCircule}/>)
          })}
        />
    </Navigator>
  );
}
