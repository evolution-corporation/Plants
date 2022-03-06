import React, { useReducer, useEffect, memo } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';

import { BackLeaves } from '~components';
import { UserInfo, UserListPlant } from './components';
import { useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { database } from '~services';

export function Profile ({ route, navigation }) {
  const headerHeight = useHeaderHeight();
  const [state, dispatch] = useReducer((_state, { payload, type })=> {
    switch (type) {
      case 'isLoading': return { ..._state, isLoading: true }
      case 'setUser': return { user: payload, isLoading: false }
    }
  },{ isLoading: true })
  const isFocused = useIsFocused()
  const user = useSelector(state => state.user)
  const styles = StyleSheet.create({
    background: {
      flex: 1,
      justifyContent: 'space-between',
    },
    userListPlant: {
      flex: 1,
    },
    line: {
      width: 61,
      height: 4,
      backgroundColor: '#FFFFFF',
      borderRadius: 4,
      alignSelf: 'center',
      marginVertical: 9,
    },
  });

  useEffect(()=>{
    if (route.params.uid != user.uid) {
      database.getUserData(route.params.uid).then(payload => {
        if (isFocused) {
          dispatch({ type: 'setUser', payload })
        }
      })
    } else {
      dispatch({ type: 'setUser', payload: null })
    }
  }, [dispatch])

  if (state.isLoading) {
    return (
      <BackLeaves style={{ justifyContent: 'center', alignItems: 'center' }} headerHeight={headerHeight}>
        <ActivityIndicator color={'#FFFFFF'} size={'large'} />
      </BackLeaves>
    )
  }
  
  return (
    <BackLeaves style={styles.background} headerHeight={headerHeight}>
      <UserInfo
        avatar={ state.user ? state.user.avatar : user.avatar}
        name={ state.user ? state.user.name : user.name}
        login={ state.user ? state.user.login : user.login}
        category={ state.user ? state.user.category : user.category}
        status={ state.user ? state.user.status : user.status}
        uid={ state.user ? state.user.uid : user.uid}
      />
      <View style={styles.line} />
      <UserListPlant
        uid={ state.user ? state.user.uid : user.uid}
        name={ state.user ? state.user.name ?? state.user.login : user.name ?? user.login}
        plants={ state.user ? state.user.plants : user.plants}
        style={styles.userListPlant}
      />
    </BackLeaves>
  );
}

export default memo(Profile)