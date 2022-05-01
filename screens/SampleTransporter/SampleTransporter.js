import React, { useState, useEffect, useRef } from 'react';
import {
	Text,
	View,
	StyleSheet,
	Button,
	Dimensions,
	Alert,
	ActivityIndicator,
	TextInput,
	TouchableHighlight,
	PermissionsAndroid,
	ToastAndroid,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { Overlay } from 'react-native-elements';
import BarcodeMask from 'react-native-barcode-mask';

import Constants from '../constants';
import SampleTracking from '../../controllers/sample_tracking';
import WinCustomAlert from '../WinCustomAlert';
import Util from '../Util';
import Spinner from '../Spinner';

export default function SampleCollector({ route, navigation }) {
	const [hasPermission, setHasPermission] = useState(null);
	const [scanned, setScanned] = useState(false);
	const [qrData, setQrData] = useState(undefined);
	const [reactiveQR, setReactiveQR] = useState(true);
	const [scanner, setScanner] = useState(null);
	const [showSuccessPopup, setShowSuccessPopup] = useState(false);
	const [showErrPopup, setShowErrPopup] = useState(false);
	const [serverMessage, setServerMessage] = useState('');
	const [labJsonResponse, setLabJsonResponse] = useState({});
	const [loading, setLoading] = useState(false);

	const requestCameraPermission = async () => {
		try {
			const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.CAMERA,
				{
					title: 'WinMobile App Camera Permission',
					message: 'WinMobile App needs access to your camera ',
					buttonPositive: 'OK',
				},
			);
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				setHasPermission(true);
			} else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
				//give some permisson message
			} else {
				setHasPermission(false);
			}
		} catch (err) {
			console.warn(err);
		}
	};

	useEffect(() => {
		requestCameraPermission();
	}, []);

	if (hasPermission === null) {
		return (
			<View style={styles.container}>
				<Text>Requesting for camera permission</Text>
			</View>
		);
	}

	if (hasPermission === false) {
		return (
			<View style={styles.container}>
				<Text style={{ margin: 10 }}>No access to camera</Text>
				<Button
					title={'Allow Camera'}
					onPress={() => requestCameraPermission()}
				/>
			</View>
		);
	}

	const alertUser = (title, message) => {
		Alert.alert(title, message, [
			{
				text: 'Ok',
				onPress: () => {
					setScanned(false);
					setReactiveQR(false);
					scanner.reactivate();
				},
			},
		]);
	};

	const updateStatusToInTransit = (sampleTracking, containerId) => {
		setLoading(true);
		sampleTracking.sampleInTransit(containerId, navigation).then(res => {
			setLoading(false);
			if (res.status === 200) {
				// alertUser(
				// 	"In Transit",
				// 	"Sample in container ID " + containerId + " marked in-transit"
				// )
				let message =
					'Sample in container ID ' +
					containerId +
					' marked in-transit';
				setServerMessage(message);
				setShowSuccessPopup(true);
				console.log(
					`${
						Constants.debugDesc.text
					} josn of samplelist sampleInTransit is =${JSON.stringify(
						res,
					)}`,
				);
			} else {
				setServerMessage(res.message);
				setShowErrPopup(true);
			}
		});
	};

	const updateStatusToAccepted = (sampleTracking, containerId) => {
		setLoading(true);
		sampleTracking
			.sampleAcceptedInLab(containerId, navigation)
			.then(res => {
				setLoading(false);
				if (res.status === 200) {
					// alertUser(
					// 	"Accepted in the lab",
					// 	"Sample in container ID " + containerId + " received in the lab"
					// )
					let message =
						'Sample in container ID ' +
						containerId +
						' received in the lab';
					setLabJsonResponse(res);
					setServerMessage(message);
					setShowSuccessPopup(true);
				} else {
					// alertUser(
					// 	"Issue with adding the sample",
					// 	res.message
					// )
					setServerMessage(res.message);
					setShowErrPopup(true);
				}
			})
			.catch(console.log);
	};

	const configureScan = () => {
		setScanned(false);
		setReactiveQR(false);
		setTimeout(function () {
			scanner.reactivate();
		}, 3000);
	};

	onSuccess = e => {
		console.log(`capture data=${e.data}`);
		setScanned(true);
		let qrCode = e.data.toUpperCase();
		setQrData(qrCode);
		setReactiveQR(false);

		if (Util.isValidQRScan(qrCode)) {
			let sampleTracking = new SampleTracking();
			if (route.name === Constants.screenName.SampleTransporter) {
				updateStatusToInTransit(sampleTracking, qrCode);
			} else if (route.name === Constants.screenName.SampleAcceptance) {
				updateStatusToAccepted(sampleTracking, qrCode);
			}
		} else {
			// setServerMessage(Constants.alertMessages.invalidQRCode)
			// setShowErrPopup(true);
			ToastAndroid.showWithGravity(
				Constants.alertMessages.invalidQRCode,
				ToastAndroid.SHORT,
				ToastAndroid.BOTTOM,
			);
			configureScan();
		}
	};

	// Return the View
	return (
		<View style={styles.container}>
			<View style={{ flex: 1, backgroundColor: 'black' }}>
				<QRCodeScanner
					reactivate={reactiveQR}
					onRead={scanned ? undefined : onSuccess}
					style={{
						height: '100%',
						width: Dimensions.get('window').width,
					}}
					ref={node => {
						setScanner(node);
					}}
				/>
				<BarcodeMask
					width={300}
					height={300}
					showAnimatedLine={false}
					outerMaskOpacity={0.9}
				/>
				{loading === true ? <ActivityIndicator size="large" /> : null}
			</View>

			<WinCustomAlert
				displayMode={'success'}
				displayMsg={serverMessage}
				visibility={showSuccessPopup}
				dismissAlert={setShowSuccessPopup}
				onPressHandler={() => configureScan()}
				calculatedHeight={
					route.name === Constants.screenName.SampleAcceptance
						? 360
						: 200
				}
				labResponse={labJsonResponse}
			/>
			<WinCustomAlert
				displayMode={'failed'}
				displayMsg={serverMessage}
				visibility={showErrPopup}
				dismissAlert={setShowErrPopup}
				onPressHandler={() => configureScan()}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	maintext: {
		fontSize: 16,
		margin: 20,
		zIndex: 4,
	},
	barcodebox: {
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'hidden',
	},
	againbutton: {
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: 3,
		marginTop: -300,
		paddingBottom: 0,
	},
});
