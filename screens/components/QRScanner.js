import React, { forwardRef, useState, useImperativeHandle } from 'react';
import {
	Text,
	TextInput,
	View,
	TouchableOpacity,
	TouchableHighlight,
	Dimensions,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import BarcodeMask from 'react-native-barcode-mask';

import WinCustomAlert from '../WinCustomAlert';
import WinQRScanAlert from '../WinQRScanAlert';
import Constants from '../constants';

const QRScanner = forwardRef((props, ref) => {
	const [scannerRef, setScannerRef] = useState(null);
	const [qrValue, setQrValue] = useState('');
	const [validateQrPopupVisibility, setValidateQrPopupVisibility] =
		useState(false);
	const [showErrPopup, setShowErrPopup] = useState(false);

	useImperativeHandle(ref, () => ({
		reset() {
			resetQRScan();
		},
	}));

	const defaultIsValid = data => {
		const re = new RegExp('^[a-z0-9]{5}$', 'i');
		console.log(re.test(data), data);
		if (re.test(data)) {
			return true;
		}
		return false;
	};

	const resetQRScan = () => {
		scannerRef.reactivate();
		setQrValue('');
	};

	const validate = data => {
		if (data === undefined) {
			data = qrValue;
		}
		if (defaultIsValid(data)) {
			if (
				props.isConfirmationNeeded !== undefined &&
				props.isConfirmationNeeded === true
			) {
				setValidateQrPopupVisibility(true);
			} else {
				props.onRead(data);
			}
		} else {
			setShowErrPopup(true);
		}
	};

	const preprocess = async data => {
		data = data.toUpperCase();
		setQrValue(data);
		return data;
	};

	return (
		<>
			<QRCodeScanner
				reactivate={false}
				onRead={async e => {
					let data = await preprocess(e.data);
					validate(data);
				}}
				style={{
					height: '100%',
					width: Dimensions.get('window').width,
				}}
				ref={node => {
					setScannerRef(node);
				}}
			/>
			<BarcodeMask
				width={300}
				height={300}
				showAnimatedLine={false}
				outerMaskOpacity={0.9}
			/>
			<View
				style={{
					marginHorizontal: 55,
					flexDirection: 'row',
					justifyContent: 'space-between',
					marginBottom: 0,
					position: 'relative',
				}}>
				<TextInput
					style={{
						padding: 10,
						backgroundColor: '#E6E8ED',
						marginBottom: 40,
						marginLeft: 0,
						marginRight: 5,
						color: Constants.colors.grayColor,
						alignSelf: 'center',
						flex: 6,
						borderRadius: 5,
					}}
					height={40}
					placeholder="QR Code"
					onChangeText={preprocess}
					value={qrValue}
					selectionColor="#756BDE"
					autoCapitalize={'characters'}
					placeholderTextColor={Constants.colors.grayColor}
				/>
				<TouchableOpacity
					style={{
						backgroundColor: '#756BDE',
						width: 70,
						height: 40,
						borderRadius: 5,
					}}
					onPress={e => validate(undefined)}>
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
			<WinQRScanAlert
				displayMode={'failed'}
				displayMsg={qrValue}
				visibility={validateQrPopupVisibility}
				dismissAlert={setValidateQrPopupVisibility}
				onConfirmPressHandler={() => props.onRead(qrValue)}
				onDiscardPressHandler={() => resetQRScan()}
			/>
			<WinCustomAlert
				displayMode={'failed'}
				displayTitle={'Invalid QR Code'}
				displayMsg={
					'QR code is of length 5 and only alphanumeric characters.'
				}
				visibility={showErrPopup}
				dismissAlert={setShowErrPopup}
				onPressHandler={() => {
					resetQRScan();
				}}
			/>
		</>
	);
});

export default QRScanner;
