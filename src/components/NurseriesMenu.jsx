import React, { memo, useRef, useState, useEffect } from 'react'
import { Animated, StyleSheet, View, TouchableOpacity, Text, Platform, Pressable, Dimensions, Modal } from 'react-native'
import Leave from '~assets/Leave.svg'
import Filter from '~assets/Filter.svg'
import Menu from '~assets/Menu.svg'
import { i18n } from '~services'
import { useNavigation } from '@react-navigation/native'

export default function NurseriesMenu ({ style, direction='top' }) {
    const navigation = useNavigation()
    const [isShow, setIsShow] = useState(false)
    const showMenu = useRef(new Animated.Value(0)).current
    const showHiddenMenu = () => {
        if (isShow) {
            Animated.timing(showMenu, { toValue: 0, duration: 300, useNativeDriver: false }).start(()=> {setIsShow(false)});
        } else {
            setIsShow(true);
            Animated.timing(showMenu, { toValue: 1, duration: 300, useNativeDriver: false }).start();
        }
    }

    const styles = StyleSheet.create({
      menu: {
        position: 'absolute',
        right: 20,
        top: 20,
        borderRadius: 10,
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        backgroundColor: '#FFFFFF',
        elevation: 5,
        paddingVertical: 17,
        paddingHorizontal: 25,
        width: 250,
      },
      button: {
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#86B738',
        width: 50,
        height: 50,
        borderRadius: 25,
      },
      namePage: {
        marginLeft: 15,
        fontFamily: Platform.OS === 'android' ? 'Roboto-Medium' : 'System',
        fontWeight: '500',
        color: '#404040',
        fontSize: 14,
      },
    });
    
    useEffect(()=>{
      switch (direction) {
        case 'top':
          direction = { bottom: 0 }
          break;
        case 'bottom':
          direction = { top: 0 }
          break
        default:
          break;
      }
    },[setIsShow])

    return (
      <View style={[style]}>
        <TouchableOpacity style={styles.button} onPress={showHiddenMenu}>
          <Menu />
        </TouchableOpacity>
          <Modal transparent={true} onRequestClose={showHiddenMenu} visible={isShow} animationType={'fade'}>
            <Pressable style={[StyleSheet.absoluteFill, { backgroundColor: 'transparent' }]} onPress={showHiddenMenu} />
            <View style={[styles.menu]}>
              {/* <TouchableOpacity
                key={'filter'}
                style={{ flexDirection: 'row', marginVertical: 10, width: '100%' }}
                onBlur={() => console.log('Blur')}>
                <Filter />
                <Text style={styles.namePage}>{i18n.t('Filter')}</Text>
              </TouchableOpacity> */}
              <TouchableOpacity
                key={'My'}
                style={{ flexDirection: 'row', marginVertical: 10, width: '100%' }}
                onBlur={() => console.log('Blur')}
                onPress={() => {showHiddenMenu(); navigation.navigate('MyNurseries');}}>
                <Leave />
                <Text style={[styles.namePage, { color: '#86B738' }]}>
                  {i18n.t('856b9aa2-f2f0-4e7c-9d14-f54d2df3048b')}
                </Text>
              </TouchableOpacity>
            </View>
          </Modal>
      </View>
    );
}