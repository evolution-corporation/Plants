import React, { useEffect } from 'react';
import { View, ImageBackground, StyleSheet, Dimensions, StatusBar, Platform, KeyboardAvoidingView } from 'react-native';
import { BackButton } from '~elements/buttons';
import { HeaderBackButton } from '~constant';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useHeaderHeight } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import type { ViewProps } from 'react-native';
import type { FC } from 'react';
import type { StackNavigationOptions } from '@react-navigation/stack';

interface OptionsScreen extends ViewProps {
	typeHeaderBackButton: HeaderBackButton;
	goBackFunction?: Function;
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
		backgroundColor: '#86B738',
	},
	image: {
		position: 'absolute',
		top: 0,
		left: 0,
		flex: 1,
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
	},
	headerTitle: {
		textAlign: 'center',
		color: '#FFFFFF',
		fontFamily: Platform.OS == 'android' ? 'Roboto-Medium' : 'System',
		fontSize: 18,
		fontWeight: '600',
	},
});

const screenOptions: StackNavigationOptions = {
	headerTransparent: true,
	headerTitleStyle: styles.headerTitle,
	headerTitleAlign: 'center',
};

const BackLeaves: FC<OptionsScreen> = (optionsPropsScreen: OptionsScreen) => {
	const { typeHeaderBackButton = HeaderBackButton.NONE, goBackFunction, children, style } = optionsPropsScreen;
	const headerHeightHook = useHeaderHeight();
	const navigation = useNavigation();

	useEffect(() => {
		navigation.setOptions(screenOptions);
		return () => {};
	}, [navigation]);

	useEffect(() => {
		if (typeHeaderBackButton != HeaderBackButton.NONE) {
			let headerBackButton: FC | undefined;
			headerBackButton = () => (
				<BackButton
					onPress={goBackFunction}
					typeButton={{ type: typeHeaderBackButton, color: 'white' }}
				/>
			);
			navigation.setOptions({ headerLeft: headerBackButton });
		}
		return () => {};
	}, [typeHeaderBackButton, goBackFunction]);

	return (
		<View style={styles.background}>
			<StatusBar
				backgroundColor={'transparent'}
				barStyle={'light-content'}
			/>
			<ImageBackground
				source={require('./assets/Leaves.png')}
				style={styles.image}>
				<SafeAreaView style={[{ flex: 1, justifyContent: 'flex-end', paddingTop: headerHeightHook }, style]}>
					<KeyboardAvoidingView
						behavior={'padding'}
						keyboardVerticalOffset={40}>
						{children}
					</KeyboardAvoidingView>
				</SafeAreaView>
			</ImageBackground>
		</View>
	);
};

export default BackLeaves;
