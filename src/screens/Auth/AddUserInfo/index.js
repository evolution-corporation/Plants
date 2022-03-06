import React, { useState } from 'react';
import { Text, View, Platform, StyleSheet } from 'react-native';
import { BackLeaves, ColorButton, PhotoButton } from '~components';
import { useHeaderHeight } from '@react-navigation/elements';
import { computerVision, i18n } from '~services';
import { ScrollSelectDate } from './components';
import { actions } from '~store';
import { useDispatch } from 'react-redux';

export default function ({ navigation, route }) {
  const [birthday, setBirthday] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const headerHeight = useHeaderHeight();
  const dispatch = useDispatch();
  const checkData = async () => {
    try {
      await computerVision.checkImageCensure({ image: avatar })
      await dispatch(actions.editUserData({ avatar, birthday: +birthday })).unwrap()
    } catch (error) {
      console.error(error);
    }
  };

  const styles = StyleSheet.create({
    background: {
      paddingHorizontal: 30,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    topView: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 9,
    },
    topViewText: {
      textAlign: 'center',
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: 12,
      lineHeight: 14,
      fontWeight: '500',
      fontFamily: Platform.OS == 'android' ? 'Roboto-Medium' : 'System',
      marginBottom: 30,
    },
    scrollSelectDate: { marginTop: 45 },
    bottomView: { width: '100%', paddingBottom: 30 },
    colorButton: {
      backgroundColor: '#EFEFEF',
      color: '#4C4C4C',
      marginVertical: 12,
    },
    bottomViewText: {
      color: '#CBE1A8',
      fontSize: 11,
      lineHeight: 13,
      textAlign: 'center',
      fontWeight: '600',
      fontFamily: Platform.OS == 'android' ? 'Roboto-Medium' : 'System',
    },
  });
  return (
    <BackLeaves style={styles.background} headerHeight={headerHeight}>
      <View style={styles.topView}>
        <Text style={styles.topViewText}>
          {i18n.t('153a0c8c-df43-4949-869c-b793690ba6ef')}
        </Text>
        <PhotoButton setPhoto={setAvatar} initImage={route.params.photo} />
        <ScrollSelectDate
          setDate={setBirthday}
          style={styles.scrollSelectDate}
        />
      </View>
      <View style={styles.bottomView}>
        <ColorButton
          text={i18n.t('b842440e-2ccd-43b5-b945-d48a7c44707f')}
          style={styles.colorButton}
          event={checkData}
        />
        <Text style={styles.bottomViewText}>
          {i18n.t('87f81039-b0b8-4c9f-9c03-dc592c3ac004')({
            openPolitikaKonfidentsialnosti: () => {
              navigation.navigate('Documents', {
                document: 'politikaKonfidentsialnosti',
              });
            },
            openPolzovatelskoeSoglashenie: () => {
              navigation.navigate('Documents', {
                document: 'polzovatelskoeSoglashenie',
              });
            },
            styles: styles.bottomViewText,
          })}
        </Text>
      </View>
    </BackLeaves>
  );
}
