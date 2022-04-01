import React, {  } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FirstLoading, AuthStatus } from '~constant'
import { accountState } from '~models/account'
import type { FC } from 'react'

import UserAuthorizationNavigator from './userAuthorization'
// import NurseriesNavigator from './nurseries'
// import MainScreen from '~screens/Main'


const Routes: FC = ({  }) => {
    const { Navigator, Screen } = createNativeStackNavigator();
    if (accountState.authStatus == AuthStatus.AUTHORIZED && false) {
        return (
            <NavigationContainer>
                <Navigator>
                    {/* <Screen name={'Main'} component={MainScreen}/> */}
                    {/* <Screen name={'Nurseries'} component={NurseriesNavigator}/> */}
                </Navigator>
            </NavigationContainer>
        )
    } else {
        return (
            <NavigationContainer>
                <UserAuthorizationNavigator />
            </NavigationContainer>
        )
    }
}

export default Routes