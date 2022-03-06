import React, { memo, useEffect } from 'react';
import { Marker } from 'react-native-maps';
import {
  NoneOwnerMarker,
  OtherPeopleMarker,
  ReservMarker,
  TreeMarker,
} from './assets';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

/**
    Маркер который будет отображать место посадки растения так же ему передается его тип для верного отображения
*/
export function _Marker({ marker, all=false }) {
  const navigation = useNavigation();

  if (all) {
    return (
      <Marker
        id={marker.id}
        tracksViewChanges={false}
        coordinate={marker.coordinate}
        onPress={() => {
          navigation.navigate('PlantCard', { id: marker.id });
        }}>
          <TreeMarker />
      </Marker>
    ); 
  }

  if (marker.status == 'Plant') {
    const myId = useSelector((state) => state.user.uid);
    return (
      <Marker
        id={marker.id}
        tracksViewChanges={false}
        coordinate={marker.coordinate}
        onPress={() => {
          navigation.navigate('PlantCard', { id: marker.id });
        }}>
        {marker.owners == myId ? <TreeMarker /> : <OtherPeopleMarker />}
      </Marker>
    );
  }
  if (marker.status == 'Reserved') {
    return (
      <Marker
        id={marker.id}
        tracksViewChanges={false}
        coordinate={marker.coordinate}
        onPress={() => {
          navigation.navigate('PlantReserved', { id: marker.id, date: marker.date, coordinate: marker.coordinate });
        }}>
        {marker.owner ? <ReservMarker /> : <NoneOwnerMarker />}
      </Marker>
    );
  }
  return null;
}

export default memo(_Marker);
