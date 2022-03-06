import React, { useCallback, useEffect, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { ParkCityBackground } from '~components';
import { asyncStorage } from '~services';
import { BigWhiteTreeLogo } from './assets';
import { ListIntro, CircleList } from './components';

export default function ({ navigation, route }) {
  const [page, setPage] = useState(0);
  const reSize = new Animated.Value(1);
  const posititon = reSize.interpolate({
    inputRange: [0, 1],
    outputRange: [-20, 124],
  });
  const size = reSize.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
  });
  const animation = Animated.timing(reSize, {
    toValue: 0,
    duration: 600,
    useNativeDriver: false,
  });
  const styles = StyleSheet.create({
    background: {
      paddingBottom: 70,
      paddingHorizontal: 30,
      justifyContent: 'center',
    },
    logo: {
      alignSelf: 'center',
    },
    listIntro: { flex: 1, marginBottom: 50 },
    circleList: {},
  });

  useFocusEffect(
    useCallback(() => {
      setTimeout(
        () => {
          animation.start(() => {
            setPage(1);
          });
        },
        5000,
        1,
      );
      setTimeout(setPage, 10000, 2);
      setTimeout(setPage, 15000, 3);
    }, []),
  );

  const setStatusApp = async () => {
    await asyncStorage.isFirstLoading(false);
    navigation.navigate('InSign');
  };

  return (
    <ParkCityBackground style={styles.background}>
      <Animated.View
        style={[
          styles.logo,
          {
            position: 'absolute',
            top: posititon,
            transform: [{ scale: size }],
          },
        ]}
      >
        <BigWhiteTreeLogo />
      </Animated.View>
      <ListIntro page={page} style={styles.listIntro} event={setStatusApp} />
      <CircleList index={page} style={styles.circleList} />
    </ParkCityBackground>
  );
}
