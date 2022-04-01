import React, { memo, useState, useEffect } from 'react'
import { View, Image, Text, TouchableOpacity, StyleSheet, Platform, FlatList } from 'react-native'
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { database } from '~services'

export function ListUserSearch ({ name }) {
    const [users, setUsers] = useState()
    const isFocused = useIsFocused()
    const navigation = useNavigation()
    const styles = StyleSheet.create({
      background: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 10
      },
      text: {
        color: '#131313',
        fontFamily: Platform.OS == 'android' ? 'Roboto-Medium' : 'System',
        fontSize: 12,
        fontWeight: '500',
      },
      image: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10
      },
    });
    let timer = null
    const clearTimer = () => {
        timer = null
    }
    useEffect(()=>{
        if (name && !timer) {
            if (timer) clearTimeout(timer)
            timer = setTimeout(clearTimer, 500);
            database.findUser({ name }).then((result) => {
              if (isFocused) {
                setUsers(result);
              }
            });
        }
    }, [name])

    return (
        <View>
            <FlatList 
                data={users}
                refreshing={true}
                keyExtractor={item => item.uid}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.background} onPress={()=>navigation.navigate('Chat', { ...item, userId: item.uid })}>
                        <Image source={ item.avatar ? { uri: `data:image/png;base64, ${item.avatar}` } : require('~assets/User.png')} style={styles.image}/>
                        <Text style={styles.text}>{item.login}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

export default memo(ListUserSearch)