import React, { useState, useEffect, useCallback } from 'react';
import { TextInput } from 'react-native';

import i18n from '~i18n';

import type { FC } from 'react';
import type { TextInputProps } from 'react-native';

interface PhoneInputProps extends TextInputProps {
	initPhone?: string;
	initRegion?: string;
	onEditPermission: { ({ permission, phoneNumber }: { permission: boolean; phoneNumber?: string }): void };
}

const PhoneInput: FC<PhoneInputProps> = (props: PhoneInputProps) => {
	// const { onEditPermission, initRegion = i18n.region, initPhone } = props;
	// const [phoneNumber, setPhoneNumber] = useState<string>(`+${PhoneNumber.getCountryCodeForRegionCode(initRegion)}`);
	// const [region, setRegion] = useState<string>(initRegion);
	// const [phone, setPhone] = useState<any>(PhoneNumber.getAsYouType(initRegion))
	// // const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

	// const inputPhone = useCallback((text: string) => {
	// 	if (region != 'ZZ') {
	// 		phone.
	// 	}
	// }, [region]);

	// const inputPhone = (phoneText: string): void => {
	// 	setPhoneNumber(phoneText);
	// if (timer) clearTimeout(timer);
	// setTimer(
	// 	setTimeout(() => {
	// const _phoneNumber = new PhoneNumber(phoneText[0] == '+' ? phoneText : `+${phoneText}`);
	// const rfc3966 = _phoneNumber.getNumber('rfc3966');
	// if (_phoneNumber.isValid()) {
	// 	setPhoneNumber(rfc3966.replace('-', '(').replace('-', ')').replace('tel:', ''));
	// 	onEditPermission({ permission: true, phoneNumber: _phoneNumber.getNumber('e164') });
	// } else {
	// 	onEditPermission({ permission: false });
	// }
	// 	}, 500),
	// );
	//};

	// useEffect(() => {
	// 	if (initPhone) {
	// 		inputPhone(initPhone);
	// 	}
	// }, [setPhoneNumber]);

	return (
		<TextInput
			allowFontScaling={false}
			// onChangeText={(text) => inputPhone(text)}
			// value={phoneNumber}
			keyboardType='phone-pad'
			maxLength={20}
			placeholder='+x xxx xxx xxx xxx'
			{...props}
		/>
	);
};

export default PhoneInput;
