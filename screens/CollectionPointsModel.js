import React from 'react';
import { Text, View, TouchableOpacity, Linking } from 'react-native';
import Util from './Util';
import Constants from './constants';
import I18n from '../i18n/i18n';

export default function CollectionPointsModel({ collectionRes }) {
	return (
		<View
			style={{
				alignSelf: 'center',
				width: '100%',
			}}>
			<Text style={styles.header}>Point Details</Text>
			<View style={styles.sectionStyle}>
				<Text style={styles.title}>Place:</Text>
				<Text style={styles.textStyle}>{collectionRes.name}</Text>
			</View>
			<View style={styles.sectionStyle}>
				<Text style={styles.title}>PointID:</Text>
				<Text style={styles.textStyle}>{collectionRes.pointId}</Text>
			</View>
			<View style={styles.sectionStyle}>
				<Text style={styles.title}>Type:</Text>
				<Text style={styles.textStyle}>{collectionRes.type}</Text>
			</View>
			<View style={styles.sectionStyle}>
				<Text style={styles.title}>Latitude:</Text>
				<Text style={styles.textStyle}>
					{'   ' + collectionRes.location.coordinates[0]}
				</Text>
			</View>
			<View style={styles.sectionStyle}>
				<Text style={styles.title}>Longitude:</Text>
				<Text style={styles.textStyle}>
					{'   ' + collectionRes.location.coordinates[1]}
				</Text>
			</View>
			<TouchableOpacity
				activeOpacity={0.9}
				onPress={() => {
					Linking.openURL(
						'geo:0,0?q=' +
							collectionRes.location.coordinates[1] +
							',' +
							collectionRes.location.coordinates[0],
					);
				}}
				style={{
					borderRadius: 0,
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: Constants.colors.grayColor,
					borderColor: '#ddd',
					borderRadius: 5,
					marginVertical: 10,
				}}>
				<Text
					style={{
						color: 'white',
						margin: 10,
					}}>
					{'Open Maps'}
				</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = {
	header: {
		fontSize: 24,
		marginVertical: 10,
		fontWeight: '700',
		alignSelf: 'center',
		color: Constants.colors.black,
	},
	title: {
		fontWeight: '700',
		width: '40%',
	},
	sectionStyle: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},

	textStyle: {
		fontWeight: '300',
		color: Constants.colors.black,
	},
};
