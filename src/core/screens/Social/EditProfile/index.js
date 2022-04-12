import React, { useReducer, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';

import { i18n } from '~services';
import { BackLeaves } from '~components';
import { actions } from '~store';
import { ImagePicker, InputValue, InputLogin, DropList } from './components';

const genders = ['Male', 'Female', 'Other'];
const categorys = [
  'Blogger',
  'Community',
  'Organization',
  'Editor',
  'Writer',
  'Gardener',
  'TheFlowerMan',
  'Photographer',
];

export default function ({ route, navigation }) {
  const [state, dispatch] = useReducer((_state, { type, payload }) => {
    switch (type) {
      case 'image':
        return { ..._state, image: payload };
      case 'name':
        return { ..._state, name: payload };
      case 'login':
        return { ..._state, login: payload };
      case 'category':
        return { ..._state, category: payload };
      case 'gender':
        return { ..._state, gender: payload };
      case 'loading':
        return { ..._state, isLoading: true};
      case 'openDropList':
        return { ..._state, openDropList: payload }
    }
  }, { isLoading: false });
  const headerHeight = useHeaderHeight();
  const dispatchRedux  = useDispatch();
  const user = useSelector((state) => state.user);
  const styles = StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      paddingHorizontal: 24,
    },
    imagePicker: {
      marginTop: 40,
      marginBottom: 39,
      alignSelf: 'center',
    },
    inputName: {
      width: '100%',
    },
    InputLogin: {
      marginTop: 22,
      width: '100%',
    },
  });

  const editDataUser = async () => {
    dispatch({ type: 'loading' })
    try {
      await dispatchRedux (actions.editUserData(state)).unwrap()
      navigation.goBack()
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (route.params.isPress) {
      editDataUser()
    }
    return () => {};
  }, [route.params.isPress]);

  if (state.isLoading) return (
    // <BackLeaves style={{  justifyContent: 'center', alignItems: 'center' }}>
    <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#86B738', flex: 1 }}>
      <ActivityIndicator color={'#FFFFFF'} size={'large'} />
    </View>
    // </BackLeaves>
  )

  return (
    // <BackLeaves headerHeight={headerHeight}>
      <View style={styles.background}>
        <ImagePicker
          style={styles.imagePicker}
          setPhoto={(value) => {
            navigation.setParams({ permision: true });
            dispatch({ type: 'image', payload: value });
          }}
          initImage={user.avatar}
        />
        <InputValue
          onChange={(value) => {
            navigation.setParams({ permision: true });
            dispatch({ type: 'name', payload: value });
          }}
          title={i18n.t('name')}
          initValue={user.name}
          style={styles.inputName}
        />
        <InputLogin
          initialLogin={user.login}
          onChange={(value) => dispatch({ type: 'login', payload: value })}
          style={styles.InputLogin}
          setPermission={(permision) => navigation.setParams({ permision })}
        />
        <DropList
          values={[...categorys, null]}
          initValue={user.category}
          onChangeValue={(value) => {
            navigation.setParams({ permision: true });
            dispatch({ type: 'category', payload: value });
          }}
          name={i18n.t('category')}
          isShowList={state.openDropList == 'categoty'}
          onOpen={()=>dispatch({ type: 'openDropList', payload: 'categoty' })}
        />
        <DropList
          values={[...genders, null]}
          initValue={user.gender}
          onChangeValue={(value) => {
            navigation.setParams({ permision: true });
            dispatch({ type: 'gender', payload: value });
          }}
          name={i18n.t('gender')}
          isShowList={state.openDropList == 'gender'}
          onOpen={()=>dispatch({ type: 'openDropList', payload: 'gender' })}
        />
      </View>
    // </BackLeaves>
  );
}
