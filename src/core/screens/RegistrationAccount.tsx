import React, { useReducer, useEffect, useRef, useMemo } from 'react';
import { StyleSheet, Text, FlatList } from 'react-native';
import { BackLeaves as Background } from '~elements/background';
import { ColorButton } from '~elements/buttons';
import i18n from '~i18n';
import NickNameInput from '~components/NickNameInput';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC, ElementRef } from 'react';
import { HeaderBackButton } from '~constant';
import gStyle from '~globalStyle';
import VariantsNickNamePart from '~assets/VariantsNickNamePart.json';
type propsScreen = NativeStackScreenProps<MainStack, 'RegistrationAccount'>;

const styles = StyleSheet.create({
	background: {
		paddingHorizontal: 30,
		justifyContent: 'flex-start',
	},
	colorButton: { backgroundColor: '#EFEFEF' },
});

enum PartRegistrationAccount {
	NICK_NAME_INPUT,
}

interface RegistrationAccountState {
	partRegistrationAccount: PartRegistrationAccount;
	nickName: string;
	errorName: string;
}

const initState: RegistrationAccountState = {
	partRegistrationAccount: PartRegistrationAccount.NICK_NAME_INPUT,
	nickName: '',
	errorName: '[NickName empty]',
};

type RegistrationAccountAction =
	| { type: 'inputNickName'; payload: string }
	| {
			type: 'inputNickNameError';
			payload: { nickName: string; errorName: string };
	  };

function RegistrationAccountReducer(
	state: RegistrationAccountState,
	{ type, payload }: RegistrationAccountAction,
): RegistrationAccountState {
	switch (type) {
		case 'inputNickName':
			state.nickName = payload;
			break;
		case 'inputNickNameError':
			state.nickName = payload.nickName;
			state.errorName = payload.errorName;
			break;
	}
	return { ...state };
}

const RegistrationAccount: FC<propsScreen> = ({ navigation, route }) => {
	const [state, dispatch] = useReducer(RegistrationAccountReducer, initState);
	const NickNameRef = useRef<ElementRef<typeof NickNameInput>>();
	useEffect(() => {
		if (state.partRegistrationAccount == PartRegistrationAccount.NICK_NAME_INPUT) {
			navigation.setOptions({ title: i18n.t('8a8ab857-93cc-4a86-9be2-aa70cc4040c5') });
		}
	}, [state.partRegistrationAccount]);
	const possibleNickName = useMemo(() => {
		const possibleNickNameArray: Array<string> = [];
		if (state.errorName == '[NickName no Unique]') {
			let i = 0;
			while (i < 5) {
				const lib =
					Object.values(VariantsNickNamePart)[
						Math.floor(Math.random() * (Object.keys(VariantsNickNamePart).length - 1))
					];
				const word = lib[Math.floor(Math.random() * lib.length)];
				possibleNickNameArray.push(
					Math.round(Math.random()) == 0 ? `${word}_${state.nickName}` : `${state.nickName}_${word}`,
				);

				i++;
			}
		}
		return possibleNickNameArray;
	}, [state.errorName]);
	return (
		<Background
			typeHeaderBackButton={HeaderBackButton.NONE}
			style={styles.background}>
			<NickNameInput
				onChangeNickName={(nickName, permission, message) => {
					console.log(nickName, permission, message);
					if (permission) {
						dispatch({ type: 'inputNickName', payload: nickName });
					} else {
						dispatch({
							type: 'inputNickNameError',
							payload: { nickName: nickName, errorName: message ?? '[NickName empty]' },
						});
					}
				}}
				style={[gStyle.transparentInputWithBorder, { marginBottom: 8 }]}
			/>
			{possibleNickName.length == 0 ? null : (
				<FlatList
					data={possibleNickName}
					renderItem={() => null}
				/>
			)}
			<ColorButton
				text={i18n.t('continue')}
				onPress={console.log}
				style={styles.colorButton}
			/>
			<Text style={gStyle.hrefLink}>{i18n.t('dc242d9b-76dc-4c61-8261-84e1a7db0c53')}</Text>
		</Background>
	);
};

export default RegistrationAccount;
