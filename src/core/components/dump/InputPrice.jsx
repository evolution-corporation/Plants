import React, { useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default function ({ onChange, styles, currency, isSelected }) {
  const [state, setState] = useState('');

  const styles = StyleSheet.create({
    textInput: {
      height: 67,
      width: 40,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: Platform.OS === 'android' ? 'Roboto-Medium' : 'System',
      fontSize: 12,
      lineHeight: 14,
    },
  });
  const input = (text) => {
    setState(text.replace(/[^0-9]/g, ''));
  };
  const onBlur = () => {
    onChange(state);
    setState(currency === 'RUB' ? `${state} ₽` : `$ ${state}`);
  };
  onFocus = () => {
    setState(state.replace(/[^0-9]/g, ''));
  };
  return (
    <TextInput
      style={[
        styles.textInput,
        {
          backgroundColor: isSelected ? '#9FDE13' : '#FFFFFF',
          color: isSelected ? '#FFFFFF' : '#4C4C4C',
        },
      ]}
      value={state}
      onChange={input}
      onBlur={onBlur}
      onFocus={onFocus}
    />
  );
}
