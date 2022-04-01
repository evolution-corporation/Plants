import React from 'react';
import { Pressable, Text, StyleSheet, Platform } from 'react-native';

import type { FC } from 'react'
import type { TextStyle } from 'react-native'

interface TextHrefProps {
  style?: TextStyle,
  text: string,
  onPress: Function
}

const styles = StyleSheet.create({
    text: {
      fontWeight: '500',
      fontSize: 14,
      color: '#4C4C4C',
      fontStyle: 'normal',
      textAlign: 'center',
      fontFamily: Platform.OS == 'android' ? 'Roboto-Medium' : 'System',
    },
    backGround: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

const TextHref: FC<TextHrefProps> = ({ onPress, style, text }: TextHrefProps) => {
  
  return (
    <Pressable style={[styles.backGround, style]} onPress={()=>onPress()}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

export default TextHref