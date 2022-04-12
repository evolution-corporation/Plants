import React, { useEffect, useReducer } from 'react';
import { Animated, StyleSheet, View, Image, Text } from 'react-native';
import { ParkCity as Background } from '~elements/background';
import { ColorButton } from '~elements/buttons';
import TreeLogo from '~assets/logo/TreeLogo_White_Big.svg';
import i18n from '~i18n';
import { LoadingStatus } from '~constant';
import { styleImage } from '~globalStyle';
import type { FC } from 'react';

interface IntroAppProps {
	onPress: Function;
}

interface animationValue {
	position: Animated.AnimatedInterpolation;
	size: Animated.AnimatedInterpolation;
	show: Animated.AnimatedInterpolation;
	hide: Animated.AnimatedInterpolation;
	startAnimation: Function;
}

const styles = StyleSheet.create({
	background: {
		paddingHorizontal: 30,
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	logo: {
		alignSelf: 'center',
	},
	introView: {
		position: 'absolute',
		bottom: 0,
	},
	textIntro: {
		color: '#FFFFFF',
		fontStyle: 'normal',
		fontWeight: '700',
		fontFamily: 'Gilroy',
		textAlign: 'center',
		marginBottom: 30,
		width: 256,
	},
	button: {
		backgroundColor: '#EFEFEF',
		width: '100%',
	},
	buttonView: {
		width: '100%',
		marginBottom: 40,
	},
});

const ChangePage = (): animationValue => {
	interface animationState {
		animation: Animated.Value;
		statusAnimation: LoadingStatus;
	}
	const [state, updateStatusAnimation] = useReducer(
		(state: animationState, value: LoadingStatus): animationState => {
			state.statusAnimation = value;
			return state;
		},
		{
			animation: new Animated.Value(0),
			statusAnimation: LoadingStatus.NOT_LOADING,
		},
	);

	const position = state.animation.interpolate({
		inputRange: [0, 1],
		outputRange: [124, -20],
	});
	const size = state.animation.interpolate({
		inputRange: [0, 1],
		outputRange: [1, 0.3],
	});
	const opacity = state.animation.interpolate({
		inputRange: [0, 1],
		outputRange: [1, 0],
	});
	const startAnimation = () =>
		Animated.timing(state.animation, {
			toValue: 1,
			duration: 600,
			useNativeDriver: false,
		}).start(() => {
			updateStatusAnimation(LoadingStatus.READY);
		});

	useEffect(() => {
		setTimeout(() => {
			if (state.statusAnimation == LoadingStatus.NOT_LOADING) {
				startAnimation();
			}
		}, 5000);
	}, [updateStatusAnimation]);

	return {
		position,
		size,
		show: state.animation,
		hide: opacity,
		startAnimation,
	};
};

const IntroApp: FC<IntroAppProps> = ({ onPress }: IntroAppProps) => {
	const { hide, show, position, size, startAnimation } = ChangePage();
	return (
		<Background
			style={styles.background}
			useNavigator={false}>
			<Animated.View
				style={[
					styles.logo,
					{
						position: 'absolute',
						top: position,
						transform: [{ scale: size }],
					},
				]}>
				<TreeLogo />
			</Animated.View>
			<View style={{ width: '100%', alignItems: 'center' }}>
				<Animated.View style={[styles.introView, { opacity: hide, bottom: 40 }]}>
					<Text style={[styles.textIntro, { fontSize: 28 }]}>{i18n.t('f5c18015-15f7-4d64-a05f-0fae8b64d1d8')}</Text>
				</Animated.View>
				<Animated.View style={[styles.introView, { opacity: show }]}>
					<Text style={[styles.textIntro, { fontSize: 24 }]}>{i18n.t('03d9d661-8143-4617-a330-ad14e9865493')}</Text>
					<Image
						source={require('~assets/image/PeoplePlantASeedlingOnThebackgroundOfAMarker.png')}
						style={[styleImage.imageFullWidth]}
					/>
				</Animated.View>
			</View>
			<Animated.View style={[styles.buttonView, { opacity: show }]}>
				<ColorButton
					onPress={() => onPress()}
					// style={styles.button}
					text={i18n.t('bf874cc6-3cad-41f8-ab99-6bdcc4fa43dc')}
				/>
			</Animated.View>
		</Background>
	);
};

export default IntroApp;
