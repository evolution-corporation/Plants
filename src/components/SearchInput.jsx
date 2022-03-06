import React, { memo, useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Platform } from 'react-native'
import { i18n } from '~services'
import SearchImageGray from '~assets/SearchImageGray.svg';

export function SearchInput({ onChange, onBlur }) {
    const [text, setText] = useState('')

    const styles = StyleSheet.create({
        background: {
            backgroundColor: '#EFEFEF',
            elevation: 1,
            borderRadius: 7,
            height: 36,
            width: '85%',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 9,
        },
        input: {
            shadowColor: '#000000',
            flex: 1,
            paddingVertical: 9,
            color: '#404040',
            fontFamily: Platform.OS == 'android' ? 'Roboto-Medium' : 'System',
            fontSize: 15,
            fontWeight: '500',
            marginRight: 13
        }
    })

    useEffect(()=>{onChange(text)}, [text])

    return (
        <View style={styles.background}>
            {   
                text.length > 0 ? null :
                <SearchImageGray />
            }
            <TextInput 
                style={styles.input}
                onChangeText={setText}
                placeholder={i18n.t('Search')}
                placeholderTextColor={'#969696'}
                onBlur={onBlur}
                autoFocus={true}
            />
        </View>
    )
}

export default memo(SearchInput)