import React, { useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { i18n } from '~services'

export default function ({ onChange, style, currency, isSelected }) {
  const [state, setState] = useState('');

  const styles = StyleSheet.create({
    textInput: {
      borderRadius: 10,
      fontFamily: Platform.OS === 'android' ? 'Roboto-Medium' : 'System',
      textAlign: 'center',
      textAlignVertical: 'center',
      fontSize: 12,
      lineHeight: 14,
    },
  });
  const input = (text) => {
    setState(text.replace(/[^0-9]/g, ''));
  };
  const onBlur = () => {
    onChange(state);
    setState(`${state} ${currency}`);
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
        style,
      ]}
      value={state}
      onChangeText={input}
      onBlur={onBlur}
      onFocus={onFocus}
      placeholder={i18n.t('f96c7fda-9c26-4bf4-9701-970267554f4c', { currency })}
    />
  );
}
