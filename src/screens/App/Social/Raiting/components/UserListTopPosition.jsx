import React, { useReducer, useEffect, memo } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { database } from '~services';

import { UserTopPosition } from './dump'

export function UserListTopPosition({ timePeriod, style }) {
  const [state, dispatch] = useReducer((_state, { type, payload })=>{
    switch (type) {
      case 'loading':
        return { ..._state, isLoading: true };
      case 'week':
        return { ..._state, isLoading: false, week: payload.userList, my_week: payload.myScore };
      case 'month':
        return { ..._state, isLoading: false, month: payload.userList, my_month: payload.myScore };
      case 'allTime':
        return { ..._state, isLoading: false, allTime: payload };
      default:
        break;
    }
  }, { isLoading: true });
  
  const user = useSelector(state => state.user)

  useEffect(() => {
    let isActivate = true;
    if (!state[timePeriod]) {
      dispatch({ type: 'loading' });
      database.getRaiting(timePeriod).then((data) => {
        if (isActivate) {
          dispatch({ type: timePeriod, payload: data });
        }
      });
    }
    return () => {
      isActivate = false;
    };
  }, [timePeriod]);

  const styles = StyleSheet.create({
    flatlist: {
      flex: 1,
    },
    background: {
      flex: 1,
    },
    loadingBackground: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    myPosition: {
      borderBottomColor: '#EBEBEB',
      borderBottomWidth: 1,
      paddingBottom: 23,
    }
  });

  if (state.isLoading) 
    return (
      <View style={styles.loadingBackground}>
        <ActivityIndicator color={'#84B838'} size={'large'}/>
      </View>
    );

  return (
    <View style={[styles.background, style]}>
      <UserTopPosition 
        position={state[timePeriod] ? state[timePeriod].findIndex((value)=>(value.uid == user.uid)) : 0} 
        user={{...user, count: timePeriod != 'allTime' ? state[`my_${timePeriod}`] : user.plantCount }}
        style={styles.myPosition} 
      />
      <FlatList
        style={styles.flatlist}
        data={state[timePeriod]}
        renderItem={({ item, index }) => (
          <UserTopPosition position={index + 1} user={item} />
        )}
      />
    </View>
  );
}

export default memo(UserListTopPosition)