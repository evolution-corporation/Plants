import { StyleSheet, Dimensions, Platform } from 'react-native';

export default StyleSheet.create({
	h1: {
		color: '#FFFFFF',
		fontStyle: 'normal',
		fontWeight: '700',
		fontFamily: Platform.OS == 'android' ? 'Roboto-Bold' : 'System', //'Gilroy',
		textAlign: 'center',
		// marginBottom: 30,
		fontSize: 24,
	},
	hrefLink: {
		color: 'rgba(239, 239, 239, 0.75)',
		fontStyle: 'normal',
		fontWeight: '600',
		fontFamily: Platform.OS == 'android' ? 'Roboto-Medium' : 'System',
		textAlign: 'center',
		fontSize: 11,
	},
	transparentInputWithBorder: {
		color: '#FFFFFF',
		fontFamily: Platform.OS == 'android' ? 'Roboto-Medium' : 'System',
		fontSize: 14,
		width: '100%',
		padding: 14,
		borderRadius: 10,
		borderColor: '#CBE1A8',
		borderWidth: 1,
		borderStyle: 'solid',
		backgroundColor: 'rgba(240, 242, 238, 0.19)',
		height: 45,
	},
	transparentInputSmall: {
		color: '#FFFFFF',
		fontFamily: Platform.OS == 'android' ? 'Roboto-Medium' : 'System',
		fontSize: 30,
		width: 29,
		padding: 0,
		borderRadius: 4,
		backgroundColor: 'rgba(255, 255, 255, 0.43)',
		height: 37,
		textAlign: 'center',
		textAlignVertical: 'center',
	},
});

export const styleImage = StyleSheet.create({
	imageFullWidth: {
		width: '100%',
		resizeMode: 'contain',
	},
});
