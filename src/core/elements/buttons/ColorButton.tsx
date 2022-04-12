import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import Icon, { IconName } from '~elements/icons';

import type { FC } from 'react';
import type { TextStyle, ViewStyle } from 'react-native';

interface StyleOptionsButton {
	fullwidth?: boolean;
	icon?: IconName;
}

interface ButtonProps {
	text: string;
	style?: TextStyle & ViewStyle;
	styleOptions?: StyleOptionsButton;
	onPress: Function;
}

const styles = StyleSheet.create({
	background: {
		width: '100%',
		backgroundColor: '#EFEFEF',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		height: 45,
		borderRadius: 10,
	},
	text: {
		color: '#4C4C4C',
		fontWeight: '500',
		fontSize: 16,
		fontStyle: 'normal',
		fontFamily: Platform.OS == 'android' ? 'Roboto-Medium' : 'System',
	},
});

const ColorButton: FC<ButtonProps> = ({ text, style, styleOptions, onPress }: ButtonProps) => {
	return (
		<TouchableOpacity
			style={StyleSheet.flatten([styles.background, style])}
			onPress={() => onPress()}>
			{styleOptions?.icon ? (
				<Icon
					name={styleOptions.icon}
					style={{ marginRight: 10 }}
				/>
			) : null}
			<Text
				style={StyleSheet.flatten([
					styles.text,
					style,
					{ width: 'auto', backgroundColor: 'transparent', borderWidth: 0 },
				])}>
				{text}
			</Text>
		</TouchableOpacity>
	);
};

export default ColorButton;
