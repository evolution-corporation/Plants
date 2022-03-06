import React, { useState, useEffect } from 'react';
import { View, Text, Platform } from 'react-native';
import ScrollPicker from 'react-native-picker-scrollview';

export default function ({ Dates, initialDate, onChangeDate, style }) {
  const [select, setSelect] = useState(initialDate);
  return (
    <ScrollPicker
      style={style}
      dataSource={Dates}
      selectedIndex={Dates.indexOf(initialDate)}
      itemHeight={50}
      wrapperHeight={122}
      highlightColor={'#FFFFFF'}
      wrapperColor={'transparent'}
      renderItem={(data, index, isSelected) => {
        return (
          <View>
            <Text
              style={{
                color: data == select ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)',
                fontFamily:
                  Platform.OS == 'android' ? 'Roboto-Medium' : 'System',
                fontSize: 11,
                fontStyle: 'normal',
              }}
            >
              {data}
            </Text>
          </View>
        );
      }}
      onValueChange={(data, selectedIndex) => {
        setSelect(data);
        onChangeDate(data);
      }}
    />
  );
}
