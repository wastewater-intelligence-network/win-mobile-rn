import React, { useState } from 'react';
import { Modal, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Constants from './constants';
import LabDetails from './LabDetails';
import CollectionPointsModel from './CollectionPointsModel';

export default function WinCustomAlert({
	displayMode,
	displayTitle,
	displayMsg,
	visibility,
	dismissAlert,
	onPressHandler,
	calculatedHeight = 240,
	labResponse = {},
	collectionPoints = {},
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
							height: 'auto',
							width: '90%',
							borderWidth: 1,
							borderColor: '#fff',
							borderRadius: 7,
							elevation: 10,
						}}>
						<View style={{ alignItems: 'center', margin: 20 }}>
							{displayMode == 'success' ? (
								<>
									{collectionPoints.name !== undefined ? (
										<></>
									) : (
										<Icon
											name="checkmark-circle-outline"
											size={60}
											color="green"
										/>
									)}
								</>
							) : (
								<>
									{/* <Feather name="alert-triangle" size={30} color="red" /> */}
									<Icon
										name="close-circle-outline"
										size={60}
										color="red"
									/>
								</>
							)}
							{collectionPoints.name !== undefined ? (
								<></>
							) : (
								<>
									<Text
										style={{
											fontSize: 19,
											marginTop: 8,
											textAlign: 'center',
											color: Constants.colors.black,
										}}>
										{displayTitle}
									</Text>
									{displayMsg !== undefined ? (
										<Text
											style={{
												fontSize: 16,
												marginTop: 8,
												textAlign: 'center',
												color: Constants.colors.black,
												height: 'auto',
											}}>
											{displayMsg}
										</Text>
									) : undefined}
								</>
							)}
							{labResponse.message === undefined ? (
								collectionPoints.name !== undefined ? (
									<CollectionPointsModel
										collectionRes={collectionPoints}
									/>
								) : (
									<></>
								)
							) : (
								<View style={{ height: 200 }}>
									<LabDetails labResponse={labResponse} />
								</View>
							)}
						</View>

						<TouchableOpacity
							activeOpacity={0.9}
							onPress={() => {
								dismissAlert(false);
								onPressHandler();
							}}
							style={{
								width: '95%',
								borderRadius: 0,
								alignItems: 'center',
								justifyContent: 'center',
								backgroundColor: '#756BDE',
								borderColor: '#ddd',
								borderBottomWidth: 0,
								borderRadius: 5,
								bottom: 0,
								marginBottom: 10,
							}}>
							<Text style={{ color: 'white', margin: 10 }}>
								OK
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		</View>
	);
}
