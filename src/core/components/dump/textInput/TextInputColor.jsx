import React, { useMemo } from 'react';
import { TextInput, StyleSheet, Platform } from 'react-native';

export default function ({ style, initValue, onChangeValue, placeholder, colorShema='white', onBlur, autoFocus, onPress, maxLength=256 }) {
  const styles = StyleSheet.create({
    textInput: {
      width: '100%',
      height: 45,
      borderRadius: 10,
      borderWidth: 1,
      borderStyle: 'solid',
      paddingHorizontal: 16,
      justifyContent: 'center',
      fontFamily: Platform.OS === 'android' ? 'Roboto-Medium' : 'System',
      fontWeight: '500',
      fontSize: 11,
    },
  });
  const color = useMemo(() => {
    switch (color) {
      case 'white':
        return { borderColor: '#CBE1A8', color: '#FFFFFF', backgroundColor: 'rgba(240, 242, 238, 0.19)' };

      default:
        return { borderColor: '#CBE1A8', color: '#FFFFFF', backgroundColor: 'rgba(240, 242, 238, 0.19)' };
    }
  }, [colorShema]);

  return (
    <TextInput
      style={[styles.textInput, style, color]}
      defaultValue={initValue}
      onChangeText={onChangeValue}
      placeholder={placeholder}
      onBlur={onBlur}
      autoFocus={autoFocus}
      onPressIn={onPress}
      maxLength={maxLength}
    />
  );
}
