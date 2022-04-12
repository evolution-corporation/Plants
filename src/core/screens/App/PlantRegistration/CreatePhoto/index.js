import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '~store';
import { i18n, image } from '~services';
import { ParkAndBigTree } from '~components';
import { HandWithPhone } from './assets';
import { ButtonWithPlus } from './components';
import { useFocusEffect } from '@react-navigation/native';

export default function ({ navigation, route }) {
  const [isShowCamera, setIsShowCamera] = useState(false);
  const dispatchRedux = useDispatch();
  const plant = useSelector(state => state.plant)

  const images = {
    Tree: require('../assets/Tree.png')
  }

  const styles = StyleSheet.create({
    background: {
      justifyContent: 'space-between',
      paddingHorizontal: 30,
    },
    title: {
      fontFamily: Platform.OS === 'android' ? 'Roboto-Bold' : 'System',
      fontWeight: '700',
      fontSize: 18,
      color: '#FFFFFF',
      marginBottom: 18,
    },
    text: {
      fontFamily: Platform.OS === 'android' ? 'Roboto-Medium' : 'System',
      fontWeight: '500',
      fontSize: 14,
      color: '#FFFFFF',
      flex: 3,
    },
    textAndImage: {
      flexDirection: 'row',
      marginRight: -30,
      justifyContent: 'space-between',
    },
    image: {
      width: Dimensions.get('screen').width - 60,
    },
    button: {
      alignSelf: 'center',
      marginBottom: 75,
    },
  });

  useFocusEffect(useCallback(() => {
    
    return () => {
      setIsShowCamera(false)
    }
  }, [setIsShowCamera]))

  if (isShowCamera)
    return (
      <image.Camera
        onChange={(photo) => {
          dispatchRedux(actions.addPlantData({ photo }));
          navigation.navigate('RegistrationPlant');
        }}
        onCancel={()=>{setIsShowCamera(false)}}
      />
    );

  return (
    <ParkAndBigTree style={styles.background} image={images[plant.type == 'Flower' ? 'Flower' : 'Tree']}>
      <View>
        <Text style={styles.title}>
          {i18n.t('0f2379cd-8b9e-408d-93f4-092a4d5d5328')}
        </Text>
        <View style={styles.textAndImage}>
          <Text style={styles.text}>
            {i18n.t('ff407039-4a90-4af5-97ed-09522bb9d74d')}
          </Text>
          <HandWithPhone />
        </View>
      </View>
      <ButtonWithPlus
        style={styles.button}
        onPress={() => setIsShowCamera(true)}
      />
    </ParkAndBigTree>
  );
}
