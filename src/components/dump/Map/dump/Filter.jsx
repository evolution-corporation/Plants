import React, { useState, useRef } from 'react';
import { Pressable, Animated, View, StyleSheet } from 'react-native';
import { GrayTree, GreenTree } from './assets';

export default function ({ style, onChange }) {
  const [state, setState] = useState(true);

  const _position = useRef(new Animated.Value(0)).current;

  const styles = StyleSheet.create({
    image: {
      width: 37,
      height: 37,
      alignItems: 'center',
      justifyContent: 'center',
    },
    background: {
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'rgba(239, 239, 239, 0.75)',
      borderRadius: 22.5,
      width: 43,
      height: 83,
      padding: 3,
    },
    circle: {
      width: 15,
      height: 15,
      borderRadius: 7.5,
      borderWidth: 3,
      borderStyle: 'solid',
      backgroundColor: '#FFFFFF',
    },
    circleAnimation: {
      backgroundColor: '#FFFFFF',
      width: 37,
      height: 37,
      borderRadius: 18.5,
      position: 'absolute',
      bottom: 3
    },
  });
  
  const change = () => {
    if (state) {
      Animated.timing(_position, {
        toValue: -40,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setState(false);
      });
      onChange('Reserved');
    } else {
      Animated.timing(_position, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setState(true);
      });
      onChange(null);
    }
  };

  return (
    <Pressable style={[style, styles.background]} onPress={change}>
      <Animated.View style={[styles.circleAnimation, { transform: [{ translateY: _position}] }]} />
      <View style={styles.image}>
        <View
          style={[
            styles.circle,
            { borderColor: !state ? '#75B904' : '#9D9D9D' },
          ]}
        />
      </View>
      <View style={styles.image}>
        {state ? <GreenTree /> : <GrayTree />}
      </View>
    </Pressable>
  );
}
