import React, { useRef, useReducer, useEffect, useContext } from 'react';
import { StyleSheet, Text, ActivityIndicator, TextInput, Alert } from 'react-native';
import { SMSCodeInput } from '~components';
import { ColorButton, TextHref } from '~elements/buttons';
// import PhoneInput from 'react-phone-number-input/react-native-input';
import { isPossiblePhoneNumber } from 'react-phone-number-input';
import { BackLeaves as Background } from '~elements/background';
import i18n from '~i18n';
import { HeaderBackButton } from '~constant';
import gStyle from '~globalStyle';
import type { FC, ElementRef } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import AccountContext from '~models/account';
import type { PhoneAuth } from '~models/account';
import { AuthType } from '~models/type';

type propsScreen = NativeStackScreenProps<AuthorizationStack, 'InSignWithPhone'>;

const styles = StyleSheet.create({
	background: {
		paddingHorizontal: 30,
		flex: 1,
	},
	phone: {
		width: '100%',
		marginVertical: 17,
	},
	colorButton: {
		backgroundColor: '#EFEFEF',
		width: '100%',
	},
	SMSCodeInput: {
		width: 'auto',
		alignSelf: 'center',
	},
});

enum PartAuthorizationWithPhone {
	INPUT_PHONE_NUMBER,
	INPUT_SMS_CODE,
	LOADING,
}

interface stateAuthorizationWithPhone {
	phone: string;
	partAuthorizationWithPhone: PartAuthorizationWithPhone;
	confirm?: PhoneAuth;
}

type actionsAuthorizationWithPhone =
	| { type: 'inputPhone'; payload: string }
	| { type: 'setLoading'; payload?: any }
	| { type: 'setConfirm'; payload: PhoneAuth }
	| { type: 'showPart'; payload: PartAuthorizationWithPhone };

function reducerAuthorizationWithPhone(
	state: stateAuthorizationWithPhone,
	{ type, payload }: actionsAuthorizationWithPhone,
): stateAuthorizationWithPhone {
	switch (type) {
		case 'inputPhone':
			state.phone = payload;
			break;
		case 'setLoading':
			state.partAuthorizationWithPhone = PartAuthorizationWithPhone.LOADING;
			break;
		case 'setConfirm':
			state.confirm = payload;
			state.partAuthorizationWithPhone = PartAuthorizationWithPhone.INPUT_SMS_CODE;
			break;
		case 'showPart':
			state.partAuthorizationWithPhone = payload;
			break;
	}
	return { ...state };
}
const initState: stateAuthorizationWithPhone = {
	phone: '',
	partAuthorizationWithPhone: PartAuthorizationWithPhone.INPUT_PHONE_NUMBER,
};

const AuthorizationWithPhone: FC<propsScreen> = ({ navigation }: propsScreen) => {
	const [state, dispatch] = useReducer(reducerAuthorizationWithPhone, initState);
	const SMSCodeInputRef = useRef<ElementRef<typeof SMSCodeInput>>(null);
	const AccountAuthorizationState = useContext(AccountContext);

	const requestSMS = async () => {
		dispatch({ type: 'setLoading' });
		if (isPossiblePhoneNumber(state.phone)) {
			const confirm = await AccountAuthorizationState.Auth({ type: AuthType.PHONE, phone: state.phone });
			if (confirm) {
				dispatch({ type: 'setConfirm', payload: confirm });
			}
		} else {
			Alert.alert(i18n.t('ea09983a-d497-4227-a6fa-f9924f266c45'));
		}
	};
	const checkCode = async (code: string) => {
		try {
			dispatch({ type: 'setLoading' });
			if (state.confirm) {
				await state.confirm(code);
			}
		} catch (error) {
			console.log(error);
			if (error instanceof Error) {
				if (error.message.includes('auth/invalid-verification-code')) {
					dispatch({ type: 'showPart', payload: PartAuthorizationWithPhone.INPUT_SMS_CODE });
					Alert.alert(i18n.t('a58236e5-ff9b-4436-b991-8bcb03c31bc4'), i18n.t('cf20216d-281c-47a5-88d7-9f20ca557039'), [
						{ text: i18n.t('continue') },
					]);
					SMSCodeInputRef.current?.clear();
				}
			}
		}
		// setTimeout(SMSCodeInputRef.current?.clear, 2000);
	};
	useEffect(() => {
		navigation.setOptions({
			title:
				state.partAuthorizationWithPhone == PartAuthorizationWithPhone.INPUT_PHONE_NUMBER
					? i18n.t('cb8302c3-2ae6-4b4c-bc4f-511a0827fec3')
					: '',
		});
	}, [state.partAuthorizationWithPhone]);

	switch (state.partAuthorizationWithPhone) {
		case PartAuthorizationWithPhone.INPUT_PHONE_NUMBER:
			return (
				<Background
					style={[
						styles.background,
						{
							justifyContent: 'flex-start',
						},
					]}
					typeHeaderBackButton={HeaderBackButton.ARROW}
					goBackFunction={() => navigation.goBack()}>
					<TextInput
						onChangeText={(value) => {
							dispatch({ type: 'inputPhone', payload: value });
						}}
						value={state.phone}
						style={[gStyle.transparentInputWithBorder, styles.phone]}
					/>
					<ColorButton
						text={i18n.t('continue')}
						style={styles.colorButton}
						onPress={() => requestSMS()}
					/>
				</Background>
			);
		case PartAuthorizationWithPhone.INPUT_SMS_CODE:
			return (
				<Background
					style={[
						styles.background,
						{
							justifyContent: 'center',
						},
					]}
					typeHeaderBackButton={HeaderBackButton.ARROW}
					goBackFunction={() => dispatch({ type: 'showPart', payload: PartAuthorizationWithPhone.INPUT_PHONE_NUMBER })}>
					<Text style={[gStyle.h1, { marginBottom: 11 }]}>{i18n.t('confirmation')}</Text>
					<SMSCodeInput
						onEndInput={(code) => checkCode(code)}
						style={styles.SMSCodeInput}
						styleTextInput={[gStyle.transparentInputSmall, { marginHorizontal: 3 }]}
						ref={SMSCodeInputRef}
					/>
					<TextHref
						text={i18n.t('9196b9c2-74b5-4fb8-8c3f-8745f3dfcc72')}
						onPress={requestSMS}
						style={gStyle.hrefLink}
					/>
				</Background>
			);
		case PartAuthorizationWithPhone.LOADING:
			return (
				<Background
					style={[
						styles.background,
						{
							justifyContent: 'center',
						},
					]}
					typeHeaderBackButton={HeaderBackButton.NONE}>
					<ActivityIndicator
						color={'#FFFFFF'}
						size={'large'}
					/>
				</Background>
			);
	}
};

export default AuthorizationWithPhone;
