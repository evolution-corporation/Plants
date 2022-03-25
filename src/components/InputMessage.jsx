import React, { memo, useState } from 'react';
import { View, TextInput, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { i18n } from '~services';
import MessageIcon from '~assets/MessageIcon.svg';


export function InputMessage({ style, onPress }) {
    const [message, setMessage] = useState('');
    const styles = StyleSheet.create({
        background: {
            backgroundColor: '#F3F3F3',
            borderRadius: 24,
            width: '100%',
            height: 48,
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 30,
            paddingRight: 7
        },
        input: {
            flex: 1
        }
    })

    const sumbitMessage = () => {
      onPress({ text: message, type: 'text' });
      setMessage('');
    }

    return (
      <View style={styles.background}>
        <TextInput
          style={styles.input}
          placeholderTextColor={'#969696'}
          placeholder={i18n.t('b69a595e-ce0f-4dff-893c-155f2743e144')}
          onChangeText={setMessage}
          value={message}
          keyboardType={'default'}
          // onKeyPress={({ nativeEvent: { key } }) => { console.log(key);if (key == 'Enter') sumbitMessage()}}
          returnKeyType={'send'}
        />
        <TouchableOpacity onPress={sumbitMessage}>
          <MessageIcon />
        </TouchableOpacity>
      </View>
    );
}

export default memo(InputMessage)