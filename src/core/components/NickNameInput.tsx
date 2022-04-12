import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { TextInput, View, ActivityIndicator, Pressable } from 'react-native';
import validator from 'validator';
import User from '~models/user';
import CheckWhite from '~assets/svg/Check_White.svg';
import CheckCross from '~assets/svg/Cross_White.svg';

import type { FC } from 'react';
import type { TextInputProps, ViewStyle, ColorValue } from 'react-native';

interface NickNameInputProps extends TextInputProps {
	onChangeNickName: { (nickName: string, permission: boolean, message?: string): void };
	styleContainer?: ViewStyle;
	colorIndicator?: ColorValue;
}

interface NickNameInputRef {
	setNickName: { (nickName: string): void };
}

export enum StatusCheckNickName {
	LOADING,
	ERROR,
	OK,
	NULL,
}

const NickNameInput = forwardRef<NickNameInputRef, NickNameInputProps>((props, selfRef) => {
	const { onChangeNickName, style = {}, styleContainer, colorIndicator = '#FFFFFF' } = props;

	const [nickName, setNickName] = useState<string>('');
	const [status, setStatus] = useState<StatusCheckNickName>(StatusCheckNickName.NULL);
	const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
	useImperativeHandle(
		selfRef,
		(): NickNameInputRef => ({
			setNickName: inputNickName,
		}),
	);
	const inputNickName = (nickName: string) => {
		setNickName(nickName);
		if (timer) clearTimeout(timer);
		setTimer(
			setTimeout(
				async (nickName) => {
					try {
						if (validator.isEmpty(nickName)) throw new Error('[NickName empty]');
						if (
							!/^_?[a-z0-9]+_?[a-z0-9]+.?[a-z0-9]+_?[a-z0-9]+_?$/.test(nickName) &&
							nickName.length >= 8 &&
							nickName.length <= 32
						)
							throw new Error('[NickName no Validate]');
						if (await User.checknUniqueNickName(nickName)) throw new Error('[NickName no Unique]');
						onChangeNickName(nickName, true);
						setStatus(StatusCheckNickName.OK);
					} catch (error) {
						if (error instanceof Error) {
							if (error.message == '[NickName no Validate]' || error.message == '[NickName no Unique]')
								setStatus(StatusCheckNickName.ERROR);
							onChangeNickName(nickName, false, error.message);
						}
					}
				},
				500,
				nickName,
			),
		);
	};
	return (
		<View style={[styleContainer, { flexDirection: 'row' }]}>
			<TextInput
				style={style}
				onChangeText={inputNickName}
				value={nickName}
			/>
			<Pressable
				onPress={status == StatusCheckNickName.ERROR ? () => inputNickName('') : null}
				style={{ position: 'absolute', right: 16, alignSelf: 'center' }}>
				{status == StatusCheckNickName.NULL ? null : status == StatusCheckNickName.ERROR ? (
					<CheckCross />
				) : status == StatusCheckNickName.OK ? (
					<CheckWhite />
				) : (
					<ActivityIndicator
						color={colorIndicator}
						size={'small'}
					/>
				)}
			</Pressable>
		</View>
	);
});
NickNameInput.displayName = 'NickNameInput';

export default NickNameInput;
