import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text, Image, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { TextHref, MessageButton } from '~components';
import { database, i18n } from '~services';
import { actions } from '~store';

import { InputStatusUser } from './dump';

export default function ({ avatar, name, login, category, status, uid }) {
  const my_uid = useSelector((state) => state.user.uid);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const styles = StyleSheet.create({
    background: {
      backgroundColor: '#FFFFFF',
      width: '100%',
      height: 194,
      flexDirection: 'row',
      paddingTop: 21,
      paddingBottom: 20,
      paddingLeft: 18,
      paddingRight: 29,
    },
    image: {
      height: 153,
      width: 153,
      borderRadius: 20,
    },
    userInfo: {
      paddingTop: 4,
      paddingLeft: 17,
    },
    name: {
      color: '#131313',
      fontWeight: '500',
      fontFamily: Platform.OS === 'android' ? 'Roboto-Medium' : 'System',
      fontSize: 14,
      lineHeight: 17,
    },
    category: {
      color: '#75B904',
      fontFamily: Platform.OS === 'android' ? 'Roboto-Medium' : 'System',
      fontSize: 12,
      fontWeight: '600',
      lineHeight: 14,
      marginVertical: 2,
    },
    status: {
      flex: 1,
      marginTop: 5,
    },
    userInfoBackground: {
      flex: 1,
      justifyContent: 'space-between',
    },
    buttomEditProfile: {
      alignSelf: 'flex-end',
      color: '#75B904',
      fontSize: 11,
      fontWeight: '600',
    },
    messageButton: {
      position: 'absolute',
      bottom: -15,
      right: -15
    },
  });
  const editStatus = async (status) => {
    try {
      await dispatch(actions.editUserData({ status })).unwrap();
    } catch (error) {
      console.error(error)
    }
  };
  if (!login) return <ActivityIndicator />;

  return (
    <View style={styles.background}>
      <View style={styles.image}>
        <Image
          style={styles.image}
          source={avatar ? { uri: `data:image/png;base64, ${avatar}`} : require('~assets/User.png')}
        />
        {my_uid != uid ? <MessageButton style={styles.messageButton} id={uid} avatar={avatar} name={name ?? login} /> : null }
      </View>
      <View style={styles.userInfoBackground}>
        <View style={styles.userInfo}>
          <Text style={styles.name}>{name ?? login}</Text>
          <Text style={styles.category}>
            {category ? i18n.t(category) : null}
          </Text>
          {my_uid == uid ? (
            <InputStatusUser
              getStatus={editStatus}
              status={status}
              style={styles.status}
            />
          ) : (
            <Text style={styles.status}>{status}</Text>
          )}
        </View>
        {my_uid == uid ? (
          <TextHref
            style={styles.buttomEditProfile}
            event={() => navigation.navigate('EditProfile')}
            text={i18n.t('edit')}
          />
        ) : null}
      </View>
    </View>
  );
}
