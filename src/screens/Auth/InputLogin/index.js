import React, { useState, useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { BackLeaves, ColorButton } from '~components';
import { i18n } from '~services';
import { Login } from './components';
import { actions } from '~store';
import { useDispatch } from 'react-redux';

export default function ({ navigation, route }) {
  const [login, setLogin] = useState(route.params.login);
  const headerHeight = useHeaderHeight();
  const [permision, setPermision] = useState(false);
  const dispatch = useDispatch();
  const saveLogin = () => {
      dispatch(actions.editUserData({ login })).unwrap()
        .then(() => navigation.navigate('AddUserInfo')).catch(()=>alert('Error!')) // TODO!
  };

  useEffect(() => {}, []);

  const styles = StyleSheet.create({
    background: {
      paddingHorizontal: 30,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    colorButton: { marningTop: 8, backgroundColor: '#EFEFEF' },
    textHelper: {
      color: 'rgba(255, 255, 255, 0.7)',
      textAlign: 'center',

      fontSize: 12,
      lineHeight: 14,
      fontWeight: '500',
      fontStyle: 'normal',
      marginTop: 4,
    },
  });

  return (
    <BackLeaves style={styles.background} headerHeight={headerHeight}>
      <Login
        setLogin={setLogin}
        setPermision={setPermision}
        initialLogin={route.params.login}
      />
      <ColorButton
        text={i18n.t('continue')}
        event={permision ? saveLogin : null}
        style={styles.colorButton}
      />
      <Text style={styles.textHelper}>
        {i18n.t('dc242d9b-76dc-4c61-8261-84e1a7db0c53')}
      </Text>
    </BackLeaves>
  );
}
