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
	ToastAndroid,
	PermissionsAndroid,
	TouchableOpacity,
	AppState,
	ScrollView,
} from 'react-native';

//Location and bar code scnner package will come here
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { Overlay } from 'react-native-elements';
import { captureScreen } from 'react-native-view-shot';
import Geolocation from '@react-native-community/geolocation';
import Constants from '../constants';
import WinCustomAlert from '../WinCustomAlert';
import SampleTracking from '../../controllers/sample_tracking';
import BarcodeMask from 'react-native-barcode-mask';
import DBManager from '../DBManager';
import Util from '../Util';
import Spinner from '../Spinner';
import WinQRScanAlert from '../WinQRScanAlert';
import QRScanner from '../components/QRScanner';

export default function SampleCollector({ navigation }) {
	const [latitude, setLatitude] = useState(0);
	const [longitude, setlongitude] = useState();
	const [locationAccessed, setLocationAccessed] = useState(false);

	const [location, setLocation] = useState(undefined);
	const [sampleDataOverlayVisible, setSampleDataOverlayVisible] =
		useState(false);
	const [listOverlayVisible, setListOverlayVisible] = useState(false);
	const [locationPermissionVisible, setLocationPermissionVisible] =
		useState(false);
	const [qrData, setQrData] = useState(undefined);
	const [collectionPointList, setCollectionPointList] = useState(undefined);
	const [showScanPopup, setshowScanPopup] = useState(false);

	const [phValue, setPhValue] = useState(undefined);
	const [temperatureValue, setTemparatureValue] = useState(undefined);
	const [inflowValue, setInflowValue] = useState(undefined);

	const [showSuccessPopup, setShowSuccessPopup] = useState(false);
	const [showErrPopup, setShowErrPopup] = useState(false);
	const [serverMessage, setServerMessage] = useState('');

	const [reactiveQR, setReactiveQR] = useState(true);
	const [scanner, setScanner] = useState(null);
	const [loading, setLoading] = useState(false);
	const [qrCodeManual, setQrCodeManual] = useState('');
	const [showManualQR, setShowManualQR] = useState(false);

	const scannerRef = useRef();

	let screenShotsPath = undefined;

	const takeScreenShots = () => {
		captureScreen({
			format: 'jpg',
			quality: 0.8,
		}).then(
			uri => {
				console.log('Image saved to', uri);
				screenShotsPath = uri;
				console.log(`stored screenshots=${screenShotsPath}`);
			},
			error => console.error('Oops, snapshot failed', error),
		);
	};

	const handleSampleDataSubmit = pointId => {
		console.log(
			`${Constants.debugDesc.text} handle additional data with point id=${pointId}`,
		);
		setShowManualQR(false);
		if (sampleDataOverlayVisible) {
			toggleOverlay('sampleDataOverlay');
		}

		let additionalData;

		if (
			phValue !== undefined ||
			temperatureValue !== undefined ||
			inflowValue !== undefined
		) {
			additionalData = {
				ph: phValue,
				temperature: temperatureValue,
				inflow: inflowValue,
			};
		}

		console.log(
			`${Constants.debugDesc.text} after adding additional = ${additionalData} qrcode=${qrData}`,
		);

		var s = new SampleTracking();
		console.log(`location=${location.coords}`);
		setLoading(true);
		s.sampleCollected(location, qrData, pointId, additionalData, navigation)
			.then(res => {
				setLoading(false);
				console.log(
					`${Constants.debugDesc.text} response after adding = ${res} with status=${res.status}`,
				);
				if (res.status === 501) {
					setCollectionPointList(res.list);
					toggleOverlay('listOverlay');
					return;
				} else if (res.status !== 200) {
					setServerMessage(res.message);
					setShowErrPopup(true);
				} else {
					setServerMessage(res.message);
					setShowSuccessPopup(true);
				}
			})
			.catch(err => console.log(err));
	};

	const requestLocationPermission = async () => {
		try {
			const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
				{
					title: 'WinMobile App Location Permission',
					message: 'WinMobile App needs access to your location ',
					buttonPositive: 'OK',
				},
			);
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				console.log('You can use the location');
				getLocation();
			} else {
				console.log('Location permission denied');
				requestLocationPermission();
			}
		} catch (err) {
			console.warn(err);
		}
	};

	const configureAdditionalField = () => {
		toggleOverlay('sampleDataOverlay');
	};

	const resetQRScan = () => {
		setQrData(undefined);
		scanner.reactivate();
		setReactiveQR(false);
	};

	const submitHandle = () => {
		let qrCode = qrCodeManual.toUpperCase();
		setQrData(qrCode);
		if (
			Util.isValidQRScan(qrCode) &&
			Constants.scanCharater.regEx.test(qrCode)
		) {
			toggleOverlay('sampleDataOverlay');
		} else {
			ToastAndroid.showWithGravity(
				Constants.alertMessages.invalidQREntered,
				ToastAndroid.SHORT,
				ToastAndroid.BOTTOM,
			);
			setQrCodeManual('');
		}
	};

	const renderManualQRInputBox = () => {
		setTimeout(function () {
			setShowManualQR(true);
		}, 100);
	};

	const getLocation = () => {
		Geolocation.getCurrentPosition(
			data => {
				console.log(`get location long=${data.coords.longitude}`);
				console.log(`get location lat=${data.coords.latitude}`);
				setLatitude(data.coords.latitude);
				setLocation(data);
				setLocationAccessed(true);
			},
			error => {
				console.log(error);
				setLocation(false);
				setLocationAccessed(true);
			},
			{
				timeout: 6000,
				maximumAge: 10000,
			},
		);
	};

	onSuccess = e => {
		console.log(`capture data=${e.data}`);
		takeScreenShots();
		let qrCode = e.data.toUpperCase();
		setQrData(qrCode);
		if (
			Util.isValidQRScan(qrCode) &&
			Constants.scanCharater.regEx.test(qrCode)
		) {
			setReactiveQR(false);
			setshowScanPopup(true);
			//	toggleOverlay('sampleDataOverlay')
		} else {
			// setServerMessage(Constants.alertMessages.invalidQRCode)
			// setShowErrPopup(true);
			ToastAndroid.showWithGravity(
				Constants.alertMessages.invalidQRCode,
				ToastAndroid.SHORT,
				ToastAndroid.BOTTOM,
			);
			setTimeout(function () {
				scanner.reactivate();
			}, 3000);
			setReactiveQR(false);
		}
	};

	const toggleOverlay = overlay => {
		if (overlay === 'locationPermissionOverlay') {
			setLocationPermissionVisible(!locationPermissionVisible);
		} else if (overlay === 'sampleDataOverlay') {
			console.log(
				`coming here and set value =${sampleDataOverlayVisible}`,
			);
			setSampleDataOverlayVisible(!sampleDataOverlayVisible);
		} else if (overlay === 'listOverlay') {
			setListOverlayVisible(!listOverlayVisible);
		}
	};

	const saveToDB = () => {
		navigation.goBack();
	};

	const errorAction = () => {
		navigation.goBack();
	};

	const renderCollectionPointList = () => {
		if (collectionPointList !== undefined) {
			let list = [];
			collectionPointList.forEach((point, idx) => {
				list.push(
					<TouchableHighlight
						key={idx}
						style={styles.pointListItemContainer}
						underlayColor={Constants.colors.primaryDark}
						onPress={() => {
							handleSampleDataSubmit(point.pointId);
							toggleOverlay('listOverlay');
						}}>
						<Text key={idx} style={styles.pointListItem}>
							{point.name}
						</Text>
					</TouchableHighlight>,
				);
			});
			return list;
		}
	};

	const handleAppStateChange = nextAppState => {
		// if(nextAppState )
	};

	useEffect(() => {
		requestLocationPermission();
		AppState.addEventListener('change', handleAppStateChange);
		// renderManualQRInputBox();
	}, []);

	return (
		<View style={{ flex: 1, backgroundColor: 'black', height: '100%' }}>
			{/* <Text>Sample collector page {latitude}</Text> */}
			{locationAccessed == true ? (
				<QRScanner
					onRead={data => {
						toggleOverlay('sampleDataOverlay');
						setQrData(data);
					}}
					isConfirmationNeeded={true}
					ref={scannerRef}
				/>
			) : undefined}

			{/* {locationAccessed == true ? (
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
			) : undefined}
			{locationAccessed == true ? (
				<BarcodeMask
					width={300}
					height={300}
					showAnimatedLine={false}
					outerMaskOpacity={0.9}
				/>
			) : undefined}

			{showManualQR === true ? (
				<View
					style={{
						marginHorizontal: 55,
						flexDirection: 'row',
						justifyContent: 'space-between',
						marginBottom: 0,
						position: 'relative',
					}}>
					<TextInput
						style={styles.inputBox}
						height={40}
						placeholder="QR Code"
						onChangeText={setQrCodeManual}
						selectionColor="#756BDE"
						autoCapitalize="none"
						value={qrCodeManual}
						placeholderTextColor={Constants.colors.grayColor}
					/>
					<TouchableOpacity
						style={{
							backgroundColor: '#756BDE',
							width: 70,
							height: 40,
							borderRadius: 5,
						}}
						onPress={() => submitHandle()}>
						<Text
							style={{
								alignSelf: 'center',
								padding: 10,
								color: '#ffff',
							}}>
							Submit
						</Text>
					</TouchableOpacity>
				</View>
			) : (
				<></>
			)} */}

			<Overlay isVisible={location === undefined}>
				<ActivityIndicator size="large" color="#0000ff" />
				<Text style={{ color: Constants.colors.grayColor }}>
					Getting your location
				</Text>
			</Overlay>

			<Overlay
				style={styles.sampleDataOverlay}
				isVisible={sampleDataOverlayVisible}
				onBackdropPress={() => {
					toggleOverlay('sampleDataOverlay');
					scannerRef.current.reset();
				}}>
				<Text style={styles.sampleDataHeading}>Additional Data</Text>
				<Text
					style={{
						color: 'green',
						fontWeight: '500',
						alignSelf: 'center',
					}}>
					Scanned QR Code: {qrData}
				</Text>
				<TextInput
					style={styles.sampleDataInput}
					placeholder="pH Value"
					selectionColor="#756BDE"
					autoCapitalize="none"
					keyboardType="decimal-pad"
					onChangeText={setPhValue}
					placeholderTextColor={Constants.colors.grayColor}
				/>
				<TextInput
					style={styles.sampleDataInput}
					placeholder="Temperature (°C)"
					selectionColor="#756BDE"
					autoCapitalize="none"
					keyboardType="decimal-pad"
					onChangeText={setTemparatureValue}
					placeholderTextColor={Constants.colors.grayColor}
				/>
				<TextInput
					style={styles.sampleDataInput}
					placeholder="Inflow (Mega Liter)"
					selectionColor="#756BDE"
					autoCapitalize="none"
					keyboardType="decimal-pad"
					onChangeText={setInflowValue}
					placeholderTextColor={Constants.colors.grayColor}
				/>
				<TouchableHighlight
					style={styles.button}
					underlayColor={Constants.colors.primaryDark}
					onPress={() => {
						handleSampleDataSubmit(undefined);
					}}>
					<Text style={styles.buttonText}>Submit</Text>
				</TouchableHighlight>
			</Overlay>

			<Overlay
				overlayStyle={{
					margin: 30,
					padding: 20,
					flexDirection: 'column',
					justifyContent: 'center',
				}}
				isVisible={listOverlayVisible}
				windowBackgroundColor="#000"
				onBackdropPress={() => {
					toggleOverlay('listOverlay');
					setScanned(false);
				}}>
				<Text style={styles.pointListHeading}>
					Multiple collection points nearby. Please pick one
				</Text>
				<View style={styles.samplingPointListScroll}>
					<ScrollView>{renderCollectionPointList()}</ScrollView>
				</View>
			</Overlay>

			<WinCustomAlert
				displayMode={'success'}
				displayTitle={serverMessage}
				visibility={showSuccessPopup}
				dismissAlert={setShowSuccessPopup}
				onPressHandler={() => saveToDB()}
			/>
			<WinCustomAlert
				displayMode={'failed'}
				displayTitle={serverMessage}
				visibility={showErrPopup}
				dismissAlert={setShowErrPopup}
				onPressHandler={() => errorAction()}
			/>

			<WinQRScanAlert
				displayMode={'failed'}
				displayMsg={qrData}
				visibility={showScanPopup}
				dismissAlert={setshowScanPopup}
				onConfirmPressHandler={() => configureAdditionalField()}
				onDiscardPressHandler={() => resetQRScan()}
			/>

			{loading === true ? <Spinner /> : null}
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
	result: {
		paddingHorizontal: 50,
		paddingVertical: 20,
	},
	sampleDataOverlay: {
		padding: 20,
	},
	samplingPointListScroll: {
		height: '80%',
		marginVertical: 10,
	},
	sampleDataHeading: {
		fontSize: 20,
		paddingHorizontal: 30,
		color: Constants.colors.grayColor,
	},
	sampleDataInput: {
		margin: 5,
		padding: 10,
		backgroundColor: '#eee',
		color: Constants.colors.grayColor,
	},
	button: {
		marginVertical: 5,
		alignItems: 'center',
		backgroundColor: '#756BDE',
		padding: 10,
	},
	buttonText: {
		fontSize: 15,
		fontWeight: 'bold',
		color: '#fff',
	},
	pointListHeading: {
		fontSize: 18,
		color: Constants.colors.black,
		fontWeight: 'bold',
		marginVertical: 10,
	},
	pointListItemContainer: {
		backgroundColor: Constants.colors.primaryDark,
		marginVertical: 10,
	},
	pointListItem: {
		fontSize: 14,
		padding: 15,
		color: '#fff',
	},

	inputBox: {
		padding: 10,
		backgroundColor: '#E6E8ED',
		marginBottom: 40,
		marginLeft: 0,
		marginRight: 5,
		color: Constants.colors.grayColor,
		alignSelf: 'center',
		flex: 6,
		borderRadius: 5,
	},
});
