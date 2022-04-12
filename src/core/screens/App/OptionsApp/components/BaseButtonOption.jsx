import React, { memo } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'

export function BaseButtonOption({ style={}, name, image, onPress }) {
    const styles = StyleSheet.create({
        background: {
            flexDirection: 'row',
            height: 40,
            alignItems: 'center'
        },
        image: {
            height: 40,
            width: 40,
            justifyContent: 'center',
            alignItems: 'center'
        }, 
        text: {
            color: style.color ?? '#010101',
            fontFamily: Platform.OS === 'android' ? 'Roboto-Medium' : 'System',
            fontSize: 14,
            fontWeight: '500',
        }
    })

    return (
        <TouchableOpacity onPress={onPress} style={[style, styles.background]} key={name}>
            <View style={styles.image}>{image}</View>
            <Text style={styles.text}>{name}</Text>
        </TouchableOpacity>
    )
}

export default memo(BaseButtonOption);