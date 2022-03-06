import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Animated, View } from 'react-native';
import { Shadown, Indicator } from './assets';

export default function ({ style, status }) {
  const _position = useRef(new Animated.Value(0)).current;

  const styles = StyleSheet.create({
    indicator: {
      position: 'absolute',
      alignSelf: 'center',
      bottom: 8
    },
    shadown: {
      position: 'absolute',
      alignSelf: 'center',
      bottom: 0,
    },
  });
  useEffect(() => {
    if (status) {
      Animated.timing(_position, {
        toValue: -10,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(_position, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }

    return () => {};
  }, [status]);

  return (
    <View style={style}>
      <Animated.View style={[{ transform: [{ rotateZ: '70deg' }] }]}>
        <Shadown />
      </Animated.View>
      <Animated.View style={[styles.indicator, { transform: [{ translateY: _position }] }]}>
        <Indicator />
      </Animated.View>
    </View>
  );
}
