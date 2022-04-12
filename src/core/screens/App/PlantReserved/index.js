import React, { useState } from 'react'
import { View, Platform, StyleSheet, Text, ActivityIndicator } from 'react-native'
import { useDispatch } from 'react-redux'
import { Overlay, ColorButton } from '~components'

import { i18n } from '~services'
import { actions } from '~store'
import { PlantButton, CancelButton } from './components'

export default function ({ route, navigation }) {
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()
    const styles = StyleSheet.create({
        background: {
            backgroundColor: '#FFFFFF',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingHorizontal: 14,
            paddingTop: 16,
            paddingBottom: 20
        },
        title: {
            color: '#2B2A29',
            fontFamily: Platform.OS === 'android' ? 'Roboto-Bold' : 'System',
            fontSize: 18,
            fontWeight: '700',
            marginBottom: 5,
        },
        middleView: {
            marginVertical: 5,
            flexDirection: 'row',
            width: '100%',
            height: 90,
            justifyContent: 'space-between'
        },
        button: {
            backgroundColor: '#75B904',
            color: '#FFFFFF',
            marginVertical: 5,
        },
        description: {
            color: 'rgba(14, 14, 14, 0.31)',
            fontWeight: '500',
            fontFamily: Platform.OS == 'android' ? 'Roboto-Medium' : 'System',
            textAlign: 'center',
            fontSize: 10,
            marginHorizontal: 26,
            
        }
    })
    const deleteMarker = async () => {
        setLoading(true)
        try {
            await dispatch(actions.deleteReseveMarker(route.params.id)).unwrap()
            navigation.goBack()
        } catch (error) {
            alert(error)
        }
    }

    const plant = () => {
        navigation.navigate('PlantRegistration', {
            screen: 'InputDataPlant',
            params: {
                coordinate: route.params.coordinate,
                reserveMarker: route.params.id
            }
        })
    }

    if (loading) {
        return (
            <Overlay>
                <View style={styles.background}>
                    <ActivityIndicator color={'#75B904'} size={'large'} />
                </View>
            </Overlay>
        )
    }

    return (
        <Overlay>
            <View style={styles.background}>
                <Text style={styles.title}>{i18n.t('b83b88a8-3adc-4711-aa5b-88101d9fb54c')({ day: route.params.date })}</Text>
                <View style={styles.middleView}>
                    <PlantButton typePlant={null} style={{ marginRigth: 5, flex: 2 }} onPress={plant}/>
                    <CancelButton style={{ marginLeft: 5, flex: 3 }} onPress={deleteMarker}/>
                </View>
                <ColorButton style={styles.button} text={i18n.t('c9af58bf-0233-4564-b258-851a290154d9')} event={()=>navigation.navigate('Nurseries', { screen: 'NurseriesList', params: route.params.coordinate })}/>
                <Text style={styles.description}>{i18n.t('d38cd142-828d-4447-8e2b-98a191494261')}</Text>
            </View>
        </Overlay>
    )
}
