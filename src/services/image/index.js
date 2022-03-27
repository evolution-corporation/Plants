import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { launchImageLibrary } from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import { useNavigation } from '@react-navigation/native';
import ImageResizer from 'react-native-image-resizer';
import { Back } from './assets'

function Camera_({ onChange, onCancel }) {
  const [permision, setPermision] = useState(false);
  const camera = useRef(null);
  const devices = useCameraDevices();
  const navigation = useNavigation()

  const createPhoto = async () => {
    const photo = await camera.current.takePhoto({ skipskipMetadata: true });
    const base64 = await PhotoConverterBase64({ uri: photo.path });
    onChange(base64);
  };

  const cancel = () => {
    onCancel();
  }

  const openCamera = () => {
    setPermision(true);
  };

  const getPermisions = async () => {
    const cameraPermission = await Camera.getCameraPermissionStatus();
    if (cameraPermission === 'authorized') {
      openCamera();
      return;
    }
    if (cameraPermission === 'not-determined') {
      const newCameraPermission = await Camera.requestCameraPermission();
      if (newCameraPermission === 'authorized') {
        openCamera();
        return;
      }
      if (newCameraPermission === 'denied') {
        onChange({ ERROR: 'denied' });
        return;
      }
      if (newCameraPermission === 'restricted') {
        onChange({ ERROR: 'restricted' });
        return;
      }
    }
    if (cameraPermission === 'restricted') {
      onChange({ ERROR: 'restricted' });
      return;
    }
    if (cameraPermission === 'denied') {
      const newCameraPermission = await Camera.requestCameraPermission();
      if (newCameraPermission === 'authorized') {
        openCamera();
        return;
      }
      if (newCameraPermission === 'denied') {
        onChange({ ERROR: 'denied' });
        return;
      }
      if (newCameraPermission === 'restricted') {
        onChange({ ERROR: 'restricted' });
        return;
      }
    }
    onChange({ ERROR: 'undefined' });
    return;
  };

  const styles = StyleSheet.create({
    background: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    camera: {
      width: '100%',
      height: '100%',
    },
    button: {
      position: 'absolute',
      bottom: 80,
      alignSelf: 'center',
      height: 63,
      width: 63,
      borderRadius: 31.5,
      backgroundColor: '#E3E3E3',
      borderColor: '#FFFFFF',
      borderWidth: 5,
      borderStyle: 'solid',
    },
    buttonBack: {
        position: 'absolute',
        top: 50,
        left: 25
    }
  });

  useEffect(() => {
    getPermisions();
    navigation.setOptions({ headerShown: false })
    return () => {
      navigation.setOptions({ headerShown: true })
    };
  }, [setPermision]);

  if (permision && devices.back) {
    return (
      <View style={styles.background}>
        <Camera
          ref={camera}
          photo={true}
          style={styles.camera}
          device={devices.back}
          isActive={true}
        />
        <TouchableOpacity style={styles.buttonBack} onPress={cancel}><Back/></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={createPhoto} i />
      </View>
    );
  }
  return (
    <View style={styles.background}>
      <ActivityIndicator />
    </View>
  );
}

async function openLibrary({ onSelect, onCancel }) {
  const { didCancel, assets } = await launchImageLibrary({
    mediaType: 'photo',
  });
  if (didCancel) {
    onCancel();
  } else {
    onSelect({ uri: assets[0].uri });
  }
}

async function PhotoConverterBase64({ uri }) {
  if (uri.includes('http')) {
    return await RNFS.downloadFile({
      fromUrl: uri,
      toFile: `${RNFS.CachesDirectoryPath}/image.png`,
    }).promise.then(async () => {
      const { path } = await ImageResizer.createResizedImage(`${RNFS.CachesDirectoryPath}/image.png`, 720, 720, 'JPEG', 80)
      return await RNFS.readFile( path, 'base64', );
    });
  } else {
    const { path } = await ImageResizer.createResizedImage(uri, 720, 720, 'JPEG', 80)
    return await RNFS.readFile(path, 'base64');
  }
}

async function PhotoConverterToBlob({ uri, base64 }) {
  
}

export default {
  Camera: Camera_,
  openLibrary,
  PhotoConverterBase64,
};
