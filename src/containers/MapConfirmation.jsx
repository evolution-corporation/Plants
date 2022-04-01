import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Modal } from 'react-native'
import { i18n } from '~services'
import { ColorButton, Map } from '../components/dump'

export default function MapConfirmation({ visable=true, coordinate, onPress=console.log, onClose, startUserPosition=true, returnAdress=false}) {
  const [coordinateMap, setCoordinateMap] = useState(coordinate ?? { latitude: 56.83811, longitude: 60.60436 });
  const [adress, setAdress] = useState({})
  let isActivate = true
  const styles = StyleSheet.create({
    background: {
      flex: 1,
    },
    map: {
      width: '100%',
      height: '100%',
    },
    buttonContainer: {
      position: 'absolute',
      width: '100%',
      paddingHorizontal: 30,
      alignSelf: 'center',
      bottom: 54,
    },
  });

  useEffect(()=>{
    
    return ()=>{
      isActivate = false
    }
  }, [setCoordinateMap])

  return (
    <Modal style={styles.background} visible={visable} onRequestClose={onClose} animationType={'slide'}>
      <Map
        style={styles.map}
        editCoordinate={setCoordinateMap}
        coordinate={coordinateMap}
        compact={true}
        startUserPosition={startUserPosition}
        editAdress={(adress) => isActivate ? setAdress(adress) : null}
      />
      <View style={styles.buttonContainer}>
        <ColorButton
          style={styles.button}
          text={i18n.t('confirmation')}
          backgroundColor={'#86B738'}
          color={'#FFFFFF'}
          event={() => (returnAdress ? onPress(coordinateMap, adress) : onPress(coordinateMap))}
        />
      </View>
    </Modal>
  );
}