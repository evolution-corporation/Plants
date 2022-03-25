import React, { useCallback, useReducer} from 'react'
import { View, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Image,Text, Platform } from 'react-native'
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { ListUserSearch } from '~components'
import { database } from '~services'

export default function ({ navigation, route }) {
    const [state, dispatch] = useReducer((_state, { type, payload }) => {
      switch (type) {
        case 'loading': return {..._state, isLoading: true }
        case 'setChats': return { ..._state, isLoading: false, chats: payload }
        case 'updateChat':
          const chtats = [ payload, ..._state.chats.filter(item => item.id != payload.id)]
          return { ..._state, isLoading: false, chats: chtats };
      }
    }, { isLoading: true, chats: [] })
    const isFocused = useIsFocused()
    const styles = StyleSheet.create({
      background: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 25,
        paddingTop: 35,
      },
      backgroundUser: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 10,
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
      }
    })
    
    useFocusEffect(useCallback(() => {
      database.chat.subscribeEvent({ callback: (chat) => {
        dispatch({ type: 'updateChat', payload: chat });
      } })
      return () => {
        if (typeof unc == 'function') {
          uns();
        }
      };
    }, [dispatch]));



    return (
      <View style={styles.background}>
        {route.params.isSearch ? (
          <ListUserSearch name={route.params.searchName} />
        ) : (
          <FlatList
            data={state.chats}
            renderItem={({ item }) => (
                <TouchableOpacity style={styles.backgroundUser} onPress={() => navigation.navigate('Chat', { ...item, chatId: item.id })}>
                  <Image
                    source={item.photo ? { uri: `data:image/png;base64, ${item.photo}` } : require('~assets/User.png')}
                    style={styles.image}
                  />
                  <View>
                    <Text style={styles.text}>{item.name}</Text>
                    <Text>{item.lastMessage.length > 20 ? `${item.lastMessage.slice(0, 20)}..` : item.lastMessage}</Text>
                  </View>
                </TouchableOpacity>
              )
            }
          />
        )}
      </View>
    );
}