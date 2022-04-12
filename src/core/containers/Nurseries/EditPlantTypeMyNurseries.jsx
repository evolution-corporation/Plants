import React, { memo, useMemo } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { NurseriesAddInfoPart, SelectTypePlant } from '~components'
import { i18n } from '~services'

export function EditPlantTypeMyNurseries({ onChange, style, nextOpen }) {

    const plantTypeText = useMemo(
      () =>
        Object.keys(state.plantType)
          .map((type) => (state.plantType[type] ? i18n.t(type) : null))
          .filter((item) => item != null)
          .join(', '),
      [state],
    );

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
            // onPress={() => dispatch({ type: 'showPart', payload: 'Title' })}
            onPress={nextOpen}
            title={
                !state.showTitle ? i18n.t('8083cb88-add7-465d-8ac8-6a9dfc71afcc') : i18n.t('17d5655e-05a5-46d5-8217-64a86cf23550')
            }
            isEdit={false}>
            <View>
                <SelectTypePlant
                    // onPress={(payload) => dispatch({ type: 'editPlantType', payload })}
                    onPress={onChange}
                    style={styles.selectTypePlant}
                    multiSelect={true}
                    colorStyle={'greenTransparent/white'}
                />
                <Text style={styles.selectTypePlantName}>{plantTypeText}</Text>
            </View>
        </NurseriesAddInfoPart>
    )
}