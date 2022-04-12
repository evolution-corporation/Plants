import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FirstLoading, AuthStatus } from '~constant';
import AccountContext from '~models/account';
import type { FC } from 'react';

import UserAuthorizationNavigator from './userAuthorization';
import RegistrationAccountScreen from '~screens/RegistrationAccount';
import LoadingScreen from '~screens/LoadingApp';
// import NurseriesNavigator from './nurseries'
// import MainScreen from '~screens/Main'

const Routes: FC = ({}) => {
	const { Navigator, Screen } = createNativeStackNavigator<MainStack>();
	const AccountAuthorizationState = useContext(AccountContext);
	if (AccountAuthorizationState.authStatus == AuthStatus.AUTHORIZED) {
		return (
			<NavigationContainer>
				<Navigator>
					<Screen
						name={'RegistrationAccount'}
						component={RegistrationAccountScreen}
					/>
					{/* <Screen name={'Main'} component={MainScreen}/> */}
					{/* <Screen name={'Nurseries'} component={NurseriesNavigator}/> */}
				</Navigator>
			</NavigationContainer>
		);
	} else {
		return (
			<NavigationContainer>
				<UserAuthorizationNavigator />
			</NavigationContainer>
		);
	}
};

export default Routes;
