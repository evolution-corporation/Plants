import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle, memo } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import validator from 'validator';
import type { ViewProps, ViewStyle, TextStyle } from 'react-native';
import type { FC, RefObject, Ref } from 'react';

interface SMSCodeInputProps extends ViewProps {
	onEndInput: { (SMSCode: string): void };
	styleTextInput?: (ViewStyle & TextStyle) | Array<ViewStyle & TextStyle>;
	ref?: any;
}

interface TextInputListParams {
	index: Array<number>;
	ref: Array<RefObject<TextInput>>;
}

interface SMSCodeInputRef {
	clear: { (): void };
}

const styles = StyleSheet.create({
	background: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
	},
});

const countTextInput: Array<number> = [0, 1, 2, 3, 4, 5];
const lastIndex: number = countTextInput[countTextInput.length - 1];

const SMSCodeInput = forwardRef<SMSCodeInputRef, SMSCodeInputProps>((props, selfRef) => {
	const { style, onEndInput, styleTextInput } = props;
	const [code, setCode] = useState<string>('');
	const [inputFocusNumber, setInputFocusNumber] = useState<number>(0);
	const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
	useImperativeHandle(
		selfRef,
		(): SMSCodeInputRef => ({
			clear: () => clear(),
		}),
	);
	const TextInputListParams: TextInputListParams = {
		index: [...countTextInput],
		ref: countTextInput.map(() => useRef<TextInput>(null)),
	};
	const clear = (): void => {
		setCode('');
		setInputFocusNumber(0);
		if (timer) clearTimeout(timer);
		setTimer(null);
		TextInputListParams.ref.forEach((ref) => ref.current?.clear());
	};

	const addPartCode = (partCode: string): void => {
		if (validator.isInt(partCode)) {
			setCode(code + partCode);
			if (inputFocusNumber != lastIndex) {
				setInputFocusNumber(inputFocusNumber + 1);
			}
		} else {
			console.log(partCode);
			TextInputListParams.ref[inputFocusNumber].current?.clear();
		}
	};

	const deletePartCode = (): void => {
		if (inputFocusNumber > 0 && inputFocusNumber < lastIndex) {
			setCode(code.slice(0, code.length - 1));
			TextInputListParams.ref[inputFocusNumber - 1].current?.clear();
			setInputFocusNumber(inputFocusNumber - 1);
		}
		if (inputFocusNumber == lastIndex) {
			if (code.length != lastIndex + 1) {
				TextInputListParams.ref[inputFocusNumber - 1].current?.clear();
				setInputFocusNumber(inputFocusNumber - 1);
			} else {
				TextInputListParams.ref[inputFocusNumber].current?.clear();
			}
			setCode(code.slice(0, code.length - 1));
		}
	};

	useEffect(() => {
		if (code.length == countTextInput.length) {
			if (timer) clearTimeout(timer);
			setTimer(setTimeout(() => onEndInput(code), 1000));
		} else {
			if (timer) {
				clearTimeout(timer);
				setTimer(null);
			}
			TextInputListParams.ref[code.length].current?.focus();
		}
	}, [code.length]);

	return (
		<View style={[styles.background, style]}>
			{countTextInput.map((item) => (
				<TextInput
					allowFontScaling={false}
					autoCorrect={false}
					caretHidden={true}
					contextMenuHidden={true}
					returnKeyType={'next'}
					key={item.toString()}
					style={styleTextInput}
					ref={TextInputListParams.ref[item]}
					maxLength={1}
					keyboardType={'numeric'}
					onFocus={() => {
						if (item != inputFocusNumber) {
							TextInputListParams.ref[inputFocusNumber].current?.focus();
						}
					}}
					onChangeText={(partCode) => {
						if (!validator.isEmpty(partCode)) {
							addPartCode(partCode);
						}
					}}
					onKeyPress={({ nativeEvent: { key } }) => {
						if (key == 'Backspace') {
							deletePartCode();
						}
					}}
					onSubmitEditing={() => {
						if (code.length == countTextInput.length) {
							if (timer) {
								clearTimeout(timer);
								setTimer(null);
							}
							onEndInput(code);
						}
					}}
					onBlur={() => {
						if (item != lastIndex) {
							TextInputListParams.ref[inputFocusNumber].current?.focus();
						}
					}}
				/>
			))}
		</View>
	);
});

SMSCodeInput.displayName = 'SMSCodeInput';

export default memo(SMSCodeInput);
