import React, {  } from 'react'
import { View, StyleSheet, Dimensions, Text, Platform } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { ColorButton } from './dump'
import { i18n } from '~services'
import ReservMarker from '~assets/svg/ReservMarker.svg'

export default function({ coordinate={ latitude: 56.838110 ,longitude: 60.604360 }, title, onPress }) {

    const styles = StyleSheet.create({
        background: {
            width: '100%'
        },
        title: {
            fontFamily: Platform.OS == 'android' ? 'Roboto-Bold' : 'System',
            color: '#FFFFFF',
            fontSize: 24,
            lineHeight: 28,
            fontWeight: '700'
        },
        map: {
            borderRadius: 20,
            height: 300,
            width: '100%',
            overflow: 'hidden',
            marginVertical: 8
        },
        marker: {
            transform: [{ scale: 1.5 }]
        }
    })

    return (
      <View style={styles.background}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.map}>
          <MapView
            showsPointsOfInterest={false}
            showsCompass={false}
            showsIndoors={false}
            region={{ ...coordinate, latitudeDelta: 0.005, longitudeDelta: 0.005 }} style={{flex: 1}}
            liteMode={true}
            toolbarEnabled={false}
            >
            <Marker coordinate={coordinate}>
                <ReservMarker />
            </Marker>
          </MapView>
        </View>
        <ColorButton text={i18n.t('f04cc067-17f4-4c22-8101-beb62101a831')} event={onPress}/>
      </View>
    );
}