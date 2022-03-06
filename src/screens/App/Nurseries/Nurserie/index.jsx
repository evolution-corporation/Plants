import React, { useState, useEffect } from 'react'
import { View, Platform, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { nurseries, i18n } from '~services'
import { PlantImageSmall } from '~components'
import { Part, TextLink } from './components'

export default function ({ navigation, route }) {
    const [nurserie, setNirserie] = useState(null)
    const isFocused = useIsFocused()
    const styles = StyleSheet.create({
      image: {
        flex: 1,
      },
      info: {
        backgroundColor: 'white',
        paddingHorizontal: 30,
        paddingVertical: 22,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        transform: [{ translateY: -20 }],
      },
      name: {
        fontFamily: Platform.OS == 'android' ? 'Roboto-Bold' : 'System',
        fontSize: 24,
        fontWeight: '700',
        color: '#506531',
        marginBottom: 14
      },
      description: {
        color: '#000000',
        fontSize: 13,
        fontFamily: Platform.OS == 'android' ? 'Roboto-Medium' : 'System',
        fontWeight: '500',
      },
      part: {
        marginTop: 20,
      },
      textLink: {
        marginTop: 10,
      },
    });

    useEffect(()=> {
        nurseries.getNurserieById(route.params.id).then(result => {
            if (isFocused) setNirserie(result)
        })
    }, [setNirserie])

    if (!nurserie) {
        return (
            <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
                <ActivityIndicator style={'#86B738'} size={'large'}/>
            </View>
        )
    }

    return (
        <View style={{flex: 1}}>
            <Image source={{ uri: nurserie.image }} style={styles.image}/>
            <View style={styles.info}> 
                <Text style={styles.name}>{nurserie.name} {Object.keys(nurserie.type).map(item => nurserie.type[item] ? <PlantImageSmall type={item} key={item} /> : null)}</Text>
                <Part title={i18n.t('Information')}>
                    <TextLink name={i18n.t('Phone')} data={nurserie.phone} style={styles.textLink} link={`tel:${nurserie.phone}`}/>
                    <TextLink name={i18n.t('Adress')} data={nurserie.adress} style={styles.textLink} link={`geo:${nurserie.coordinate.latitude},${nurserie.coordinate.longitude}`}/>
                    {nurserie.site ? <TextLink name={i18n.t('Site')} data={nurserie.site} style={styles.textLink} link={`https://${nurserie.site}`}/> : null }
                </Part>
                <Part title={i18n.t('Description')} style={styles.part}>
                    <Text style={styles.description}>{nurserie.description}</Text>
                </Part>
                <Part title={i18n.t('d0f7f799-3896-4f75-9c66-b0a259ebf009')} style={styles.part}>
                    <Text style={styles.description}>{Object.keys(nurserie.delivery).map(item => nurserie.delivery[item] ? i18n.t(item) : null).join(` ${i18n.t('And')} `) }</Text>
                </Part>
            </View>
        </View>
    )
}