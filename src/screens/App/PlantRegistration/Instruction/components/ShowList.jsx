import React, { useEffect, useState, useRef } from 'react'
import { StyleSheet, Animated, View, Dimensions, Button } from 'react-native'


//! Пока что будет под конретную задачу
export default function ({ style, children, page }) {
    const position = useRef(new Animated.Value(0)).current;
    const nextPage = () => {
        Animated.timing(position, {
          toValue: page * -Dimensions.get('window').width,
          useNativeDriver: false,
          duration: 200,
        }).start();
    }

    const styles = StyleSheet.create({
      background: {
        width: children.length * Dimensions.get('window').width,
        // height: '100%',
        flexDirection: 'row',
      },
      page: {
          width: Dimensions.get('window').width
      }
    });
    
    useEffect(()=> {
        if (page < children.length ) nextPage()
    }, [page])

    return (
      <View style={[style, styles.background]}>
        <Animated.View style={[styles.background, { transform: [{ translateX: position }] }]}>
          {children.map((component, index) => (
            <View key={index} style={styles.page}>{component}</View>
          ))}
        </Animated.View>
      </View>
    );
}