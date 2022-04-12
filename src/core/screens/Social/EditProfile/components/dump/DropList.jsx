import React, { useState, useEffect } from 'react';
import i18n from 'i18n-js';
import {
  View,
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';

export default function ({
  values,
  initValue,
  onChangeValue,
  style,
  name,
  isShowList,
  onOpen,
}) {
  const [state, setState] = useState(initValue ?? null);
  const [isShow, setIsShow] = useState(0);
  const [_isShow, _setIsShow] = useState(false);
  const show = new Animated.Value(isShow);

  const styles = StyleSheet.create({
    background: {
      width: '100%',
    },
    button: {
      width: '100%',
      height: 32,
      alignItems: name ? 'center' : 'flex-start',
      justifyContent: name ? 'space-between' : 'center',
      flexDirection: name ? 'row' : 'column',
    },
    text: {
      color: name ? 'rgba(128, 128, 128, 0.8)' : '#273F00',
      fontWeight: '500',
      fontSize: name ? 11 : 13,
      fontFamily: Platform.OS === 'android' ? 'Roboto-Medium' : 'System',
      textAlign: 'left',
    },
    name: {
      color: '#273F00',
      fontWeight: '500',
      fontSize: 13,
      fontFamily: Platform.OS === 'android' ? 'Roboto-Medium' : 'System',
      textAlign: 'left',
    },
    listValues: {
      borderBottomRightRadius: 20,
      borderBottomLeftRadius: 20,
      borderColor: '#EBEBEB',
      borderWidth: 1,
      borderStyle: 'solid',
      borderTopWidth: 0,
      borderTopColor: 'transparent',
      backgroundColor: '#FFFFFF',
      position: 'absolute',
      top: '100%',
      width: '100%',
      height: 32 * values.length,
      zIndex: 1,
    },
  });

  const RenderItem = ({ name }) => {
    const styles = StyleSheet.create({
      background: {
        width: '100%',
        height: 32,
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingLeft: 10,
      },
      text: {
        color: '#273F00',
        fontWeight: '500',
        fontSize: 13,
        fontFamily: Platform.OS === 'android' ? 'Roboto-Medium' : 'System',
        textAlign: 'left',
      },
    });

    return (
      <TouchableOpacity
        onPress={() => { changeValue(name); }}
        style={styles.background}>
        <Text style={styles.text}>{i18n.t(name ?? 'notSelected')}</Text>
      </TouchableOpacity>
    );
  };

  const changeValue = (value) => {
    onChangeValue(value);
    setState(value);
    Animated.timing(show, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      setIsShow(0);
      _setIsShow(false);
    });
  };

  const changeVisableList = () => {
    onOpen();
    _setIsShow(!_isShow);
    Animated.timing(show, {
      toValue: isShow == 0 ? 1 : 0,
      duration: 100,
      useNativeDriver: true,
    }).start(() => setIsShow(isShow == 0 ? 1 : 0));
  };

  useEffect(()=>{
    if ( isShowList != _isShow) {
      _setIsShow(!_isShow);
      Animated.timing(show, {
        toValue: isShow == 0 ? 1 : 0,
        duration: 100,
        useNativeDriver: true,
      }).start(() => setIsShow(isShow == 0 ? 1 : 0));
    }
  },[ isShowList ])

  return (
    <View style={styles.background}>
      <TouchableOpacity style={styles.button} onPress={changeVisableList}>
        {name ? <Text style={styles.name}>{name}</Text> : null}
        <Text style={styles.text}>{i18n.t(state ?? 'notSelected')}</Text>
      </TouchableOpacity>
      {_isShow ? (
        <Animated.View style={[styles.listValues, { opacity: show }]}>
          {values.map((item, index) => (
            <RenderItem name={item} key={item} />
          ))}
        </Animated.View>
      ) : null}
    </View>
  );
}
