import React, { memo } from 'react'
import { TouchableOpacity, Text, Linking, Platform, StyleSheet } from 'react-native'
import { i18n } from '~services'

export function TextLink ({ style, link, name, data }) {
    const styles = StyleSheet.create({
        background: {
            width: '100%',
            height: 38,
            justifyContent: 'center'
        },
        name: {
            color: 'rgba(128, 128, 128, 0.8)',
            fontFamily: Platform.OS == 'android' ? 'Roboto-Medium' : 'System',
            fontSize: 12,
            fontWeight: '400'
        },
        data: {
            color: '#000000',
            fontSize: 15,
            fontFamily: Platform.OS == 'android' ? 'Roboto-Medium' : 'System',
            fontWeight: '500'
        }
    })
    return (
        <TouchableOpacity style={[style, styles.background]} onPress={()=>Linking.openURL(link)}>
            <Text style={styles.data}>{data}</Text>
            <Text style={styles.name}>{name}</Text>
        </TouchableOpacity>
    )
}

export default memo(TextLink)