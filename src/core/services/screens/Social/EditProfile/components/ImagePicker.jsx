import React, { useReducer, useEffect } from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  View,
} from 'react-native';
import { Plus } from './assets';
import { image } from '~services';

export default function ({ style, setPhoto, initImage }) {
  const [state, dispatch] = useReducer(
    (_state, { payload, type }) => {
      switch (type) {
        case 'setPhoto':
          return { image: payload, status: 'ready' };
        case 'selectPhoto':
          return { ..._state, status: 'loading' };
        case 'cancel':
          return { ..._state, status: 'ready' };
      }
    },
    {
      image: `${
        Platform.OS === 'android' ? 'file:///android_asset' : ''
      }/image/User.png`,
      status: 'ready',
    },
    () => {
      return {
        status: 'ready',
        image:
          `data:image/png;base64, ${initImage}` ??
          `${
            Platform.OS === 'android' ? 'file:///android_asset' : ''
          }/image/User.png`,
      };
    },
  );

  const selectImage = async ({ uri }) => {
    dispatch({ type: 'setPhoto', payload: uri });
    const base64 = await image.PhotoConverterBase64({ uri });
    setPhoto(base64);
  };

  const openPicker = async () => {
    dispatch({ type: 'selectPhoto' });
    const status = await image.openLibrary({
      onSelect: selectImage,
      onCancel: () => {
        dispatch({ type: 'cancel' });
      },
    });
  };

  const styles = StyleSheet.create({
    backGround: {
      height: 70,
      width: 70,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 20,
    },
    image: {
      height: 70,
      width: 70,
      borderRadius: 20,
    },
    plus: {
      position: 'absolute',
      bottom: 0,
      right: 0,
    },
  });

  return (
    <TouchableOpacity style={[styles.backGround, style]} onPress={openPicker}>
      {state.status == 'Loading' ? (
        <ActivityIndicator size={'large'} color={'#86B738'} />
      ) : (
        <Image
          source={{ uri: state.image }}
          style={styles.image}
          resizeMode={'cover'}
        />
      )}
      <Plus style={styles.plus} />
    </TouchableOpacity>
  );
}
