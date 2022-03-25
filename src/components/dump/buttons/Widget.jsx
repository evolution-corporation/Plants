import React, { useRef, memo, useState, useEffect } from 'react'
import { Animated, StyleSheet, TouchableOpacity, View, Dimensions, Pressable } from 'react-native'

export function Widget({ style, children, onPress, index, isCompact = false }) {
  const [isShow, setIsShow] = useState(!isCompact)
  const width = useRef(new Animated.Value(isCompact ? 62 : 226)).current;
  const widthParent = Dimensions.get('window').width - 40 - 62
  const styles = StyleSheet.create({
    background: {
      borderRadius: 20,
      height: 100,
      overflow: 'hidden',
      flexDirection: 'row',
      paddingVertical: 11,
      paddingHorizontal: 18,
      position: 'absolute',
      top: 20,
    },
    image: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: 62,
      height: 100,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  useEffect(()=> {
    if(isCompact) {
      setIsShow(false)
      Animated.timing(width, { toValue: 62, useNativeDriver: false }).start()  
    } else {
      Animated.timing(width, { toValue: 226, useNativeDriver: false }).start(()=>setIsShow(true))
    }
    return () => {

    }
  }, [isCompact])

  if (Array.isArray(children)) {
    return (
      <Pressable onPressIn={isCompact ? onPress : null}>
        <Animated.View style={[style, styles.background, { width, left: width.interpolate({ outputRange: [widthParent - 32 * index, 0], inputRange: [62, 226] }) }]}>
          <Animated.View style={[styles.image, { transform: [{ scale: width.interpolate({ outputRange: [0.9, 1], inputRange: [62, 226] }) }] }]}>
            {children[0]}
          </Animated.View>
          <View style={{ marginLeft: 51 }}>
          {isShow ? children.slice(1) : null}
          </View>
        </Animated.View>
      </Pressable>
    );
  } else {
    return (
      <Pressable onPressIn={isCompact ? onPress : null}>
        <Animated.View style={[style, styles.background, { width }]}>{children}</Animated.View>
      </Pressable>
    );
  }
}

export default memo(Widget);