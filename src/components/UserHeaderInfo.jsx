import React, { memo } from 'react'
import { Text, Image, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native';

export function UserHeaderInfo({ style, name, uid, photo }) {
    const user = useSelector(state => state.user)
    const navigation = useNavigation()
    if (!photo) photo = user.photo
    if (!uid) uid = user.uid
    const styles = StyleSheet.create({
        background: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        text: {
            color: '#FFFFFF',
            fontFamily: Platform.OS == 'android' ? 'Roboto-Medium' : 'System',
            fontSize: 15,
            fontWeight: '500',
            marginRight: 7

        },
        image: {
            width: 40,
            height: 40,
            borderRadius: 20,
            borderColor: '#FFFFFF',
            borderWidth: 2
        }
    })

    return (
      <TouchableOpacity style={styles.background} onPress={()=>navigation.navigate('Social', { screen: 'Profile', params: { uid } })}>
        <Text style={styles.text}>{name ?? user.name ?? user.login}</Text>
        <Image source={ photo ? { uri: `data:image/png;base64, ${photo}` } : require('~assets/User.png')} style={styles.image}/>
      </TouchableOpacity>
    );
}

export default memo(UserHeaderInfo)