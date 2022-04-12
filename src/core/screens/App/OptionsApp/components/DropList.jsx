import React, { useState, useEffect, useRef, memo } from 'react'
import { View, Text, StyleSheet, Animated, Platform } from 'react-native'
import { BaseButtonOption } from './BaseButtonOption.jsx';
import { Open } from './assets'

export function DropList({ style, children, name, image, description, onOpen, isShowDropList }) {
    const isShow = useRef(new Animated.Value(0)).current
    const content = useRef()
    const [status, setStatus] = useState(false)
    const styles = StyleSheet.create({ 
        background: {
        },
        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 1
        },
        content: {
            opacity: isShow,
            maxHeight: isShow.interpolate({ inputRange: [0, 1], outputRange: [0, 500] })
        },
        description: {
            color: '#858585',
            fontFamily: Platform.OS == 'android' ? 'Roboto-Medium' : 'System',
            fontSize: 12,
            fontWeight: '400'
        }
    })

    useEffect(() => {
        if (status && isShowDropList) {
            setStatus(true)
            Animated.timing(isShow, { useNativeDriver: false, toValue: 1 }).start()
        } else {
            Animated.timing(isShow,{ useNativeDriver: false, toValue: 0 }).start(()=>setStatus(false))
        }
        return () => {


        }
    }, [status, isShowDropList])


    return (
        <View style={styles.background}>
            <View style={styles.header}>
                <BaseButtonOption name={name} image={image} onPress={()=>{setStatus(!status), onOpen()}} style={{ flex: 1 }}/>
                <Animated.View style={{ transform: [{ rotateZ: isShow.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '90deg'] }) }] }}>
                    <Open />
                </Animated.View>
            </View>
            <Animated.View style={styles.content} ref={content}>
                <Text style={styles.description}>{description}</Text>
                {children}
            </Animated.View>
        </View>
    )
}

export default memo(DropList)