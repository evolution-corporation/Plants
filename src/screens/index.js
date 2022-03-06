import React, { useEffect, memo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { database, asyncStorage, i18n } from '~services';
import { actions } from '~store';
import { Auth, AddUserInfo } from './Auth';
import Splash from './Splash';
import App from './App';
import { useNavigation } from '@react-navigation/native';

export function Screens () {
  const navigator = useSelector(state => state.navigator.navigation);
  const [language, setLanguage] = useState()
  const user = useSelector(state => state.user);
  const navigation = useNavigation()
  const dispatch = useDispatch();

  useEffect(() => {
    i18n.setListner(setLanguage)
    i18n.setLanguage().then(()=> {
      database.onAuthChanged(async (status) => {
        const { user } = await database.authenticateUser(status);
        if (user) {
          dispatch(actions.sigIn(user));
        } else {
          asyncStorage.isFirstLoading().then((status) => {
            dispatch(actions.appLoading(status));
          });
        }
      });
    })
    return () => {};
  }, [dispatch]);

  useEffect(()=>{
    if (navigator == 'auth') navigation.reset({ ...navigation.getState(), stale: true })
  }, [language])

  useEffect(() => {
    // что будет происходить перед загрузкой пользователя
    let subscribeEvent = {}
    if (navigator == 'auth') {
      dispatch(actions.getReserveMarker())
      dispatch(actions.checkPermision())
      dispatch(actions.getWidgetsList())
      database.chat.setAccounUid()
      //database.chat.subscribeEvent({ callback: ({ text }) => console.log(text) }).then(subscribe => subscribeEvent.chat = subscribe)
    }
    return () => {
      if (subscribeEvent.chat) subscribeEvent.chat()
    }
  }, [navigator])

    if (navigator == 'noAuth') return <Auth /> ;
    if (navigator == 'auth') {
      // Делаем проверку на данных у пользователя, и если они не полные переводим его на навигатор регистраци
      // пользователь должен пройти/завершить регистрацию
      if (!user.login || !user.birthday)
        return <AddUserInfo isNoLogin={!user.login} />;
      // Устанавливаем главный навигатор
      return <App />;
    }
    // Если ещё информация не была получена, то ничего не выводим
    return <Splash />;
}

export default memo(Screens)