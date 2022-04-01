import { useNavigation } from '@react-navigation/native';
import i18n from 'i18n-js';
import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';

export default function ({ user, position, style }) {
  const navigation = useNavigation()
  const styles = StyleSheet.create({
    background: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginVertical: 11.5
    },
    userPosition: {
      color: '#273F00',
      fontWeight: '500',
      fontSize: 14,
      lineHeight: 17,
      fontFamily: Platform.OS === 'android' ? 'Roboto-Medium' : 'System',
      marginRight: 14,
    },
    avatar: {
      borderRadius: 25,
      height: 50,
      width: 50,
    },
    userInfo: {
      flex: 1,
      justifyContent: 'center',
      alignContent: 'flex-start',
      marginLeft: 11,
    },
    userLogin: {
      color: '#273F00',
      fontFamily: Platform.OS === 'android' ? 'Roboto-Medium' : 'System',
      fontWeight: '500',
      fontSize: 16,
      lineHeight: 19,
    },
    userScore: {
      color: '#273F00',
      fontFamily: Platform.OS === 'android' ? 'Roboto-Medium' : 'System',
      fontSize: 12,
      lineHeight: 14,
      fontWeight: '500',
    },
    userScoreText: {
      fontWeight: '400',
      fontFamily: Platform.OS === 'android' ? 'Roboto-Regular' : 'System',
    },
  });

  if (!user) {
    return null;
  }

  return (
    <TouchableOpacity style={[styles.background, style]} onPress={()=>{navigation.navigate('Profile', {...user})}}>
      <Text style={styles.userPosition}>{position == -1 ? '50+' : position}</Text>
      <Image source={user.avatar ? { uri: `data:image/png;base64, ${user.avatar}`} : require('~assets/User.png')} style={styles.avatar} />
      <View style={styles.userInfo}>
        <Text style={styles.userLogin}>{user.login}</Text>
        <Text style={styles.userScore}>{i18n.t('tree', { count: user.count ?? 0 })}</Text>
      </View>
    </TouchableOpacity>
  );
}