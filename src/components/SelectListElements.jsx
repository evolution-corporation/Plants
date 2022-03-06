import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SelectElemet } from './dump';

export default function ({
  type,
  size,
  margin,
  style,
  count,
  selectedIndex,
  selectColor,
  noSelectColor,
}) {
  const styles = StyleSheet.create({
    background: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    elemet:
      type === 'circle'
        ? {
            height: size ?? 11,
            width: size ?? 11,
            marginHorizontal: margin ?? 2.25,
            borderRadius: size ? size / 2 : 5.5,
          }
        : {},
  });
  const listIndex = [];
  for (let i = 0; i < count; i++) {
    listIndex.push(i);
  }
  return (
    <View style={[style, styles.background]}>
      {listIndex.map((item, index) => (
        <SelectElemet
          style={styles.elemet}
          isSelected={selectedIndex == index}
          selectColor={selectColor}
          noSelectColor={noSelectColor}
        />
      ))}
    </View>
  );
}
