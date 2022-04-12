import React from 'react'
import { View, Text, Image, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';

import { i18n } from '~services' 


export default function({ users, style }) {
    const navigation = useNavigation()

    const styles = StyleSheet.create({
        background: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        image: {
            width: 64,
            height: 64,
            borderRadius: 32,
            borderColor: '#C4C4C4',
            resizeMode: 'cover'
        },
        login: {
            color: '#000000',
            fontSize: 18,
            fontFamily: Platform.OS === 'android' ? 'Roboto-Medium' : 'System',
            fontWeight: '500',
        },
        countPlant: {
            color: '#000000',
            fontSize: 14,
            fontFamily: Platform.OS === 'android' ? 'Roboto-Regular' : 'System',
            fontWeight: '400'
        },
        text: {
            height: '100%',
            flex: 1,
            marginLeft: 20,
            paddingTop: 7,
            justifyContent: 'space-between'
        }
    })

    if (users.length == 1) {
        return (
            <TouchableOpacity style={[styles.background, style]} onPress={()=>{navigation.navigate('Social', { screen: 'Profile', params: users[0] })}}>
                <Image style={styles.image} source={users[0].avatar ? { uri: `data:image/png;base64, ${users[0].avatar}`} : require('~assets/User.png')} />
                <View style={styles.text}>
                    <Text style={styles.login} >{users[0].login}</Text>
                    <Text style={styles.countPlant} >{i18n.t('tree', { count: users[0].plantCount})}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}