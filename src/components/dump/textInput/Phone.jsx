import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, Platform } from 'react-native';
import { i18n } from '~services';

const region = { ru: '+7 ' };

export default function ({ style, returnPhone, onBlur, initPhone }) {
  const regionPhone = region[i18n.locale] ?? region.ru;
  const [phone, setPhone] = useState(regionPhone);

  const styles = StyleSheet.create({
    inputphone: {
      color: '#FFFFFF',
      fontFamily: Platform.OS == 'android' ? 'Roboto-Medium' : 'System',
      fontSize: 14,
      width: '100%',
      padding: 14,
      borderRadius: 10,
      borderColor: '#CBE1A8',
      borderWidth: 1,
      borderStyle: 'solid',
      backgroundColor: 'rgba(240, 242, 238, 0.19)',
      height: 45,
    },
  });

  const inputPhone = (number) => {
    if (number.length < regionPhone.length) {
      setPhone(regionPhone);
      returnPhone(regionPhone);
    } else {
      number = number.slice(regionPhone.length).replace(/[^\d]/g, '');
      let part1 = number.slice(0, 3);
      let part2 = number.slice(3, 6);
      let part3 = number.slice(6, 8);
      let part4 = number.slice(8);
      if (number.length > 3) {
        part1 += ') ';
      }
      if (number.length > 6) {
        part2 += '-';
      }
      if (number.length > 8) {
        part3 += '-';
      }
      const beautifulNumber = regionPhone + '(' + part1 + part2 + part3 + part4;
      setPhone(beautifulNumber);
      returnPhone(`${regionPhone}${number}`.replace(' ', ''));
    }
  };

  useEffect(()=>{
    if(initPhone) inputPhone(initPhone); 
  }, [setPhone])

  return (
    <TextInput
      style={[style, styles.inputphone]}
      onChangeText={inputPhone}
      value={phone}
      maxLength={15 + regionPhone.length}
      keyboardType="phone-pad"
      onBlur={onBlur}
    />
  );
}
