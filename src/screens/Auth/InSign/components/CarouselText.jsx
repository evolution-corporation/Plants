import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  Text,
  Platform,
} from 'react-native';
import CircleList from './CircleList';
import { i18n } from '~services';

export default function ({ style }) {
  const [page, setPage] = useState(0);
  let isActive = false;
  let timer = null;
  const flatList = useRef();

  const editColorCircles = useCallback(({ viewableItems }) => {
    const id = viewableItems[0].item.id;
    if (timer) clearTimeout(timer);
    setPage(id);
    timer = setTimeout(autoScroll, 10000, id);
  }, []);

  useEffect(() => {
    isActive = true;

    return () => {
      isActive = false;
    };
  }, [setPage]);

  const autoScroll = (index) => {
    if (isActive)
      flatList.current.scrollToIndex({ index: index == 3 ? 0 : index + 1 });
  };
  const styles = StyleSheet.create({
    backGround: {
      width: '100%',
      height: 72,
    },
    circleList: {
      // alignItems: 'center',
      // justifyContent: 'center',
      // width: '100%',
      // height: 11,
      // flexDirection: 'row',
    },
    list: {
      width: '100%',
      height: 42,
    },
  });

  const Item = ({ text, key }) => {
    const styles = StyleSheet.create({
      text: {
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 18,
        lineHeight: 21,
        color: '#FFFFFF',
        fontFamily: Platform.OS == 'android' ? 'Roboto-Bold' : 'System',
      },
      background: {
        width: Dimensions.get('window').width,
        height: 42,
        justifyContent: 'center',
        alignItems: 'center',
      },
    });

    return (
      <View style={styles.background} key={key}>
        <Text style={styles.text}>{text}</Text>
      </View>
    );
  };

  return (
    <View style={[styles.backGround, style]}>
      <FlatList
        ref={flatList}
        data={[
          { text: i18n.t('8dd3819b-83e6-4cd6-930e-194758735bd9'), id: 0 },
          { text: i18n.t('8ef09926-fc2e-4435-9dd6-b7d89ae57212'), id: 1 },
          { text: i18n.t('5cfd5328-1c66-4c01-ac03-d6f7d32bd9ac'), id: 2 },
          { text: i18n.t('bdd0bace-e2a6-4212-96f3-0f54e754e366'), id: 3 },
        ]}
        renderItem={({ item }) => <Item text={item.text} />}
        style={styles.list}
        horizontal={true}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={editColorCircles}
        disableIntervalMomentum={true}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        snapToInterval={Dimensions.get('window').width}
      />
      <CircleList index={page} style={styles.circleList} />
    </View>
  );
}
