import React, { useState, useEffect } from 'react'
import { View, Platform, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { i18n } from '~services'
import { PlantImageSmall } from '~components'
import { Part, TextLink } from './components'

export default function ({ navigation, route }) {
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
    return (
        <View style={{flex: 1}}>
            <Image source={{ uri: `data:image/png;base64, ${route.params.image}` }} style={styles.image}/>
            <View style={styles.info}> 
                <Text style={styles.name}>{route.params.title} {route.params.typePlant.map(item => <PlantImageSmall type={item} key={item} />)}</Text>
                <Part title={i18n.t('Information')}>
                    <TextLink name={i18n.t('Phone')} data={route.params.phone} style={styles.textLink} link={`tel:${route.params.phone}`}/>
                    <TextLink name={i18n.t('Adress')} data={`${route.params.adress.city}`} style={styles.textLink} link={`geo:${route.params.coordinate.latitude},${route.params.coordinate.longitude}`}/>
                    {route.params.site ? <TextLink name={i18n.t('Site')} data={route.params.site} style={styles.textLink} link={`https://${route.params.site}`}/> : null }
                </Part>
                <Part title={i18n.t('Description')} style={styles.part}>
                    <Text style={styles.description}>{route.params.description}</Text>
                </Part>
                <Part title={i18n.t('d0f7f799-3896-4f75-9c66-b0a259ebf009')} style={styles.part}>
                    <Text style={styles.description}>{route.params.delivery ? `${i18n.t('Delivery')} ${i18n.t('And')}` : i18n.t('Pickup') }</Text>
                </Part>
            </View>
        </View>
    )
}