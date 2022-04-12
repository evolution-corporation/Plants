import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '~store';
import { Leaf, Tree } from './assets';
import Messages from '~assets/Messages.svg';

export default function ({ style }) { 
    const widgets = useSelector(state => state.navigator.widgets)
    const dispatch = useDispatch()
    const styles = StyleSheet.create({
        background: {

        },
        widget: {
            width: 62,
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
            overflow: 'hidden'
        },
        widgetList: {
            flexDirection: 'row',
            marginTop: 17
        }
    })
    return (
        <View style={styles.widgetList}>
            <TouchableOpacity style={[styles.widget, { transform: [{ translateX: 0 }], backgroundColor: '#86B738' }]} onPress={()=>dispatch(actions.selectWidget('Nurseries'))}>
                <Leaf style={{ transform: [{ scale: 0.9 }] }}/>
                <View style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: '#404040', opacity: widgets.includes('Nurseries') ? 0 : 0.28 }} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.widget, { transform: [{ translateX: -24 }], backgroundColor: '#FFD200' }]} onPress={()=>dispatch(actions.selectWidget('PlantRegistation'))}>
                <Tree style={{ transform: [{ scale: 0.9 }] }}/>
                <View style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: '#404040', opacity: widgets.includes('PlantRegistation') ? 0 : 0.28 }} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.widget, { transform: [{ translateX: -48 }], backgroundColor: '#4598E9' }]} onPress={()=>dispatch(actions.selectWidget('Messages'))}>
                <Messages  style={{ transform: [{ scale: 0.9 }] }}/>
                <View style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: '#404040', opacity: widgets.includes('Messages') ? 0 : 0.28 }} />
            </TouchableOpacity>
            <View>
                
            </View>
        </View>
    )
}