import React, { useState, useCallback, memo, useRef } from 'react'
import { View, FlatList, Text, StyleSheet, Platform, StatusBar } from 'react-native'
import { database, i18n } from '~services'
import { InputMessage, ChatBackground } from '~components'
import ErrorMessage from '~assets/ErrorMessage.svg'
import { useFocusEffect, useIsFocused } from '@react-navigation/native'
import { useEffect } from 'react'

export function Chat({ navigation, route }) {
    const [messages, setMessages] = useState([])
    const [isEnd, setIsEnd] = useState(true)
    const flatList = useRef()
    const isFocused = useIsFocused()
    StatusBar.setBackgroundColor('#678933');
    StatusBar.setBarStyle('light-content')
    const styles = StyleSheet.create({
        background: {
            justifyContent: 'space-between',
            flex: 1,
            paddingHorizontal: 10,
            paddingBottom: 30
        },
        messages: {
            borderRadius: 19.5,
            maxWidth: '90%',
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
      let subscribe = null
        if (route.params.chatId == undefined) {
          database.chat.getChatsBetweenMeAndUser({ uid: route.params.userId }).then((chat) => {
            if (chat) {
              navigation.setParams({ chatId: chat.id });
            } else {
              subscribe = database.chat.subscribeGetChatId({ uid: route.params.userId, callback: (chatId) => {
                if (isFocused) {
                  navigation.setParams({ chatId: chatId });
                }
              } });
            }
          })
        } else {
            subscribe = database.chat.subscribeGetMessageByChat({ id: route.params.chatId, callback: (payload) => {
                if(isFocused) setMessages(payload)
            } })
            return () => {
              if (subscribe) subscribe();
            };
        }
    }, [route.params.chatId]))

    useEffect(()=>{
      if (isEnd) {
        flatList.current?.scrollToEnd()
      }
    },[messages])

    return (
      <ChatBackground style={styles.background}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {messages.length > 0 ? (
            <FlatList
              ref={flatList}
              data={messages}
              refreshing={true}
              style={{ width: '100%' }}
              // contentContainerStyle={{ flex: 1, justifyContent: 'flex-end' }}
              showsVerticalScrollIndicator={false}
              onEndReached={() => setIsEnd(true)}
              disableIntervalMomentum={true}
              onMomentumScrollBegin={()=> setIsEnd(false)}
              renderItem={({ item, index }) => (
                <View
                  key={index.toString()}
                  style={[styles.messages, item.isMy ? styles.messagesMy : styles.messagesOtherUser]}>
                  <Text style={[styles.messages, { color: item.isMy ? '#FFFFFF' : '#000000' }]}>{item.message.text}</Text>
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
          onPress={(message) =>{
            flatList.current?.scrollToEnd();
            database.chat.sendMessages({ chatId: route.params.chatId, userId: route.params.userId, message })
          }}
        />
      </ChatBackground>
    );
}

export default memo(Chat)