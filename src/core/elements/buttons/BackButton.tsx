import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, StyleSheet, BackHandler } from 'react-native';
import CrossGray from '~assets/iconsButton/Cross_Gray.svg';
import CrossWhite from '~assets/iconsButton/Cross_White.svg';
import ArrowGreen from '~assets/iconsButton/Arrow_Green.svg';
import ArrowWhite from '~assets/iconsButton/Arrow_White.svg';
import { HeaderBackButton } from '~constant';
import type { ViewStyle } from 'react-native';
import type { FC, ReactElement } from 'react';

declare type Arrow = { type: HeaderBackButton.ARROW; color: 'white' | 'green' };
declare type Cross = { type: HeaderBackButton.CROSS; color: 'white' | 'gray' };

interface Props {
	onPress?: Function;
	typeButton: Arrow | Cross;
	style?: ViewStyle;
}

const BackButton: FC<Props> = ({ onPress, typeButton = { type: HeaderBackButton.ARROW, color: 'white' }, style }) => {
	const navigation = useNavigation();
	const goBackStackScreen = navigation.canGoBack() ? navigation.goBack : () => {};
	const styles = StyleSheet.create({
		background: {
			padding: 15,
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: 'red',
		},
	});

	useEffect(() => {
		const backHandler = BackHandler.addEventListener(
			'hardwareBackPress',
			onPress ? () => onPress() : () => goBackStackScreen(),
		);
		return () => {
			backHandler.remove();
		};
	}, [navigation]);

	let iconButton: ReactElement | undefined;
	switch (typeButton.type) {
		case HeaderBackButton.ARROW:
			iconButton = typeButton.color == 'green' ? <ArrowGreen /> : <ArrowWhite />;
			break;
		case HeaderBackButton.CROSS:
			iconButton = typeButton.color == 'gray' ? <CrossGray /> : <CrossWhite />;
	}

	return (
		<TouchableOpacity
			style={[styles.background, style]}
			onPress={onPress ? () => onPress() : () => goBackStackScreen()}>
			{iconButton}
		</TouchableOpacity>
	);
};

export default BackButton;
