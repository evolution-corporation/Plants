import React, { useState, useReducer, useEffect } from 'react';
import {
  View,
  TextInput,
  Platform,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Text,
  Animated,
} from 'react-native';
import { InfoWhiteCheck, InfoGreenCheck, InfoWhiteCross } from './assets';
import badWords from 'bad-words';
import { database, i18n } from '~services';

const Filter = new badWords({ placeHolder: '*' });

export default function ({ style, setPermision, initialLogin, setLogin }) {
  const [isLoading, setIsLoading] = useState(false);
  const [login, _setLogin] = useState('');
  const [state, dispatch] = useReducer(
    (state, { type, payload }) => {
      setIsLoading(false);
      switch (type) {
        case 'Clear':
          return {
            ...state,
            ERORR: null,
            listLogin: [],
            status: false,
          };
        case 'Ok':
          return {
            ...state,
            ERORR: null,
            listLogin: [],
            status: true,
          };
        case 'SmallSize':
          return {
            ...state,
            ERORR: null,
            listLogin: [],
            status: false,
          };
        case 'BadWords':
          return {
            ...state,
            ERORR: 'BadWords',
            listLogin: [],
            status: false,
          };
        case 'Employed':
          return {
            ...state,
            ERORR: 'Employed',
            listLogin: payload.listnick,
            status: false,
          };
        default:
          break;
      }
    },
    {
      ERORR: null,
      listLogin: [],
      status: false,
    },
  );

  let timer = null;
  const check = async (_login) => {
    setIsLoading(true);
    _setLogin(_login);
    setLogin(_login);
    if (_login.replace(' ', '') == '' || _login.length <= 2)
      {setPermision(false); return dispatch({ type: 'SmallSize' })};
    if (_login.length >= 30) {setPermision(false); return dispatch({ type: 'SmallSize' })};
    if (!/^[a-zA-Z0-9._]+$/.test(_login)){setPermision(false); return dispatch({ type: 'BadWords' });}
    if (timer) clearTimeout(timer);
    timer = setTimeout(async () => {
      result = await checkLogin(_login);
      if (!result.status){
        setPermision(false);
        return dispatch({
          type: 'Employed',
          payload: { listnick: result.randomNick },
        });}
      setPermision(true);
      dispatch({ type: 'Ok' });
    }, 400);
  };

  useEffect(() => {
    check(initialLogin);
  }, [dispatch]);

  const styles = StyleSheet.create({
    inputlogin: {
      backgroundColor: 'rgba(240, 242, 238, 0.19)',
      borderWidth: 1,
      borderStyle: 'solid',
      borderRadius: 10,
      width: '100%',
      height: 45,
      paddingLeft: 15,
      color: '#FFFFFF',
      fontSize: 13,
      fontWeight: '500',
      lineHeight: 13,
      fontStyle: 'normal',
      fontFamily: Platform.OS == 'android' ? 'Roboto' : 'System',
    },
    backGround: {
      width: '100%',
    },
    text: {
      color: '#FF5C00',
      fontSize: 13,
    },
  });

  async function checkLogin(login) {
    const result = await database.checkLogin(login);
    if (!result.empty) return { status: false };
    const nick_word = [
      'forest',
      'tree',
      'green',
      'Earth',
      'leaflet',
      'big',
      'small',
      'white',
      'black',
      'water',
      'sun',
      'fire',
      'flower',
    ];
    const randomNick = [];
    let loginRandom = '';
    for (let i = 0; i < 5; i++) {
      loginRandom = `${login}.${nick_word.splice(
        Math.floor(Math.random() * (nick_word.length - 1)),
        1,
      )}`;
      randomNick.push(loginRandom);
    }
    return { status: true, randomNick };
  }
  return (
    <View style={[styles.backGround, style]}>
      <View>
        <TextInput
          style={[
            styles.inputlogin,
            { borderColor: state.ERORR ? '#FF5C00' : '#CBE1A8' },
          ]}
          placeholder={i18n.t('048a0ca1-119e-44ab-93bf-433bffac7b18')}
          onChangeText={check}
          value={login}
        />
        <TouchableOpacity
          style={{ position: 'absolute', right: 2, top: 2, padding: 13 }}
          onPress={
            state.ERORR
              ? () => {
                  setPermision(false);
                  dispatch({ type: 'Clear' });
                }
              : null
          }
        >
          {isLoading ? (
            <ActivityIndicator size={'small'} color={'#FFFFFF'} />
          ) : state.ERORR ? (
            <InfoWhiteCross />
          ) : state.status ? (
            <InfoWhiteCheck />
          ) : null}
        </TouchableOpacity>
      </View>
      <View style={{ width: 315, marginTop: 5, marginBottom: 4 }}>
        <Text style={[styles.text, { opacity: 1 }]}>
          {state.ERORR == 'BadWords'
            ? i18n.t('ec03e6f1-90c5-43a1-ba96-a9b553166f04')
            : state.ERORR == 'Employed'
            ? i18n.t('eba150ed-ea12-4781-9d1f-f5fabd125764')
            : null}
        </Text>
      </View>
      <FlatList
        data={state.listLogin}
        style={{}}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Login
            text={item}
            input={check}
            position={
              index == 0
                ? 'start'
                : index == state.listLogin.length - 1
                ? 'end'
                : 'middle'
            }
          />
        )}
        refreshing={true}
      />
    </View>
  );
}

function Login({ text, input, position }) {
  const styles = StyleSheet.create({
    selectLoginBackGround: {
      backgroundColor: '#FFFFFF',
      height: 41,
      width: '100%',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 15,
      paddingRight: 15,
      borderTopColor: '#F2F2F2',
      borderTopWidth: 1,
    },
    selectLoginText: {
      color: '#2B2A29',
      fontSize: 11,

      fontWeight: '500',
      lineHeight: 13,
      fontStyle: 'normal',
    },
    selectLoginBackGroundTop: {
      paddingTop: 1,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      height: 41,
      borderTopWidth: 0,
    },
    selectLoginBackGroundBottom: {
      paddingBottom: 1,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      height: 41,
      marginBottom: 18,
    },
  });

  return (
    <TouchableOpacity
      style={[
        styles.selectLoginBackGround,
        position == 'start'
          ? styles.selectLoginBackGroundTop
          : position == 'end'
          ? styles.selectLoginBackGroundBottom
          : null,
      ]}
      onPress={() => {
        input(text);
      }}
    >
      <Text style={styles.selectLoginText}>{text}</Text>
      <InfoGreenCheck />
    </TouchableOpacity>
  );
}
