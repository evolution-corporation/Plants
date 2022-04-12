import React, {  } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { FC } from 'react'

import NurseriesList from '~screens/nurseries/NurseriesList';
import MyNurseries from '~screens/nurseries/MyNurseries';
import Nurserie from '~screens/nurseries/Nurserie';


const nurseriesNavigator: FC = () => {
    const { Navigator, Screen } = createNativeStackNavigator();

    return(
        <Navigator>
            <Screen name={'NurseriesList'} component={NurseriesList}/>
            <Screen name={'MyNurseries'} component={MyNurseries}/>
            <Screen name={'Nurserie'} component={Nurserie}/>
        </Navigator>
    )
}

export default nurseriesNavigator