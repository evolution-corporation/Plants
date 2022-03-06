import React, { useState } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { i18n } from '~services'
import { ColorButton, Map } from '~components'

export default function ({ route, navigation }) {
    const [coordinate, setCoordinate] = useState(route.params?.coordinate ?? { latitude: 56.838110 ,longitude: 60.604360 })
    const styles = StyleSheet.create({
        background: {
            flex: 1
        },
        map: {
            width: '100%',
            height: '100%'
        },
        buttonContainer: {
            position: 'absolute',
            width: '100%',
            paddingHorizontal: 30,
            alignSelf: 'center',
            bottom: 54,
        }
    })
    return (
      <View style={styles.background}>
        <Map
          style={styles.map}
          editCoordinate={setCoordinate}
          coordinate={coordinate}
          compact={true}
          startUserPosition={route.params.coordinate ? false : true}
        />
        <View style={styles.buttonContainer}>
          <ColorButton style={styles.button} text={i18n.t('confirmation')} backgroundColor={'#86B738'} color={'#FFFFFF'} event={()=>navigation.navigate('PlantRegistration', { screen: 'InputDataPlant', params: { coordinate } })} />
        </View>
      </View>
    );
}