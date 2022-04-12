import React from 'react'
import { StyleSheet, View, Text, Platform, TouchableOpacity } from 'react-native'
import { i18n } from '~services'
import { PlantImageSmall } from '~components'
import { useNavigation } from '@react-navigation/native'

export default function ({ style, typePlant, onPress }) {
    const navigation = useNavigation()

    const styles = StyleSheet.create({
        background: {
            backgroundColor: '#F4F3EF',
            borderRadius: 20,
            paddingVertical: 9,
            paddingLeft: 14,
            overflow: 'hidden'
        },
        title: {
            color: '#000000',
            fontFamily: Platform.OS == 'android' ? 'Roboto-Bold' : 'System',
            fontSize: 13,
            fontWeight: '700',
            marginRight: 50
        },
        subTitle: {
            color: 'rgba(0, 0, 0, 0.31)',
            fontFamily: Platform.OS == 'android' ? 'Roboto-Medium' : 'System',
            fontSize: 9,
            fontWeight: '600',
            marginRight: 50
        },
        image: {
            transform: [{ scale: 3 }],
            position: 'absolute',
            bottom: 10,
            right: -10,
        }
    })

    return (
        <TouchableOpacity style={[style, styles.background]} onPress={onPress}>
            <Text style={styles.title}>{i18n.t('c77d8555-3649-4f31-b420-780296375a2e')}</Text>
            <Text style={styles.subTitle}>{i18n.t('36812029-d09f-4694-a6ea-31d76fe054e3')}</Text>
            <PlantImageSmall style={styles.image} />
        </TouchableOpacity>
    )
}