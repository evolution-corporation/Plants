import React, { memo, useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, Animated, Platform } from 'react-native';
import { i18n } from '~services';
import { ColorButton } from './buttons'

export function NurseriesAddInfoPart({ style, title, children, hiddenTitle=false, onPress, textButton=i18n.t('next'), visable=true, rigthTitle=null, childrenStyle }) {
    const show = useRef(new Animated.Value(0)).current
    const [showTitle, setShowTitle] = useState(true)
    const [showButton, setShowButton] = useState(true)
    const styles = StyleSheet.create({
        backgroun: {
            opacity: show,
            width: '100%',
            overflow: 'visible'
        },
        title: {
            color: '#FFFFFF',
            fontSize: 24,
            fontFamily: Platform.OS == 'android' ? 'Roboto-Bold' : 'System',
            fontWeight: '700'
        },
        content: {
            marginVertical: 17,
        },
        button: {
            paddingHorizontal: 21,
            color: '#4C4C4C',
            backgroundColor: '#EFEFEF'
        }
    })


    useEffect(() => {
      if (visable) Animated.timing(show, { toValue: 1, useNativeDriver: false }).start();
    }, [visable]);
    
    if (!visable) return null
    return (
      <Animated.View style={[style, styles.backgroun]}>
        {title && showTitle ? (
          <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={styles.title}>{title}</Text>
            {rigthTitle}
          </View>
        ) : null}
        <View style={[childrenStyle, styles.content]}>{children}</View>
        {showButton ? (
          <ColorButton
            text={textButton}
            style={styles.button}
            event={
              onPress
                ? () => {
                    if (hiddenTitle) setShowTitle(false);
                    setShowButton(false);
                    onPress();
                  }
                : null
            }
            fullWidth={false}
          />
        ) : null}
      </Animated.View>
    );
}

export default memo(NurseriesAddInfoPart);