import React, { useReducer, useEffect } from 'react'
import { ScrollView, StyleSheet, View, Animated } from 'react-native'
import { useSelector } from 'react-redux'

import PlantRegistration from './PlantRegistration'
import Nurseries from './Nurseries'
import Messages from './Messages'

export default function Widgets ({ style }) {
    const widgets = useSelector(state => state.navigator.widgets)
    
    const [state, dispatch] = useReducer((_state, { type, payload })=>{
        let index = 0
        switch (type) {
            case 'init': return { ... payload }
            case 'set': 
                _state.nameFullWidget = payload
                _state.indexFullWidget = widgets.indexOf(_state.indexFullWidget)
                
                break;
            case 'scroll':
                _state.indexFullWidget = _state.indexFullWidget == widgets.length - 1 ? 0 : _state.indexFullWidget + 1
                _state.nameFullWidget = widgets[_state.indexFullWidget]
        }
        for (let widget of widgets) {
            if (_state.nameFullWidget != widget) {
                _state.indexCompactWidget[widget] = index
                index++
            }
        }
        return { ... _state }
    }, {nameFullWidget: null, indexFullWidget: 0, indexCompactWidget: {}, })
    

    const styles = StyleSheet.create({
        background: {
            width: '100%',
            height: 140,
            flexDirection: 'row',
        },

    })

    const scrollBegin = ({ nativeEvent }) => {
        dispatch({ type: 'scroll' })
    }

    useEffect(()=> {
        let index = 0
        let nameFullWidget = widgets[0]
        let indexFullWidget = 0
        let indexCompactWidget = {}
        for (let widget of widgets) {
            if (nameFullWidget != widget) {
                indexCompactWidget[widget] = index
                index++
            }
        }
        dispatch({type: 'init', payload: { nameFullWidget, indexCompactWidget, indexFullWidget }})
    }, [dispatch])

    if (!state.indexCompactWidget) return null
    return (
        <ScrollView
            horizontal={true}
            contentContainerStyle={styles.background}
            onScrollEndDrag={scrollBegin}
            
        >
            {
                widgets.includes('PlantRegistation') ? 
                    <PlantRegistration 
                        isCompact={state.nameFullWidget != 'PlantRegistation'} 
                        index={state.indexCompactWidget.PlantRegistation ?? 0} 
                        onPress={() => dispatch({ type: 'set', payload: 'PlantRegistation' })}
                    /> 
                : null
            } 
            {
                widgets.includes('Nurseries') ? 
                    <Nurseries 
                        isCompact={state.nameFullWidget != 'Nurseries'} 
                        index={state.indexCompactWidget.Nurseries ?? 0} 
                        onPress={() => dispatch({ type: 'set', payload: 'Nurseries' })}
                    /> 
                    : null
            }
            {
                widgets.includes('Messages') ? 
                    <Messages
                        isCompact={state.nameFullWidget != 'Messages'} 
                        index={state.indexCompactWidget.Messages ?? 0} 
                        onPress={() => dispatch({ type: 'set', payload: 'Messages' })}
                    />
                    : null
            }
        </ScrollView>
    )
    
}