import React, { useState, useEffect } from 'react'
import { StyleSheet, Platform, View, Animated } from 'react-native'
import { useHeaderHeight } from '@react-navigation/elements';

import { BackLeaves } from '~components'
import { SelectDatePeriod, UserListTopPosition } from './components'

export default function({ navigation, route }) {
    const headerHeight = useHeaderHeight()
    const [timePeriod, setTimePeriod] = useState()
    const styles = StyleSheet.create({
        background: {
            flex: 1,
            backgroundColor: '#FFFFFF',
            paddingHorizontal: 30,
            paddingTop: 26
        },
        selectDatePeriod: {

        },
        raiting: {
            flex: 1
        }
    })

    return (
        // <BackLeaves headerHeight={headerHeight}>
        <View style={styles.background}>
            <SelectDatePeriod style={styles.selectDatePeriod} onChange={setTimePeriod} />
            <UserListTopPosition timePeriod={timePeriod} style={styles.raiting}/>
        </View>
        // </BackLeaves>
    )
}