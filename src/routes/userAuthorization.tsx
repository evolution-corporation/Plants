import React, {  } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FirstLoading } from '~constant'
import type { FC } from 'react'

import AddUserInfo from '~screens/userAuthorization/AddUserInfo'
import CodeInput from '~screens/userAuthorization/CodeInput'
import InputLogin from '~screens/userAuthorization/InputLogin';
import InSign from '~screens/userAuthorization/InSign';
import PhoneInput from '~screens/userAuthorization/PhoneInput';


const styles = StyleSheet.create({
})

const noAuthNavigator: FC = ({  }) => {
    const { Navigator, Screen } = createNativeStackNavigator();

    return (
        <Navigator initialRouteName={'InSign'}>
            <Screen component={AddUserInfo} name={'AddUserInfo'} />
            <Screen component={CodeInput} name={'CodeInput'}/>
            <Screen component={InputLogin} name={'InputLogin'}/>
            <Screen component={InSign} name={'InSign'}/>
            <Screen component={PhoneInput} name={'PhoneInput'}/>
        </Navigator>
    )
}

export default noAuthNavigator