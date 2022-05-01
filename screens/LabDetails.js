import React from 'react';
import { Text, View } from 'react-native';
import Util from './Util';
import Constants from './constants';

export default function LabDetails({ labResponse }) {
	return (
		<View style={{ flex: 1, alignSelf: 'center', height: 10 }}>
			<Text></Text>
			<View style={styles.sectionStyle}>
				<Text style={styles.heading}>Place:</Text>
				<Text style={styles.textStyle}>
					{labResponse.sample.sampleCollectionLocation.name}
				</Text>
			</View>
			<View style={styles.sectionStyle}>
				<Text style={styles.heading}>Container ID:</Text>
				<Text style={styles.textStyle}>
					{labResponse.sample.containerId}
				</Text>
			</View>
			<View style={styles.sectionStyle}>
				<Text style={styles.heading}>Location ID:</Text>
				<Text style={styles.textStyle}>
					{labResponse.sample.sampleCollectionLocation.pointId}
				</Text>
			</View>
			<View style={styles.sectionStyle}>
				<Text style={styles.heading}>Type:</Text>
				<Text style={styles.textStyle}>
					{labResponse.sample.sampleCollectionLocation.type}
				</Text>
			</View>
			<View style={styles.sectionStyle}>
				<Text style={styles.heading}>Collected:</Text>
				<Text style={styles.textStyle}>
					{Util.showDateAndTime(labResponse.sample.statusLog, 0)}
				</Text>
			</View>
			<View style={styles.sectionStyle}>
				<Text style={styles.heading}>Transported:</Text>
				<Text style={styles.textStyle}>
					{Util.showDateAndTime(labResponse.sample.statusLog, 1)}
				</Text>
			</View>
		</View>
	);
}

const styles = {
	sectionStyle: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderColor: '#00000033',
		borderBottomWidth: 1,
		borderStyle: 'dashed',
		paddingTop: 5,
	},

	textStyle: {
		fontWeight: '500',
		color: Constants.colors.grayColor,
	},
	heading: {
		fontWeight: '700',
		color: '#000',
		width: '40%',
	},
};
