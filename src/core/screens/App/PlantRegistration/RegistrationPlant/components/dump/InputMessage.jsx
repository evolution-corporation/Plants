import React, { useState } from 'react';
import { TextInput, StyleSheet, Platform, View, Image, Dimensions, TouchableOpacity, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { i18n } from '~services';
import { actions } from '~store'

export default function ({ photo, style, children }) {
  const [isShowMessageInput, setIsShowMessageInput] = useState(false);
  const message = useSelector(state => state.plant.message);
  const compact = useSelector(state => state.navigator.compact)
  const dispatch = useDispatch()
  
  const styles = StyleSheet.create({
    background: {
      width: '100%',
      flexGrow: 1
    },
    textInput: {
      color: 'rgba(255,255,255,0.88)',
      fontFamily: Platform.OS == 'android' ? 'Roboto-Medium' : 'System',
      fontSize: 14,
      width: '100%',
      padding: 14,
      borderRadius: 10,
      borderColor: '#FFFFFF',
      borderWidth: 1,
      borderStyle: 'solid',
      backgroundColor: 'rgba(201, 201, 201, 0.26)',
      textAlign: 'left',
      textAlignVertical: 'top',
      flexGrow: 1
    },
    card: {
      marginTop: 30,
      width: Dimensions.get('screen').width - (compact ? 60 : 120),
      height: Dimensions.get('screen').width - (compact ? 60 : 120),
      borderRadius: 40,
      borderColor: '#FFFFFF',
      borderWidth: 4,
      overflow: 'hidden',
      alignSelf: 'center',
    },
    messageInput: {
      width: '100%',
      height: '100%',
      backgroundColor: '#FFFFFF',
      color: '#506531',
      padding: 33,
      textAlign: 'left',
      textAlignVertical: 'top',
    },
    textLengt: {
      position: 'absolute',
      color: '#506531',
      bottom: 20,
      left: 35,
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    button: {
      borderTopLeftRadius: 40,
      borderBottomLeftRadius: 40,
      backgroundColor: '#506531',
      position: 'absolute',
      bottom: 0,
      right: 0,
      paddingVertical: 16,
      paddingHorizontal: 20,
    },
    buttonText: {
      fontFamily: Platform.OS === 'android' ? 'Roboto-Medium' : 'System',
      fontSize: 13,
      color: '#FFFFFF',
      fontWeight: '500',
    },
  });

  if (compact) {
    return (
      <View style={[style, styles.background]}>
        <View style={styles.card}>
          {isShowMessageInput ? (
            <View>
              <TextInput
                value={message}
                style={[styles.messageInput]}
                placeholder={i18n.t('b6d70a88-7030-11ec-90d6-0242ac120003')}
                onChangeText={(text)=>dispatch(actions.addPlantData({ message: text }))}
                maxLength={240}
                // onBlur={() => dispatch(actions.addPlantData({ message }))}
              />
              <Text style={styles.textLengt}>{message.length} / 240</Text>
            </View>
          ) : (
            <Image source={{ uri: `data:image/png;base64, ${photo}` }} style={styles.image} resizeMode={'cover'} />
          )}
          <TouchableOpacity style={styles.button} onPress={() => setIsShowMessageInput(!isShowMessageInput)}>
            <Text style={styles.buttonText}>
              {isShowMessageInput
                ? i18n.t('fbdd04dc-881e-4f7e-9a58-ae89f7cdef6f')
                : i18n.t('91853113-b8c5-4e46-b69a-1f99920415d9')}
            </Text>
          </TouchableOpacity>
        </View>
        {children}
      </View>
    );
  }

  return (
    <View style={[style, styles.background]}>
      <Image
        source={{ uri: `data:image/png;base64, ${photo}` }}
        style={[styles.image, styles.card]}
        resizeMode={'cover'}
      />
      {children}
      <TextInput
        style={[styles.textInput]}
        onChangeText={(text) => dispatch(actions.addPlantData({ message: text }))}
        placeholder={i18n.t('b6d70a88-7030-11ec-90d6-0242ac120003')}
        placeholderTextColor={'#FFFFFF'}
        maxLength={240}
        // onBlur={() => dispatch(actions.addPlantData({ message }))}
      />
    </View>
  );
}
