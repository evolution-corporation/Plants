import React from 'react'
import { View, Text, Image, StyleSheet, Platform, ActivityIndicator } from 'react-native'
import { useHeaderHeight } from '@react-navigation/elements';

import { ColorButton, BackLeaves } from '~components';
import { i18n } from '~services'

import { CheckMarket, Girl, Tree } from './assets'

export default function ({ route, navigation }) {
    const headerHeight = useHeaderHeight();

    const styles = StyleSheet.create({
        background: {
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 30,
            paddingBottom: 100
        },
        image: {
            justifyContent: 'center',
            alignItems: 'center'
        },
        backgroundMessage: {
            justifyContent: 'center'
        },
        message: {
            alignSelf: 'center',
            borderRadius: 20,
            backgroundColor: 'rgba(255, 255, 255, 0.24)',
            alignItems: 'center',
            paddingVertical: 12,
            paddingHorizontal: 8,
            width: '60%'
        },
        title: {
            color: '#FFFFFF',
            fontSize: 18,
            fontWeight: 'bold',
            fontFamily: Platform.OS === 'android' ? 'Roboto-Bold' : 'System',
            marginBottom: 5
        },
        text: {
            color: '#FFFFFF',
            fontSize: 14,
            fontWeight: '500',
            fontFamily: Platform.OS === 'android' ? 'Roboto-Medium' : 'System',
            marginBottom: 5,
            textAlign: 'center'
        }
    })

    if (route.params.result) {
        
        return (
            <BackLeaves style={styles.background}>
                <View />
                <View style={styles.image}>
                    <Tree />
                    <CheckMarket style={{ marginTop: 10, transform: [{translateX: 10}] }}/>
                </View>
                <ColorButton text={i18n.t('next')} event={()=>navigation.navigate('PlantMap')}/>
            </BackLeaves>
        )
    } else {
        return (
            <BackLeaves style={styles.backgroundMessage}>
                <View style={styles.message}>
                    <Image source={Girl} />
                    <Text style={styles.title}>{i18n.t('7ee92467-e0dd-413e-8509-6b0b02d01ee1')}</Text>
                    <Text style={styles.text}>{i18n.t('1bcb85a6-5439-454e-9fc9-a11b5e0adf29')}</Text>
                    <ColorButton text={i18n.t('41ba9d6f-f5d2-4443-864d-623de389c2c9')} style={styles.buttom} event={navigation.goBack}/>
                </View>
            </BackLeaves>
        )
    }
}