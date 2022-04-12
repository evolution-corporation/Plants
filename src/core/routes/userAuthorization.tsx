import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import type { FC } from 'react';

import InSignSelectMethodScreen from '~screens/InSignSelectMethod';
import InSignWithPhone from '~screens/AuthorizationWithPhone';

const styles = StyleSheet.create({});

const noAuthNavigator: FC = ({}) => {
	const { Navigator, Screen } = createStackNavigator<AuthorizationStack>();

	return (
		<Navigator>
			<Screen
				component={InSignSelectMethodScreen}
				name={'InSignSelectMethod'}
			/>
			<Screen
				component={InSignWithPhone}
				name={'InSignWithPhone'}
			/>
		</Navigator>
	);
};

export default noAuthNavigator;
