import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ButtonPlus } from './assets';

export default function ({ style, onPress }) {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <ButtonPlus />
    </TouchableOpacity>
  );
}
