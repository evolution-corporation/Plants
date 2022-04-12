import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  Platform,
} from 'react-native';

export default function ({ onChange, style, text, fullWidth }) {
  const showTopBotton = useRef(new Animated.Value(1)).current; // true
  const showBottomBotton = useRef(new Animated.Value(1)).current; // false

  const [state, setState] = useState(null);
  const styles = StyleSheet.create({
    backGround: {
      marginTop: 25,
    },
    text: {
      color: '#FFFFFF',
      fontSize: 24,
      fontWeight: '900',
      lineHeight: 29,
      marginBottom: 26,
      fontFamily: Platform.OS === 'android' ? 'Roboto-Black' : 'System',
    },
    button: {
      borderRadius: 10,
      backgroundColor: '#EFEFEF',
      paddingTop: 14,
      paddingBottom: 14,
      paddingHorizontal: 23,
      marginBottom: 12,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'baseline',
    },
    textButton: {
      color: '#4C4C4C',
      fontSize: 14,
      fontWeight: '500',
      lineHeight: 17,
      fontFamily: Platform.OS === 'android' ? 'Roboto-Medium' : 'System',
    },
  });

  const onPress = (select) => {
    if (typeof state != 'boolean') {
      setState(select);
      onChange(select);
    } else {
      setState(!select);
      onChange(!select);
    }
  }

  return (
    <View style={[styles.backGround, style]}>
      <Text style={styles.text}>{text.title}</Text>
      {typeof state != 'boolean' || state ? 
        <TouchableOpacity
          style={[
            styles.button,
            {
              width: ['all', 'top'].includes(fullWidth) ? '100%' : 'auto',
            },
          ]}
          onPress={() => {
            onPress(true);
          }}
        >
          <Text style={styles.textButton}>{text.topButton}</Text>
        </TouchableOpacity>
        : null
      }
      {
        typeof state != 'boolean' || !state ? 
        <TouchableOpacity
          style={[
            styles.button,
            {
              width: ['all', 'bottom'].includes(fullWidth) ? '100%' : 'auto',
            },
          ]}
          onPress={() => {
            onPress(false);
          }}
        >
          <Text style={styles.textButton}>{text.bottomButton}</Text>
        </TouchableOpacity>
        : null
      }
    </View>
  );
}
