import React, { memo, useMemo, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { useSelector } from 'react-redux'
import { NurseriesAddInfoPart, SelectTypePlant } from '~components'
import { i18n } from '~services'

export function EditPlantTypeMyNurseries({ onChange, style, nextOpen, isShow,  }) {

    const [title, setTitle] = useState('')
    const [isEdit, setIsEdit] = useState(true)
    const gTitle = useSelector(state => state.nurserrie.title)
    const styles = StyleSheet.create({
      background: {
        paddingHorizontal: 30,
        flex: 1,
        justifyContent: 'space-between'
      },
      selectTypePlant: {
        width: Dimensions.get('screen').width,
        paddingHorizontal: -30,
      },
      selectTypePlantName: {
        color: '#FFFFFF',
        fontFamily: Platform.OS == 'android' ? 'Roboto-Medium' : 'System',
        fontWeight: '600',
        fontSize: 12,
        marginTop: 14,
      }
    });

    return (
        <NurseriesAddInfoPart
              // onPress={() => dispatch({ type: 'showPart', payload: 'ContactInfo' })}
              onPress={nextOpen}
              title={i18n.t('Title')}
              hiddenTitle={true}
              visable={isShow}
              key={'Title'}
              isEdit={true}
              editMode={state.addPartData == 'Title' || state.isEdit == 'Title'}
              onPressEdit={() => dispatch({ type: 'isEdit', payload: 'Title' })}
              permission={useMemo(()=>(title.length > 0 && title.length <= 20), [title])}>
              <TextInputColor
                // onChangeValue={(title) => dispatch({ type: 'editData', payload: { title } })}
                onPress={(text) => {onChange(text); setTitle(text);}}
                placeholder={i18n.t('deafe553-0fa4-4adb-a6a4-368ae986e256')}
                initValue={gTitle ?? ''}
                onBlur={() => dispatch({ type: 'isEdit', payload: null })}
                autoFocus={true}
                maxLength={20}
              />
              <Text style={styles.title}>{title}</Text>
            </NurseriesAddInfoPart>
    )
}