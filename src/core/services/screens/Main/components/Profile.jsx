import React from 'react'
import { View, Image, StyleSheet, Text, Platform, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import { i18n } from '~services'
export default function Profile({ style }) {
    const user = useSelector(state => state.user)
    const navigation = useNavigation();

    const styles = StyleSheet.create({
        background: {
            height: 128,
            width: '100%',
            flexDirection: 'row'   
        },
        image: {
            width: 128,
            height: 128,
            borderRadius: 64,
            marginRight: 20,
            borderColor: '#FFFFFF',
            borderWidth: 3
        },
        textProfile: {
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            paddingTop: 26
        },
        name: {
            color: '#86B738',
            fontFamily: Platform.OS == 'android' ? 'Roboto-Bold' : 'Systam',
            fontSize: 20,
            fontWeight: 'bold'
        },
        login: {
            color: '#DBDBDB',
            fontFamily: Platform.OS == 'android' ? 'Roboto-Medium' : 'System',
            fontSize: 12,
            fontWeight: '500'
        },
        category: {
            color: '#86B738',
            fontFamily: Platform.OS == 'android' ? 'Roboto-Bold' : 'System',
            fontSize: 13,
            fontWeight: '700'
        }
    })

    return (
        <TouchableOpacity style={[styles.background, style]} onPress={()=>navigation.navigate('Social', { screen: 'Profile', params: {...user} })}>
            <Image source={user.avatar ? {uri: `data:image/png;base64, ${user.avatar}`} : require('~assets/User.png')} style={styles.image} />
            <View style={styles.textProfile}>
                <Text style={styles.name}>{user.name ?? user.login}</Text>
                <Text style={styles.login}>{user.login}</Text>
                <Text style={styles.category}>{user.category ? i18n.t(user.category) : null}</Text>
            </View>
        </TouchableOpacity>
    )
} 