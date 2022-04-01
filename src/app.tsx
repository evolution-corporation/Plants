import React, { useEffect, useState, useMemo } from 'react';
import { useNavigationContainerRef } from '@react-navigation/native';
import { useReduxDevToolsExtension } from '@react-navigation/devtools';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { accountState, userCheckAuth } from '~models/account'
import i18n from '~i18n'
import { StorageKey, LoadingStatus, AuthStatus, FirstLoading } from '~constant'
import RoutesApp from '~routes'

import LoadingAppScreen from '~screens/LoadingApp'
import IntroAppScreen from '~screens/IntroApp'

// Не корресткно работает с клавиатурой

enum AppLoading {
  FIRST_LOADING,
  LOADING,
  NOT_LOADING,
  NOT_FIRSTLOADING
}

function appLoadinHoock(): [AppLoading, Function] {
  const [isFirstLoading, setIsFirstLoading] = useState<FirstLoading>(FirstLoading.NOT_DEFINITELY)
  const [status, setStatus] = useState<AppLoading>(AppLoading.NOT_LOADING)

  useEffect(()=>{
    console.log('create Main Hook')
    const subsctibeAuthState = userCheckAuth()
    AsyncStorage.getItem(StorageKey.IS_FIRST_LOADING).then((isFirstLoadingMemory)=>{
      setIsFirstLoading(isFirstLoadingMemory == null || isFirstLoadingMemory == 'true' ? FirstLoading.TRUE : FirstLoading.FALSE)
    })
    return () => {
      console.log('remove Main Hook')
      subsctibeAuthState()
    }
  }, [setIsFirstLoading])

  useEffect(()=>{
    if (isFirstLoading != FirstLoading.NOT_DEFINITELY && 
      accountState.authStatus != AuthStatus.NOT_DEFINITELY && 
      i18n.loadingStatus == LoadingStatus.READY) {
        if (isFirstLoading == FirstLoading.TRUE) {
          setStatus(AppLoading.FIRST_LOADING)
        } else {
         setStatus(AppLoading.NOT_FIRSTLOADING)
        }
    } else {
      setStatus(AppLoading.LOADING)
    }
    
  }, [isFirstLoading, accountState.authStatus, i18n.loadingStatus])
  return [status, setIsFirstLoading]
}

const App = () => {
  const [appStatus, setIsFirstLoadingStatus] = appLoadinHoock()
  const navigationRef = useNavigationContainerRef();
  useReduxDevToolsExtension(navigationRef);
  
  const setFirstLoading = async () => {
    AsyncStorage.setItem(StorageKey.IS_FIRST_LOADING, 'false')
    setIsFirstLoadingStatus(FirstLoading.FALSE)
  }

  switch (appStatus) {
    case AppLoading.FIRST_LOADING:
      return <IntroAppScreen onPress={setFirstLoading}/>
    case AppLoading.NOT_FIRSTLOADING:
      return <RoutesApp />
    case AppLoading.LOADING :
      return <LoadingAppScreen status={LoadingStatus.LOADING} />
    case AppLoading.NOT_LOADING:
      return <LoadingAppScreen status={LoadingStatus.NOT_LOADING} />
  }
}

export default App