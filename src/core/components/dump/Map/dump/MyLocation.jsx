import { useIsFocused } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { StyleSheet, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
// import { geocoding } from '~services'
import { actions } from '~store'
import { MyLocation } from './assets'

export default function({ style, onPress }) {
    const geoPermission = useSelector(state => state.navigator.permission.geolocation)
    const [isLoading, setIsLoadng] = useState(false)
    const isFocused = useIsFocused()
    const dispatch = useDispatch()
    const styles = StyleSheet.create({
        background: {
            alignItems: 'center',
            justifyContent: 'center',
            width: 41,
            height: 41,
            borderRadius: 20.5,
            backgroundColor: '#FFFFFF'
        }
    })


    if (geoPermission == 'BLOCKED') return null

    const getGeolocation = useCallback(()=>{
        setIsLoadng(true)
        if (geoPermission == 'GRANTED') {
            onPress()
            setIsLoadng(false);
            // return geocoding.getMyPosition((coordinate) => { 
            //     onPress(coordinate)
            //     if (isFocused) {
            //       setIsLoadng(false);
            //     }
            // });
        } else {
            
            return dispatch(actions.getPermission('geolocation')).unwrap().then(()=>{
                if (isFocused) {
                    setIsLoadng(false)
                }
            });
        }
    },[geoPermission, onPress])

    if (isLoading) {
        return (
          <View style={[style, styles.background]}>
            <ActivityIndicator color={'#688934'} size={'large'} />
          </View>
        );
    }

    return (
        <TouchableOpacity style={[style, styles.background]} onPress={getGeolocation}>
            <MyLocation />
        </TouchableOpacity>
    );
}