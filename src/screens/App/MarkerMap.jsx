import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Map } from '~components'

export default function({ route, navigation }) {
    const [coordinate, setCoordinate] = useState(route.params.coordinate)
    const styles = StyleSheet.create({
        background: {
            flex: 1
        }
    })

    return (
        <View style={styles.background}>
            <Map
                editCoordinate={setCoordinate}
                coordinate={coordinate}
                markers={route.params.markers}
                compact={true}
            />
        </View>
    )
}