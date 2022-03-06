import React, { useState } from 'react';
import { TextInput, StyleSheet, Platform, View, Dimensions, Text } from 'react-native';


export default function ({ placeholder='', style, onChange, maxLength=240, initValue='' }) {
  const [message, setMessage] = useState(initValue);

  const styles = StyleSheet.create({
    card: {
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
      fontFamily: Platform.OS == 'android' ? 'Roboto-Medium' : 'System',
      fontSize: 14,
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
  });

  const editChange = (text) => {
      setMessage(text)
      onChange(text)
  }

  return (
      <View style={[style, styles.card]}>
            <TextInput
              value={message}
              style={[styles.messageInput]}
              placeholder={placeholder}
              onChangeText={editChange}
              maxLength={maxLength}
            />
            <Text style={styles.textLengt}>{message.length} / {maxLength}</Text>
      </View>
    );
  }