import { useNavigation } from '@react-navigation/native';
import React, { memo } from 'react'
import { TouchableOpacity } from 'react-native'
import Message from '~assets/Message.svg';

export function MessageButton({ id, avatar, style, name }){
    const navigation = useNavigation()

    return (
      <TouchableOpacity style={style} onPress={() => navigation.navigate('Chat', { userId: id, photo: avatar, name: name })}>
        <Message />
      </TouchableOpacity>
    );
}

export default memo(MessageButton)