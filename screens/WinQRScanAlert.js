import React, { useState } from 'react';
import { Modal, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LabDetails from './LabDetails';

export default function WinQRScanAlert({
	displayMode,
	displayMsg,
	visibility,
	dismissAlert,
	onConfirmPressHandler,
	onDiscardPressHandler,
	calculatedHeight = 200,
	labResponse = {},
}) {
	return (
		<View>
			<Modal
				visible={visibility}
				animationType={'fade'}
				transparent={true}>
				<View
					style={{
						flex: 1,
						backgroundColor: 'rgba(52, 52, 52, 0.8)',
						alignItems: 'center',
						justifyContent: 'center',
					}}>
					<View
						style={{
							alignItems: 'center',
							backgroundColor: 'white',
							height: calculatedHeight,
							width: '90%',
							borderWidth: 1,
							borderColor: '#fff',
							borderRadius: 7,
							elevation: 10,
						}}>
						<View style={{ alignItems: 'center', margin: 20 }}>
							<Text
								style={{
									fontSize: 20,
									marginTop: 5,
									color: '#000',
								}}>
								Confirm the QR Code
							</Text>
							<Text
								style={{
									fontWeight: '900',
									fontSize: 40,
									color: '#000',
								}}>
								{displayMsg}
							</Text>
						</View>

						<View
							style={{
								width: '95%',
								borderRadius: 0,
								alignItems: 'center',
								justifyContent: 'center',
								position: 'absolute',
								backgroundColor: '#fff',
								borderColor: '#ddd',
								borderBottomWidth: 0,
								borderRadius: 5,
								bottom: 0,
								marginBottom: 10,
								flexDirection: 'row',
								justifyContent: 'space-between',
							}}>
							<TouchableOpacity
								activeOpacity={0.9}
								style={{
									backgroundColor: '#756BDE',
									width: '35%',
									alignItems: 'center',
									borderRadius: 10,
								}}
								onPress={() => {
									dismissAlert(false);
									onDiscardPressHandler();
								}}>
								<Text
									style={{
										color: 'white',
										margin: 15,
										fontSize: 15,
									}}>
									Scan Again
								</Text>
							</TouchableOpacity>

							<TouchableOpacity
								activeOpacity={0.9}
								style={{
									backgroundColor: '#756BDE',
									width: '35%',
									alignItems: 'center',
									borderRadius: 10,
								}}
								onPress={() => {
									dismissAlert(false);
									onConfirmPressHandler();
								}}>
								<Text
									style={{
										color: 'white',
										margin: 15,
										fontSize: 15,
									}}>
									Confirm
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
		</View>
	);
}
