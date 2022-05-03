import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Constants from '../constants';
import I18n from '../../i18n/i18n';

export default function ChooseLocale({ navigation, route }) {
	const { setLocaleFunc } = route.params;

	const availableLocale = [
		{
			name: 'English',
			code: 'en',
		},
		{
			name: 'ગુજરાતી',
			code: 'gj',
		},
		{
			name: 'தமிழ்',
			code: 'tm',
		},
		{
			name: 'অসমীয়া',
			code: 'as',
		},
		{
			name: 'ಕನ್ನಡ',
			code: 'ka',
		},
		{
			name: 'हिन्दी',
			code: 'hi',
		},
	];

	const renderLocaleList = () => {
		let res = [];
		availableLocale.forEach((l, idx) => {
			res.push(
				<TouchableOpacity
					key={idx}
					style={styles.button}
					onPress={() => {
						I18n.setLocale(l.code);
						setLocaleFunc(l.code);
						console.log('Setting: ' + l.code);
						navigation.goBack();
					}}>
					<Text style={styles.buttonText}>{l.name}</Text>
				</TouchableOpacity>,
			);
		});
		return res;
	};

	return (
		<View style={styles.container}>
			<Text style={styles.header}>Choose a Language</Text>
			{renderLocaleList()}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 27,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		fontFamily: 'Quicksand',
	},
	header: {
		fontSize: 30,
		paddingVertical: 20,
		color: Constants.colors.primaryDark,
	},
	button: {
		backgroundColor: Constants.colors.primaryDark,
		marginVertical: 6,
		borderRadius: 7,
		width: '50%',
	},
	buttonText: {
		color: '#fff',
		fontSize: 20,
		textAlign: 'center',
		padding: 10,
	},
});
