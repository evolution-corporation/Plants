import React, { useState, useEffect } from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  View
} from 'react-native';
import { i18n, image } from '~services';
import { TextHref } from './dump';
import Photo from '~assets/Photo.svg';

export default function ({ style, setPhoto, initImage, noReturnInit=false }) {
  const [_image, setImage] = useState('');
  const [first, setFirst] = useState(true) // костыль

  const deleteImage = () => {
    setImage('');
    setPhoto(null);
  };

  const selectImage = async ({ uri }) => {
    setImage(uri);
    const base64 = await image.PhotoConverterBase64({ uri });
    if (first && noReturnInit) {
      setFirst(false);
    } else {
      setPhoto(base64);
    }
    
  };

  const openPicker = async () => {
    setImage('Loading');
    await image.openLibrary({
      onSelect: selectImage,
      onCancel: deleteImage,
    });
  };

  const styles = StyleSheet.create({
    backGround: {
      height: 128,
      width: 128,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.25)',
      borderRadius: 40,
      borderWidth: 3,
      borderStyle: 'solid',
      borderColor: '#FFFFFF',
    },
    image: {
      height: 128,
      width: 129,
      borderRadius: 40,
      borderColor: '#FFFFFF',
      borderWidth: 3,
    },
    plus: {
      position: 'absolute',
      bottom: 0,
      right: 0,
    },
    buttonText: {
      color: '#FFFFFF',
      fontFamily: Platform.OS == 'android' ? 'Roboto-Medium' : 'System',
      fontSize: 11,
      fontWeight: '400',
      alignSelf: 'center',
      marginTop: 5
    },
  });

  useEffect(() => {
    if (initImage) selectImage({ uri: initImage });
  }, [setImage]);

  return (
    <View>
      <TouchableOpacity style={[styles.backGround, style]} onPress={openPicker} onLongPress={deleteImage}>
        {_image != '' ? (
          _image == 'Loading' ? (
            <ActivityIndicator size={'large'} color={'#FFFFFF'} />
          ) : (
            <Image source={{ uri: _image }} style={styles.image} resizeMode={'cover'} />
          )
        ) : (
          <Photo />
        )}
      </TouchableOpacity>
      {_image != '' && _image != 'Loading' ? <TextHref text={i18n.t('toChange')} style={styles.buttonText} event={openPicker} /> : null}
    </View>
  );
}
