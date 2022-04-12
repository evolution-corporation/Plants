import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native'
import { SelectButtonSmall } from '~components'
import { i18n } from '~services'

export default function({ style, onChange }) {
    const [datePeriod, setDatePeriod] = useState()
    const styles = StyleSheet.create({
        bacground: {
            height: 26,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: -4.5
        },
        selectButton: {
            borderRadius: 13,
            borderColor: '#84B838',
            borderWidth: 1,
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            marginHorizontal: 4.5
        }
    })

    useEffect(()=> {
        setDatePeriod('week')
        onChange('week')
        return ()=> {

        }
    }, [setDatePeriod])

    return (
      <View style={[style, styles.bacground]}>
        <SelectButtonSmall
          isSelected={datePeriod == 'week'}
          style={styles.selectButton}
          setSelected={() => {
            onChange('week');
            setDatePeriod('week');
          }}
          colorSelected={{ background: '#84B838', text: '#FFFFFF' }}
          colorNoSelected={{ background: '#FFFFFF', text: '#84B838' }}
          text={i18n.t('40ebc836-e416-458c-89f5-3b4567a6b902')}
        />
        <SelectButtonSmall
          isSelected={datePeriod == 'month'}
          style={styles.selectButton}
          setSelected={() => {
            onChange('month');
            setDatePeriod('month');
          }}
          colorSelected={{ background: '#84B838', text: '#FFFFFF' }}
          colorNoSelected={{ background: '#FFFFFF', text: '#84B838' }}
          text={i18n.t('b9bf0b2b-d22f-42e7-ab77-c9a294955538')}
        />
        <SelectButtonSmall
          isSelected={datePeriod == 'allTime'}
          style={styles.selectButton}
          setSelected={() => {
            onChange('allTime');
            setDatePeriod('allTime');
          }}
          colorSelected={{ background: '#84B838', text: '#FFFFFF' }}
          colorNoSelected={{ background: '#FFFFFF', text: '#84B838' }}
          text={i18n.t('8a6777aa-8905-43dd-9911-f9c99cd2b31e')}
        />
      </View>
    );
}