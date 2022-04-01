import React, { memo } from 'react'
import { View, StyleSheet, Text, Platform } from 'react-native'

export function Part ({ style, children, title }) {
    const styles = StyleSheet.create({
        background: {
        },
        title: {
            fontFamily: Platform.OS == 'android' ? 'Roboto-Medium' : 'System',
            fontSize: 14,
            fontWeight: '600',
            color: '#75B904'
        }
    })

    return (
        <View style={[styles.background, style]}>
            <Text style={styles.title}>{title}</Text>
            {
                children
            }
        </View>
    )
} 

export default memo(Part)