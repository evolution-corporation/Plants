import React, { useRef } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

export default function ({ style, event }) {
  const listIndex = [0, 1, 2, 3, 4, 5];
  const listRef = listIndex.map(() => useRef());
  const code = listIndex.map(() => null);
  const styles = StyleSheet.create({
    self: {
      width: 29,
      height: 37,
      backgroundColor: 'rgba(255, 255, 255, 0.43)',
      borderRadius: 4,
      margin: 3,
      textAlign: 'center',
      color: '#FFFFFF',

      fontSize: 15,
    },
  });

  const inputNumber = (index, text) => {
    code[index] = text.length == 0 ? null : text;
    if (text.length == 0) return;
    if (index < 5) {
      listRef[index + 1].current.focus();
    } else {
      event(code.toString().replace(/[^0-9]/g, '')).catch((status) => {
        if (status == 'auth/invalid-verification-code') {
          alert('Код введен не верно');
          listRef.map((item) => {
            item.current.clear();
          });
          listRef[0].current.focus();
        } else {
          console.log('ERORR___:' + status);
        }
      });
    }
  };
  const back = ({ key }, index) => {
    if (key == 'Backspace') {
      if (index == 5 && code[5] == null) {
        listRef[index - 1].current.focus();
      } else if (index > 0 && index < 5) {
        listRef[index - 1].current.focus();
      }
    }
  };

  return (
    <View
      style={[{ flexDirection: 'row', justifyContent: 'space-evenly' }, style]}
    >
      {listIndex.map((item) => (
        <TextInput
          key={item.toString()}
          style={styles.self}
          ref={listRef[item]}
          maxLength={1}
          keyboardType={'numeric'}
          onChangeText={(text) => inputNumber(item, text)}
          onKeyPress={({ nativeEvent }) => {
            back(nativeEvent, item);
          }}
        />
      ))}
    </View>
  );
}
