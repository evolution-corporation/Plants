import React, { useContext } from 'react';
import { View, StyleSheet, Text, Dimensions, Platform } from 'react-native';
import Swiper from 'react-native-swiper';
import { ParkCity as Background } from '~elements/background';
import { ColorButton, TextHref } from '~elements/buttons';
import i18n from '~i18n';
import Logo from '~assets/logo/TreeLogo_White_Medium.svg';
import { AuthType } from '~models/type';
import { IconName } from '~icons';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import AccountContext from '~models/account';
import type { FC } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type propsScreen = NativeStackScreenProps<AuthorizationStack, 'InSignSelectMethod'>;

GoogleSignin.configure({
	webClientId: '878799007977-cj3549ni87jre2rmg4eq0hiolp08igh2.apps.googleusercontent.com',
});

const styles = StyleSheet.create({
	background: {
		alignItems: 'center',
		justifyContent: 'space-between',
		flex: 1,
	},
	backgroundLogoAndCarousel: {
		flex: 4,
		paddingBottom: 0,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
	backgroundSelectInSign: {
		flex: 1,
		paddingBottom: 49,
		width: '100%',
		paddingHorizontal: 30,
	},
	carouselText: {
		fontStyle: 'normal',
		fontWeight: 'bold',
		fontSize: 20,
		textAlign: 'center',
		color: '#FFFFFF',
		fontFamily: Platform.OS == 'android' ? 'Roboto-Bold' : 'System',
	},
	signInBottom: {
		marginVertical: 10,
		backgroundColor: '#EFEFEF',
	},
	textHref: {
		color: '#FFFFFF',
		fontSize: 13,
		fontWeight: '500',
		marginTop: 22,
	},
	swiper: {
		width: Dimensions.get('window').width,
		height: 100,
	},
});

const ChoosingTheLoginMethod: FC<propsScreen> = ({ navigation }: propsScreen) => {
	const AccountAuthorizationState = useContext(AccountContext);

	const googleSignIn = async () => {
		const { idToken } = await GoogleSignin.signIn();
		if (idToken) {
			AccountAuthorizationState.Auth({ type: AuthType.GOOGLE, googleId: idToken });
		}
	};
	const phoneSignIn = () => {
		navigation.navigate('InSignWithPhone');
	};

	return (
		<Background style={styles.background}>
			<View style={styles.backgroundLogoAndCarousel}>
				<Logo />
				<View style={{ height: 120, paddingTop: 15 }}>
					<Swiper
						horizontal={true}
						loop={true}
						autoplay={true}
						autoplayTimeout={5}
						width={styles.swiper.width}
						dotColor={'#FFFFFF'}
						activeDotColor={'#577334'}>
						<Text style={styles.carouselText}>{i18n.t('8dd3819b-83e6-4cd6-930e-194758735bd9')}</Text>
						<Text style={styles.carouselText}>{i18n.t('8ef09926-fc2e-4435-9dd6-b7d89ae57212')}</Text>
						<Text style={styles.carouselText}>{i18n.t('5cfd5328-1c66-4c01-ac03-d6f7d32bd9ac')}</Text>
						<Text style={styles.carouselText}>{i18n.t('bdd0bace-e2a6-4212-96f3-0f54e754e366')}</Text>
					</Swiper>
				</View>
			</View>
			<View style={styles.backgroundSelectInSign}>
				<ColorButton
					style={{
						backgroundColor: 'rgba(255, 255, 255, 0.2)',
						color: '#FFFFFF',
						borderColor: '#FFFFFF',
						borderWidth: 1,
					}}
					onPress={() => googleSignIn()}
					styleOptions={{ icon: IconName.GOOGLE }}
					text={i18n.t('e1c98b9a-ac6d-4355-96c5-190f770257d2')}
				/>
				<ColorButton
					text={i18n.t('32c66492-e9c6-4cf6-a3f1-fd6003e8e2df')}
					style={{ marginVertical: 10 }}
					onPress={() => phoneSignIn()}
				/>
				<TextHref
					style={styles.textHref}
					text={i18n.t('af79d9f6-539c-410a-ab73-fbad37dde206')}
					onPress={() => phoneSignIn()}
				/>
			</View>
		</Background>
	);
};

export default ChoosingTheLoginMethod;
