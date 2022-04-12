import React, { useReducer, useEffect, memo, useMemo } from 'react'
import { View, StyleSheet, Touchable, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import { Map } from '~components'
import { useHeaderHeight } from '@react-navigation/elements';

import { database, geocoding } from '~services'
import { CountPlant } from './components'
import { Tree } from './components/assets'

export function PlantMap({ navigation, route }) {
    const headerHeight = useHeaderHeight();
    const reserveMarkers = useSelector(state => state.user.reserveMarkers)
    const [state, dispatch] = useReducer((state_, { type, payload }) => {
        switch (type) {
            case 'setCoordinate':
                return { ...state_, coordinate: payload };
            case 'addMarker':
                const markers = [...state_.markers]
                const markersIndex = { ...state_.markersIndex }
                if (!Array.isArray(payload)) payload = [payload]
                for (let plant of payload) {
                    if (markersIndex[plant.id] == undefined) {
                        markersIndex[plant.id] = markers.push(plant) - 1
                    }
                }
                return { ...state_,  markers, markersIndex }
            default:
                break;
        }
    }, { coordinate: { latitude: 0, longitude: 0 }, markers: [], markersIndex: {} })



    const styles = StyleSheet.create({ 
        background: {
            flex: 1
        },
        button: {
            backgroundColor: '#FFFFFF',
            alignItems: 'center',
            justifyContent: 'center',
            width: 106,
            height: 106,
            borderRadius: 53,
            position: 'absolute',
            bottom: 59,
            alignSelf: 'center'
        },
        countPlant: {
            position: 'absolute',
            right: 10,
            top: headerHeight,
            height: 50
        },
        button: {
            backgroundColor: '#FFFFFF',
            alignItems: 'center',
            justifyContent: 'center',
            width: 106,
            height: 106,
            borderRadius: 53,
            position: 'absolute',
            bottom: 59,
            alignSelf: 'center'
        }
     })

    useEffect(() => {
        let isActivate = true
        const subscribe = database.getSubscriptionsMarkersEdition((payload) => {
            if (isActivate) {
                dispatch({ type: 'addMarker', payload })
            }
        })
        
        return () => {
            isActivate = false
            subscribe()
        }
    }, [dispatch])
    
    return (
        <View style={styles.background}>
            <Map 
                coordinate={state.coordinate}
                editCoordinate={(payload)=>dispatch({ type: 'setCoordinate', payload })}
                markers={useMemo(() => ([...state.markers, ...reserveMarkers]), [state.markers, reserveMarkers])}
                startUserPosition={true}
            />
            <View style={[styles.countPlant, { justifyContent: 'center' }]}>
                <CountPlant countPlant={state.markers.length} />
            </View>
            <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('HelpPlant', { screen: 'Question', params: { coordinate: state.coordinate } })}>
                <Tree />
            </TouchableOpacity>
        </View>
    )
}

export default memo(PlantMap);