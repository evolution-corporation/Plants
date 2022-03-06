import React, { useState, useCallback, memo } from 'react'
import { View, FlatList, Text, StyleSheet, Platform } from 'react-native'
import { database, i18n } from '~services'
import { InputMessage, ChatBackground } from '~components'
import ErrorMessage from '~assets/ErrorMessage.svg'
import { useFocusEffect, useIsFocused } from '@react-navigation/native'

export function Chat({ navigation, route }) {
    const [messages, setMessages] = useState([])
    const isFocused = useIsFocused()
    
    const styles = StyleSheet.create({
        background: {
            justifyContent: 'space-between',
            flex: 1,
            paddingHorizontal: 10,
            paddingBottom: 30
        },
        messages: {
            borderRadius: 19.5,
            maxWidth: '50%',
            paddingHorizontal: 9,
            paddingVertical: 5,
            marginVertical: 3.5
        },
        messageText: {
            fontSize: 12,
            fontFamily: Platform.OS == 'android' ? 'Roboto-Medium' : 'System',
            fontWeight: '500'
        },
        messagesMy: {
            backgroundColor: '#75B904',            
            alignSelf: 'flex-end',
        },
        messagesOtherUser: {
            backgroundColor: '#FFFFFF',
            alignSelf: 'flex-start'
        },
        noMessageBackground: {
            backgroundColor: 'rgba(255, 255, 255, 0.24)',
            borderRadius: 20,
            paddingHorizontal: 18,
            paddingTop: 27,
            paddingBottom: 21,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            width: '50%'
        },
        noMessageText: {
            textAlign: 'center',
            color: '#FFFFFF',
            fontSize: 15,
            fontWeight: '600',
            fontFamily: Platform.OS == 'android' ? 'Roboto-Medium' : 'System',
            marginBottom: 25
        }
    })

    useFocusEffect(useCallback(()=> {
        if (!route.params.chatId) {
          database.chat.getChatsBetweenMeAndUser({ uid: route.params.userId }).then(async (chat) => {
            
            if (chat) {
                if (isFocused) navigation.setParams({ chatId: chat.id });
            } else {
                const chatId = await database.chat.createChat({ userId: route.params.userId });
                if (isFocused) navigation.setParams({ chatId })
            }
          });
        } else {
            let subscribe = database.chat.subscribeGetMessageByChat({ id: route.params.chatId, callback: (payload) => {
                if(isFocused) setMessages(payload)
            } })
            return () => {
              if (subscribe) subscribe();
            };
        }
    }, [route.params.chatId]))

    return (
      <ChatBackground style={styles.background}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {messages.length > 0 ? (
            <FlatList
              data={messages}
              refreshing={true}
              style={{ width: '100%' }}
              contentContainerStyle={{ flex: 1, justifyContent: 'flex-end' }}
              renderItem={({ item, index }) => (
                <View
                  key={index.toString()}
                  style={[styles.messages, item.isMy ? styles.messagesMy : styles.messagesOtherUser]}>
                  <Text style={[styles.messages, { color: item.isMy ? '#FFFFFF' : '#000000' }]}>{item.text}</Text>
                </View>
              )}
            />
          ) : (
            <View style={styles.noMessageBackground}>
              <Text style={styles.noMessageText}>
                {i18n.t('660163b0-4151-4736-9dc8-1c31cfd48793', { name: route.params.name })}
              </Text>
              <ErrorMessage />
            </View>
          )}
        </View>
        <InputMessage
          onPress={(message) =>
            database.chat.sendMessages({ chatId: route.params.chatId, userId: route.params.userId, message })
          }
        />
      </ChatBackground>
    );
}

export default memo(Chat)