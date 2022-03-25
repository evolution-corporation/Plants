import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ActivityIndicator,
  Modal
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { useSelector, useDispatch } from 'react-redux';

import { ParkCityBackground, ColorButton } from '~components';
import { i18n, payment, image } from '~services';
import { actions } from '~store'
import { PriceContainer, PlantInfo } from './components';


export default function ({ navigation, route }) {
  const [isOpenCamera, setIsShowCamera] = useState(false)
  const [price, setPrice] = useState({price: 0, currency: 'RUB'});
  const headerHeight = useHeaderHeight();
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const plant = useSelector(state => state.plant)
  const styles = StyleSheet.create({
    background: {
      flex: 1,
      justifyContent: 'space-between',
      paddingHorizontal: 30,
      paddingBottom: 10,
    },
    plantInfoRegistry: {
      width: '100%',
      flexGrow: 1
    },
    bottomView_topText: {
      fontFamily: Platform.OS === 'android' ? 'Roboto-Medium' : 'System',
      fontWeight: '600',
      fontSize: 14,
      color: 'rgba(255, 255, 255, 0.88)',
      textAlign: 'center',
      marginVertical: 5,
    },
    priceContatiner: {
      height: 40,
      marginTop: 10
    },
    colorButton: {
      marginVertical: 10
    },
    bottomView_bottomText: {
      fontFamily: Platform.OS === 'android' ? 'Roboto-Medium' : 'System',
      fontWeight: '600',
      fontSize: 11,
      color: 'rgba(255, 255, 255, 0.88)',
      textAlign: 'center',
      marginBottom: 18,
    },
  });  

  const reistration = async () => {
    try {
      if (price.price == 0) {
        await dispatch(actions.upLoadPlant()).unwrap()
        navigation.navigate('Status', { result: true })
      } else {
        const status = await payment.openTerminal(price)
        if (status == 'onSuccess') {
          setIsLoading(true)
          dispatch(actions.addPlantData({ price }))
          await dispatch(actions.upLoadPlant()).unwrap()
          navigation.navigate('Status', { result: true })
        } else if (status == 'ERROR'){
          navigation.navigate('Status', { result: false })
        }
      }
    } catch (error) {
      navigation.navigate('Status', { result: false })
    }
  }

   if (isLoading) return (
    <ParkCityBackground style={{  justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator color={'#FFFFFF'} size={'large'} />
    </ParkCityBackground>
  )

  if (isOpenCamera) {
    return (
      <image.Camera
        onChange={(photo) => {
          dispatch(actions.addPlantData({ photo }));
          setIsShowCamera(false)
        }}
        onCancel={()=>{setIsShowCamera(false)}}
      />
    );
  }

  return (
    <ParkCityBackground style={styles.background} headerHeight={headerHeight}>
      <PlantInfo style={styles.plantInfoRegistry} onClick={()=>{setIsShowCamera(true)}} />
      <View style={{ width: '100%', height: 200 }}>
        <Text style={styles.bottomView_topText}>
          {i18n.t('764b509f-ffa5-4647-8130-064430f45bf4')}
        </Text>
        <PriceContainer style={styles.priceContatiner} onChange={setPrice} />
        <ColorButton
          text={price.price != 0 ? i18n.t('payment') : i18n.t('register')}
          backgroundColor={'#E6BC18'}
          style={styles.colorButton}
          color={'#FFFFFF'}
          event={reistration}
        />
        <Text style={styles.bottomView_bottomText}>
          {price.price != '0'
            ? i18n.t('ab2efad1-70d5-40f9-9fc6-56a38c25d54a')
            : i18n.t('7532b0b2-437d-4389-9ed3-bce92ae46de6')}
        </Text>
      </View>
    </ParkCityBackground>
  );
}
