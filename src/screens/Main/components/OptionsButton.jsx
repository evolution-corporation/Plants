import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Options } from './assets'

export default function ({ style }) {
    const navigation = useNavigation()
    const styles = StyleSheet.create({
        background: {
            padding: 2
        }
    })
    return (
        <TouchableOpacity onPress={()=>navigation.navigate('OptionsApp')} style={[style, styles.background]}>
            <Options />
        </TouchableOpacity>
    )
}