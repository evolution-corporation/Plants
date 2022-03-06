import React from 'react'
import { TouchableOpacity, StyleSheet, Text } from 'react-native'
import Pencial from '~assets/Pencial.svg'

export default function EditButton ({ onPress, style, title=null }) {
    const styles = StyleSheet.create({
        background: {
            padding: 5,
            alignItems: 'center',
            justifyContent: 'center',
        },
        text: {

        }
    })
    
    return (
        <TouchableOpacity style={[style, styles.background]} onPress={onPress}>
            {
                title ? <Text style={styles.text}>{title}</Text> : <Pencial />
            }
        </TouchableOpacity>
    )
}