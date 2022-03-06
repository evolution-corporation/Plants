import React, { memo, useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import TreeMarker from '~assets/TreeMarker.svg';
import MapStyle from '~assets/mapStyle.json';
import BottomLeaves from '~assets/BotomLeaves.svg';
import GreenLeaves from '~assets/GreenLeaves.svg';
import YellowBigLeave from '~assets/YellowBigLeave.svg';
import YellowLeaves from '~assets/YellowLeaves.svg';
import Flower from '~assets/Flower.svg';
import TwoGreenLeaves from '~assets/TwoGreenLeaves.svg';
import ManyFlower from '~assets/ManyFlower.svg';
import TwoGreenLeavesBig from '~assets/TwoGreenLeavesBig.svg';
import { useSelector } from 'react-redux';
import { geocoding } from '~services'

export function Map({ markers }) {
    const geoPermission = useSelector(state => state.navigator.permission.geolocation)
    const [center, setCenter] = useState({ latitude: 30, longitude: 30, latitudeDelta: 90, longitudeDelta: 90 });

    const styles = StyleSheet.create({
      background: {
        marginBottom: 12,
        marginTop: 50,
        marginLeft: 55,
        marginRight: 50,
        width: Dimensions.get('screen').width - 140,
        height: Dimensions.get('screen').width - 140,
      },
      map: {
        flex: 1,
        borderRadius: (Dimensions.get('screen').width - 140) / 2,
        overflow: 'hidden',
      },
      bottomLeaves: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: -12,
      },
      greenLeaves: {
        position: 'absolute',
        zIndex: -1,
        left: -35,
        top: '13%',
      },
      yellowBigLeaveRigth: {
        position: 'absolute',
        bottom: '20%',
        right: -50,
        zIndex: -1,
      },
      yellowBigLeaveLeft: {
        position: 'absolute',
        bottom: '40%',
        left: -55,
        zIndex: -1,
        transform: [{ rotateZ: '155deg' }],
      },
      yellowLeaves: {
        position: 'absolute',
        top: -40,
        right: '25%',
      },
      flowerLeftCenter: {
        position: 'absolute',
        top: '40%',
        left: -50,
      },
      flowerCenterTop: {
        position: 'absolute',
        alignSelf: 'center',
        transform: [{ rotateZ: '55deg' }, { scale: 0.9 }],
        top: -20,
        zIndex: -2,
      },
      flowerRigthTop: {
        position: 'absolute',
        transform: [{ rotateZ: '95deg' }],
        right: 0,
        top: '10%',
      },
      flowerRigthBottom: {
        position: 'absolute',
        transform: [{ rotateZ: '200deg' }, { rotateX: '180deg' }],
        right: -45,
        bottom: '40%',
      },
      twoGreenLeavesRigth: {
        position: 'absolute',
        right: -40,
        top: '35%',
        zIndex: -1,
      },
      twoGreenLeavesTop: {
        position: 'absolute',
        transform: [{ rotateZ: '275deg' }, { rotateX: '180deg' }, { scale: 0.7 }],
        alignSelf: 'center',
        top: -35,
        zIndex: -1,
      },
      manyFlowerRigth: {
        position: 'absolute',
        transform: [{ rotateZ: '150deg' }, { rotateX: '0deg' }],
        right: -50,
        top: '35%',
        zIndex: -2,
      },
      manyFlowerLeft: {
        position: 'absolute',
        left: -25,
        top: '2%',
        zIndex: -2,
      },
      twoGreenLeavesBig: {
        position: 'absolute',
        left: '20%',
        top: -60,
        zIndex: -2
      },
    });
   
    useEffect(()=> {
        geocoding.getMyPosition((coordinate) => setCenter({ ...coordinate, latitudeDelta: 90, longitudeDelta: 90 }));
    }, [setCenter])
    

    return (
      <View style={styles.background}>
        <View style={styles.map}>
          <MapView
            style={{ flex: 1 }}
            region={center}
            customMapStyle={MapStyle}
            toolbarEnabled={false}
            showsBuildings={false}
            showsIndoors={false}
            zoomEnabled={false}
            pitchEnabled={false}
            scrollEnabled={false}
            rotateEnabled={false}
            moveOnMarkerPress={false}
            onUserLocationChange={({
              nativeEvent: {
                coordinate: { latitude, longitude },
              },
            }) => setCenter({ latitude, longitude })}>
            {markers.map((item) => (
              <Marker coordinate={item.coordinate} key={item.id}>
                <TreeMarker />
              </Marker>
            ))}
          </MapView>
        </View>
        <BottomLeaves style={styles.bottomLeaves} />
        <GreenLeaves style={styles.greenLeaves} />
        <YellowBigLeave style={styles.yellowBigLeaveRigth} />
        <YellowBigLeave style={styles.yellowBigLeaveLeft} />
        <YellowLeaves style={styles.yellowLeaves} />
        <Flower style={styles.flowerLeftCenter} />
        <Flower style={styles.flowerCenterTop} />
        <Flower style={styles.flowerRigthTop} />
        <Flower style={styles.flowerRigthBottom} />
        <TwoGreenLeaves style={styles.twoGreenLeavesRigth} />
        <TwoGreenLeaves style={styles.twoGreenLeavesTop} />
        <ManyFlower style={styles.manyFlowerRigth} />
        <ManyFlower style={styles.manyFlowerLeft} />
        <TwoGreenLeavesBig style={styles.twoGreenLeavesBig} />
      </View>
    );
}

export default memo(Map)