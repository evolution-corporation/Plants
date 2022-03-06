import React, { useRef, useState, memo, useEffect, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Marker, Indicator, Filter, Adress, MyLocation } from './dump';
//import MapView from "@bam.tech/react-native-component-map-clustering"
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { useHeaderHeight } from '@react-navigation/elements';
import { useIsFocused } from '@react-navigation/native';
import MapStyle from './dump/assets/mapStyle.json'

export function Map ({ editCoordinate, coordinate, startUserPosition = false , markers = [], compact = false }) {
  const map = useRef(null);
  var timer = null;
  const headerHeight = useHeaderHeight();
  const [userCoordinate, setUserCoordinate] = useState();
  const [mapIsReady, setMapIsReady] = useState(false)
  const [isChangedCoordinate, setIsChangedCoordinate] = useState(false);
  const [filter, setFilter] = useState(null);
  const isFocused = useIsFocused()
  const styles = StyleSheet.create({
    map: {
      flex: 1,
    },
    indicator: {
      position: 'absolute',
      bottom: '49%',
      alignSelf: 'center',
    },
    filter: {
      position: 'absolute',
      right: 14,
      bottom: '49%',
    },
    adress: {
      position: 'absolute',
      alignSelf: 'center',
      top: headerHeight
    },
    myLocation: {
      position: 'absolute',
      bottom: 100,
      right: 20
    }
  });

  if (startUserPosition) {
      useEffect(()=>{
        if (mapIsReady && userCoordinate) {
          map.current.setCamera({ center: userCoordinate, zoom: 15 }, { duration: 500 })
          setMapIsReady(false)
        }
      }, [mapIsReady, userCoordinate])
  }

  return (
    <View style={styles.map}>
      <MapView
        ref={map}
        style={styles.map}
        provider={'google'}
        clustering={true}
        // initialCoordiante={coordinate}
        initialCamera={{
          center: coordinate,
          zoom: 15,
          pitch: 1,
          heading: 1,
          altitude: 1
        }}
        showsUserLocation={true}
        showsMyLocationButton={false}
        showsPointsOfInterest={false}
        showsCompass={false}
        showsIndoors={false}
        rotateEnabled={true}
        toolbarEnabled={false}
        pitchEnabled={true}
        loadingEnabled={true}
        loadingIndicatorColor={'#75B904'}
        customMapStyle={MapStyle}
        onRegionChange={() => {
          clearTimeout(timer);
          if (!isChangedCoordinate) {
            setIsChangedCoordinate(true);
          }
          timer = setTimeout((state) => {if (isFocused) setIsChangedCoordinate(state)}, 1000, false);
        }}
        onRegionChangeComplete={editCoordinate}
        onMapReady={()=>setMapIsReady(true)}
        //onMapReady={()=>{console.log(userCoordinate);map.current.setCamera({ center: userCoordinate, zoom: 15 }, { duration: 500 })}}
        onUserLocationChange={({ nativeEvent: { coordinate: { latitude, longitude } } }) => setUserCoordinate({ latitude, longitude })}>
        {markers
          .filter((item) => (filter ? item.status === filter : true))
          .map((item) => (
            <Marker
              key={item.id.toString()}
              marker={item}
              all={compact}
            />
          ))}
      </MapView>
      <Indicator status={isChangedCoordinate} style={styles.indicator}/>
      {
        !compact ? <Filter style={styles.filter} onChange={setFilter} /> : null
      }
      <Adress coordinate={useMemo(()=>({ latitude: coordinate.latitude, longitude: coordinate.longitude }),[coordinate.latitude, coordinate.longitude])} style={styles.adress}/>
      <MyLocation style={styles.myLocation} onPress={()=>map.current.setCamera({ center: userCoordinate, zoom: 15 }, { duration: 500 })} />
    </View>
  );
}

export default memo(Map)