import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Platform } from 'react-native'
import { i18n } from '~services'
import { SelectElemet, ColorButton } from '~components'
import { actions } from '~store'
import { flag } from './assets'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

export default function SelectLanguage ({ style }) {
  const [language, setLanguage] = useState(i18n.locale)
    const styles = StyleSheet.create({
      background: {},
      language: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      languageName: {
        fontFamily: Platform.OS == 'android' ? 'Roboto-Medium' : 'System',
        fontSize: 13,
        fontWeight: '500',
        color: '#010101',
      },
      selectBorder: {
        width: 20,
        height: 20,
        borderColor: '#86B738',
        borderRadius: 10,
        borderWidth: 3,
        alignItems: 'center',
        justifyContent: 'center',
      },
      selectElement: {
          borderRadius: 5,
          width: 10,
          height: 10,
      },
    });

    useEffect(()=>{
      
    },[])

    return (
      <View style={styles.background}>
        <FlatList
          data={Object.keys(i18n.translations)}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item}
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
              onPress={() => i18n.setLanguage(item).then(setLanguage)}>
              <View style={styles.language}>
                {flag[item]}
                <Text style={styles.languageName}>
                  {i18n.translations[item].nameLanguage}
                </Text>
              </View>
              <View style={styles.selectBorder}>
                <SelectElemet
                  style={styles.selectElement}
                  isSelected={language == item}
                  selectColor={'#86B738'}
                  noSelectColor={'transparent'}
                />
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
}