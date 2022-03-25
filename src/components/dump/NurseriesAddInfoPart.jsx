import React, { memo, useRef, useEffect, useReducer } from 'react';
import { View, StyleSheet, Text, Animated, Platform } from 'react-native';
import { i18n } from '~services';
import { ColorButton, EditButton } from './buttons'

export function NurseriesAddInfoPart({ hideButton, style, title, children, hiddenTitle=false, onPress, textButton=i18n.t('next'), visable=true, permission=true, isEdit=false, editMode=true, onPressEdit }) {
    const show = useRef(new Animated.Value(0)).current
    const [state, dispatch] = useReducer((state, { payload, type }) => {
      switch (type) {
        case 'showButton':
          if (hiddenTitle) {
            return { ...state, showButton: false, showTitle: false, editMode: false };
          } else {
            return { ...state, showButton: false }
          };
        case 'editMode':
          return { ...state, editMode: payload }
        default:
          break;
      }
    }, { showTitle: true, showButton: true }, ()=>({ showTitle: !(hideButton && hiddenTitle), showButton: !hideButton }))
    const styles = StyleSheet.create({
        backgroun: {
            opacity: show,
            width: '100%',
            overflow: 'visible',
            paddingHorizontal: 30,
            
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
    if (!Array.isArray(children)) {
      children = [children];
    }
    useEffect(() => {
      
      if (visable) Animated.timing(show, { toValue: 1, useNativeDriver: false }).start();
      
    }, [visable]);
    
    useEffect(()=>{
      dispatch({ type: 'editMode', payload: editMode });
    },[editMode])

    if (!visable) return null
    return (
      <Animated.View style={[style, styles.backgroun]}>
        {title && state.showTitle ? (
          <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={styles.title}>{title}</Text>
            {isEdit && !state.editMode ? <EditButton onPress={onPressEdit} /> : null}
          </View>
        ) : null}

        <View style={styles.content}>
          {state.editMode ? (
            children[0]
          ) : (
            <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
              {children[1]}
              {state.showTitle ? null : <EditButton onPress={onPressEdit} />}
            </View>
          )}
        </View>

        {onPress && state.showButton ? (
          <ColorButton
            text={textButton}
            style={styles.button}
            event={() => {
              if (permission) {
                dispatch({ type: 'showButton' });
                onPress();
              }
            }}
            fullWidth={false}
          />
        ) : null}
      </Animated.View>
    );
}

export default memo(NurseriesAddInfoPart);