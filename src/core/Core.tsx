import React, { useEffect, useReducer, useCallback } from 'react';
import { useNavigationContainerRef } from '@react-navigation/native';
import { useReduxDevToolsExtension } from '@react-navigation/devtools';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKey, LoadingStatus, AuthStatus, FirstLoading, Language } from '~constant';
import AccountContext, { AccountState } from '~models/account';
import RoutesApp from '~routes';
import LoadingAppScreen from '~screens/LoadingApp';
import IntroAppScreen from '~screens/IntroApp';
import { i18n } from './services';
// Не корресткно работает с клавиатурой

enum AppLoading {
	FIRST_LOADING,
	LOADING,
	NOT_LOADING,
	NOT_FIRSTLOADING,
}

interface AppState {
	isFirstLoading: FirstLoading;
	i18nLoadingStatus: LoadingStatus;
	appStatus: AppLoading;
	accountLoadingState: AuthStatus;
	accountState: AccountState;
	appLanguage?: Language;
}

const initState: AppState = {
	isFirstLoading: FirstLoading.NOT_DEFINITELY,
	i18nLoadingStatus: LoadingStatus.NOT_LOADING,
	appStatus: AppLoading.NOT_LOADING,
	accountLoadingState: AuthStatus.NOT_DEFINITELY,
	accountState: new AccountState(AuthStatus.NOT_DEFINITELY),
};

type actionsType =
	| { type: 'isFirstLoading'; payload: FirstLoading }
	| { type: 'i18n'; payload: Language | null }
	| { type: 'account'; payload: AuthStatus };

function appReducer(state: AppState, { type, payload }: actionsType): AppState {
	switch (type) {
		case 'i18n':
			if (payload != null) {
				state.appLanguage = payload;
				state.i18nLoadingStatus = LoadingStatus.READY;
			} else {
				state.i18nLoadingStatus = LoadingStatus.NOT_LOADING;
			}
			break;
		case 'isFirstLoading':
			state.isFirstLoading = payload;
			break;
		case 'account':
			state.accountLoadingState = payload;
			break;
	}
	if (
		state.i18nLoadingStatus != LoadingStatus.NOT_LOADING &&
		state.isFirstLoading != FirstLoading.NOT_DEFINITELY &&
		state.accountLoadingState != AuthStatus.NOT_DEFINITELY
	) {
		if (state.isFirstLoading == FirstLoading.TRUE) {
			state.appStatus = AppLoading.FIRST_LOADING;
		} else {
			state.appStatus = AppLoading.NOT_FIRSTLOADING;
		}
	} else {
		state.appStatus = AppLoading.LOADING;
	}
	return { ...state };
}

const Core = () => {
	const [state, dispatch] = useReducer(appReducer, initState);

	useEffect(() => {
		AsyncStorage.getItem(StorageKey.IS_FIRST_LOADING).then((isFirstLoadingMemory) => {
			dispatch({
				type: 'isFirstLoading',
				payload:
					isFirstLoadingMemory == null || isFirstLoadingMemory == 'true' ? FirstLoading.TRUE : FirstLoading.FALSE,
			});
		});
		i18n.setSubscribe((status) => {
			dispatch({ type: 'i18n', payload: status });
		});
		const subscribeCheckAuthorization = state.accountState.userCheckAuth((status) => {
			dispatch({ type: 'account', payload: status });
		});
		return () => {
			subscribeCheckAuthorization();
			console.log('remove Main Hook');
		};
	}, [dispatch]);

	const navigationRef = useNavigationContainerRef();
	useReduxDevToolsExtension(navigationRef);

	const setFirstLoading = useCallback(async () => {
		AsyncStorage.setItem(StorageKey.IS_FIRST_LOADING, 'false');
		dispatch({ type: 'isFirstLoading', payload: FirstLoading.FALSE });
	}, [dispatch]);

	switch (state.appStatus) {
		case AppLoading.FIRST_LOADING:
			return <IntroAppScreen onPress={setFirstLoading} />;
		case AppLoading.NOT_FIRSTLOADING:
			return (
				<AccountContext.Provider value={state.accountState}>
					<RoutesApp />
				</AccountContext.Provider>
			);
		case AppLoading.LOADING:
			return <LoadingAppScreen status={LoadingStatus.LOADING} />;
		case AppLoading.NOT_LOADING:
			return <LoadingAppScreen status={LoadingStatus.NOT_LOADING} />;
	}
};

export default Core;
