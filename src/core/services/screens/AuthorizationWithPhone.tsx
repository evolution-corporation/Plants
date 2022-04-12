import React, { useState, useMemo, Fragment, useRef, ElementRef, useCallback } from 'react';
import { StyleSheet, ToastAndroid, Platform } from 'react-native';
import { SMSCodeInput } from '~components';
import { ColorButton } from '~elements/buttons';
import PhoneInput from 'react-phone-number-input/react-native-input';
import { BackLeaves as Background } from '~elements/background';
import i18n from '~i18n';
import { HeaderBackButton } from '~constant';
import { Auth } from '~models/account';
import gStyle from '~globalStyle';
import { AuthType } from '~models/type';
import type { FC } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { PhoneAuth } from '~models/account';

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
}

const AuthorizationWithPhone: FC<propsScreen> = ({}: propsScreen) => {
	const [phone, setPhone] = useState<string>('');
	const [permission, setPermission] = useState<boolean>(false);
	const [partAuthorizationWithPhone, setPartAuthorizationWithPhone] = useState<PartAuthorizationWithPhone>(
		PartAuthorizationWithPhone.INPUT_PHONE_NUMBER,
	);
	const [confirm, setConfirm] = useState<PhoneAuth>();
	const SMSCodeInputRef = useRef<ElementRef<typeof SMSCodeInput>>(null);

	const requestSMS = useCallback(() => {
		console.log(permission);
		if (permission) {
			console.log('test');
		} else {
			if (Platform.OS == 'android') {
				console.log('error');
				ToastAndroid.show(i18n.t('ea09983a-d497-4227-a6fa-f9924f266c45'), ToastAndroid.BOTTOM);
			}
		}
	}, [permission]);

	// const inputPart = useMemo(() => {
	// 	console.log(1);
	// 	if (partAuthorizationWithPhone == PartAuthorizationWithPhone.INPUT_PHONE_NUMBER) {
	// 		return (
	// 			<Fragment>
	// 				<PhoneInput
	// 					onChange={(value) => {}}
	// 					defaultCountry={'RU'}
	// 					value={phone}
	// 					style={[gStyle.transparentInputWithBorder, styles.phone]}
	// 				/>
	// 				<ColorButton
	// 					text={i18n.t('continue')}
	// 					style={styles.colorButton}
	// 					onPress={() => requestSMS()}
	// 				/>
	// 			</Fragment>
	// 		);
	// 	} else {
	// 		return (
	// 			<SMSCodeInput
	// 				onEndInput={(code) => {
	// 					try {
	// 						if (confirm) confirm(code);
	// 					} catch (error) {
	// 						SMSCodeInputRef.current?.clear();
	// 					}
	// 					// setTimeout(SMSCodeInputRef.current?.clear, 2000);
	// 				}}
	// 				style={styles.SMSCodeInput}
	// 				// styleTextInput={[gStyle.transparentInputSmall, { marginHorizontal: 3 }]}
	// 				ref={SMSCodeInputRef}
	// 			/>
	// 		);
	// 	}
	// }, [partAuthorizationWithPhone]);
	return (
		<Background
			style={[
				styles.background,
				{
					justifyContent:
						partAuthorizationWithPhone == PartAuthorizationWithPhone.INPUT_PHONE_NUMBER ? 'flex-start' : 'center',
				},
			]}
			typeHeaderBackButton={HeaderBackButton.ARROW}>
			<PhoneInput
				onChange={(value) => {}}
				defaultCountry={'RU'}
				value={phone}
				style={[gStyle.transparentInputWithBorder, styles.phone]}
			/>
			<ColorButton
				text={i18n.t('continue')}
				style={styles.colorButton}
				onPress={() => requestSMS()}
			/>
		</Background>
	);
};

export default AuthorizationWithPhone;
