import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	Image,
	TouchableHighlight,
	ToastAndroid,
	ActivityIndicator,
} from 'react-native';

import WinLogoColor from '../../assets/win_logo_color.png';
import Authentication from '../../controllers/authentication';
import Constants from '../constants';
import Util from '../Util';
import DBManager from '../DBManager';

export default function Login({ navigation }) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		console.log('useeffect login called');
		//isValidSession();
	}, []);

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			padding: 20,
			backgroundColor: '#fff',
			alignItems: 'center',
			justifyContent: 'center',
		},
		winLogo: {
			width: 300,
			height: 200,
		},
		inputBox: {
			width: '100%',
			padding: 10,
			backgroundColor: '#E6E8ED',
			margin: 10,
			color: Constants.colors.grayColor,
		},
		button: {
			width: '100%',
			alignItems: 'center',
			backgroundColor: '#756BDE',
			padding: 10,
		},
		buttonText: {
			fontSize: 17,
			fontWeight: 'bold',
			color: '#fff',
		},
		signinMessage: {
			fontSize: 20,
			fontWeight: 'bold',
			marginTop: 20,
			marginBottom: 8,
			fontFamily: 'Quicksand',
			color: '#756BDE',
		},
	});

	const handleLogin = () => {
		var auth = new Authentication();
		//reset token and all
		setLoading(true);
		auth.login(username, password).then(res => {
			if (res) {
				console.log(
					`${Constants.debugDesc.text} response=${res.roles}`,
				);
				var array = res.roles;
				ToastAndroid.showWithGravity(
					'Login Successful',
					ToastAndroid.SHORT,
					ToastAndroid.BOTTOM,
				);
				// navigation.navigate('Home', res.roles)
				navigation.replace('Home', {
					roles: res.roles,
				});
				setLoading(false);
			} else {
				ToastAndroid.show(
					'Could not login. Please check your username and password',
					ToastAndroid.LONG,
				);
				setLoading(false);
			}
		});
	};

	const isValidSession = () => {
		let isValid = DBManager.isValidSession(navigation);
		console.log(` is session valid=${isValid}`);
	};
	isValidSession();

	return (
		<View style={styles.container}>
			<Image source={WinLogoColor} style={styles.winLogo} />
			<Text
				style={{
					textAlign: 'center',
					fontFamily: 'Quicksand',
					marginTop: 10,
					marginBottom: 10,
					color: Constants.colors.grayColor,
				}}>
				An initiative to manage the spread and impact of SARS-CoV-2
				through Wastewater-based Epidemiology (WBE)
			</Text>

			<Text style={styles.signinMessage}>SIGN IN TO YOUR ACCOUNT</Text>
			<TextInput
				style={styles.inputBox}
				width="100%"
				placeholder="Username"
				onChangeText={setUsername}
				selectionColor="#756BDE"
				autoCapitalize="none"
				placeholderTextColor={Constants.colors.grayColor}
			/>
			<TextInput
				style={styles.inputBox}
				width="100%"
				placeholder="Password"
				onChangeText={setPassword}
				selectionColor="#756BDE"
				autoCapitalize="none"
				secureTextEntry={true}
				placeholderTextColor={Constants.colors.grayColor}
			/>
			{loading === false ? (
				<TouchableHighlight
					style={styles.button}
					underlayColor={Constants.colors.primaryDark}
					onPress={handleLogin}>
					<Text style={styles.buttonText}>LOGIN</Text>
				</TouchableHighlight>
			) : (
				<ActivityIndicator size="small" />
			)}
		</View>
	);
}
