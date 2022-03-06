import React from 'react'
import { View, StyleSheet } from 'react-native'
import { i18n } from '~services'
import { ColorButton, PlantImageSmall } from '~components'

export default function ({ style, type, onPress }) {

    const styles = StyleSheet.create({
      background: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      cancelButton: {
        flex: 1,
        borderRadius: 20,
        marginRight: 7,
      },
      image: {
        alignSelf: 'center',
        margin: 10,
        transform: [{ scale: 1.5 }],
      },
    });

    return (
      <View style={[style, styles.background]}>
        <ColorButton
          text={i18n.t('c67868f1-8edc-4dbe-b405-7935750f6344')}
          backgroundColor={'#F4F3EF'}
          style={styles.cancelButton}
          color={'#FF5C00'}
          event={onPress}
        />
        <PlantImageSmall style={styles.image} />
      </View>
    );

}