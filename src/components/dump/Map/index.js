import React, { useRef, useState, memo, useEffect, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Marker, Indicator, Filter, Adress, MyLocation } from './dump';
//import MapView from "@bam.tech/react-native-component-map-clustering"
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { useHeaderHeight } from '@react-navigation/elements';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import MapStyle from './dump/assets/mapStyle.json'

import { BackArrow } from '../buttons';

export function Map ({ editCoordinate, coordinate, startUserPosition = false , markers = [], compact = false, editAdress=(adress)=>{}, isReadyHook=(status)=>{} }) {
  const map = useRef(null);
  var timer = null;
  const navigation = useNavigation()
  const headerHeight = useHeaderHeight();
  const [userCoordinate, setUserCoordinate] = useState();
  const [mapIsReady, setMapIsReady] = useState(false)
  const [isChangedCoordinate, setIsChangedCoordinate] = useState(false);
  const [filter, setFilter] = useState(null);
  const [adress, setAdress] = useState({  })
  const isFocused = useIsFocused()
  let isActivate = true
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
      bottom: 256,
      right: 20
    },
    buttonGoBackInCircule: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#86B738',
    },
  });

  if (startUserPosition) {
      useEffect(()=>{
        if (mapIsReady && userCoordinate) {
          map.current.setCamera({ center: userCoordinate, zoom: 15 }, { duration: 500 })
          setMapIsReady(false)
        }
      }, [mapIsReady, userCoordinate])
  }

  const getAdress = async (latitude, longitude) => {
    const adress = await map.current.addressForCoordinate({ latitude, longitude })
    console.log('isActivateMap', isActivate)
    if (isActivate) {
      setAdress(adress)
      editAdress(adress)
    }
  }

  useEffect(()=>{
    return () => {
      isActivate = false
    }
  },[setAdress])

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
          timer = setTimeout((state) => {
            if (isActivate) {
              setIsChangedCoordinate(state)
              
            }
          }, 1000, false);
        }}
        onRegionChangeComplete={(coordinate) => {editCoordinate(coordinate); getAdress(coordinate.latitude, coordinate.longitude)}}
        onMapReady={()=>{setMapIsReady(true)}}
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
      <Adress coordinate={useMemo(()=>({ latitude: coordinate.latitude, longitude: coordinate.longitude }),[coordinate.latitude, coordinate.longitude])} style={styles.adress} adress={adress}/>
      <MyLocation style={styles.myLocation} onPress={()=>map.current.setCamera({ center: userCoordinate, zoom: 15 }, { duration: 500 })} />
      <View style={{ height: 50, justifyContent: 'center', position: 'absolute', top: headerHeight, left: 10 }}>
        <BackArrow goBack={navigation.goBack} style={styles.buttonGoBackInCircule}/>
      </View>
    </View>
  );
}

export default memo(Map)