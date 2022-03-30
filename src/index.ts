import { useEffect, useReducer } from 'react';
import { useNavigationContainerRef } from '@react-navigation/native';
import { useReduxDevToolsExtension } from '@react-navigation/devtools';
import { accountState, userCheckAuth } from '~models/account'
import { initLanguage } from '~i18n'
import { StorageKey, Language, LoadingStatus } from '~constant'
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from './LoadingScreen'

interface AppState {
  appStatus: LoadingStatus,
  percent: number,
  isFirstLoading: boolean
}

type typeAction = |
{ type: 'editLoadingStatus', payload: LoadingStatus } |
{ type: 'editLanguage', payload: Language } | 
{ type: 'setIsFirstLoading', payload: boolean }

function appStateReduser(state: AppState, { type, payload }: typeAction): AppState  {
  switch (type) {
    case 'editLoadingStatus':
      state.appStatus = payload
      break;
    // case 'editLanguage':
    //   state.language = payload
    //   state.percent = 33
    //   break;
    case 'setIsFirstLoading':
      state.isFirstLoading = payload
      state.percent = 66
      break;
  }
  return state
}

const appInitState: AppState = {
  appStatus: LoadingStatus.NOT_LOADING,
  percent: 0,
  isFirstLoading: true
}

const App = () => {
  const [appState, dispathState] = useReducer(appStateReduser, appInitState)
  const navigationRef = useNavigationContainerRef();
  useReduxDevToolsExtension(navigationRef);

  const loadingApp = async () => {
    dispathState({ type: 'editLoadingStatus', payload: LoadingStatus.LOADING }) 
    await initLanguage()
    dispathState({ type: 'setIsFirstLoading', payload: Boolean(await AsyncStorage.getItem(StorageKey.IS_FIRST_LOADING)) })
    console.log(accountState.authStatus, accountState.account)
    dispathState({ type: 'editLoadingStatus', payload: LoadingStatus.READY }) 
  }


  useEffect(()=>{
    loadingApp()
    const subsctibeAuthState = userCheckAuth()
    return () => {
      subsctibeAuthState()
    }
  }, [dispathState])
  
  if (appState.appStatus != LoadingStatus.READY) {
    return LoadingScreen({ status: appState.appStatus })
  } else {
    if (accountState.account) {

    } else {

    }
  }
}

export default App