import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function ({ price, style, children }) {
  const styles = StyleSheet.create({
    background: {
      backgroundColor: '#FFFFFF',
      flex: 1,
    },
  });
  if (price && (price.price >= 3000 && price.currency == 'RUB')) {
    return (
      <LinearGradient
        style={style}
        colors={[
          'rgba(234, 185, 60, 1)',
          'rgba(255, 213, 106, 1)',
          'rgba(255, 214, 107, 1)',
          'rgba(193, 150, 38, 1)',
        ]}>
        {children}
      </LinearGradient>
    );
  }

  return (
    <View style={[style, { backgroundColor: '#FFFFFF' }]}>{children}</View>
  );
}
