import React, { useState, useRef, useEffect } from 'react';
import {
	StyleSheet,
	View,
	Text,
	StatusBar,
	Image,
	TouchableOpacity,
	Dimensions,
	FlatList,
} from 'react-native';

import {
	Collapse,
	CollapseHeader,
	CollapseBody,
	AccordionList,
} from 'accordion-collapse-react-native';

import SampleTracking from '../../controllers/sample_tracking';
import Util from '../Util';
import Spinner from '../Spinner';
import Constants from '../constants';

const data = [
	{
		assignedPointId: 23,
		assignedPointName: 'Bhesan Jahangirabad',
		assignedUserId: 1,
		date: '29/11/2021',
		latitude: 23.4524242,
		longitude: 77.3534242,
		time: '06:00 AM',
		type: 'STP',
	},
	{
		assignedPointId: 24,
		assignedPointName: 'Patna Jahangirabad',
		assignedUserId: 1,
		date: '29/11/2021',
		latitude: 23.4524242,
		longitude: 77.3534242,
		time: '06:00 AM',
		type: 'STP',
	},
	{
		assignedPointId: 25,
		assignedPointName: 'Surat Jahangirabad',
		assignedUserId: 1,
		date: '29/11/2021',
		latitude: 23.4524242,
		longitude: 77.3534242,
		time: '06:00 AM',
		type: 'TET',
	},
	{
		assignedPointId: 25,
		assignedPointName: 'Surat Jahangirabad',
		assignedUserId: 1,
		date: '29/11/2021',
		latitude: 23.4524242,
		longitude: 77.3534242,
		time: '06:00 AM',
		type: 'TET',
	},
	{
		assignedPointId: 25,
		assignedPointName: 'Surat Jahangirabad',
		assignedUserId: 1,
		date: '29/11/2021',
		latitude: 23.4524242,
		longitude: 77.3534242,
		time: '06:00 AM',
		type: 'TET',
	},
	{
		assignedPointId: 26,
		assignedPointName: 'Surat Jahangirabad',
		assignedUserId: 1,
		date: '29/11/2021',
		latitude: 23.4524242,
		longitude: 77.3534242,
		time: '06:00 AM',
		type: 'TET',
	},
	{
		assignedPointId: 27,
		assignedPointName: 'Surat Jahangirabad',
		assignedUserId: 1,
		date: '29/11/2021',
		latitude: 23.4524242,
		longitude: 77.3534242,
		time: '06:00 AM',
		type: 'TET',
	},
];

const Schedules = ({ navigation }) => {
	const [dataLoaded, setDataLoaded] = useState(false);
	const [scheduleList, setScheduleList] = useState(false);

	useEffect(() => {
		fetchSchedules();
	}, []);

	const fetchSchedules = () => {
		var sampleTracking = new SampleTracking();
		setDataLoaded(false);
		sampleTracking
			.getSchedules(Util.getFilteredDate(), navigation)
			.then(data => {
				setScheduleList(data);
				console.log(`++++fetch data=${data}`);
				setDataLoaded(true);
			});
	};

	const renderBody = ({ item }) => {};

	return (
		<View style={styles.container}>
			<Text style={styles.pageHeading}>Schedules</Text>

			{dataLoaded === true ? (
				<View style={styles.container}>
					{data.length > 0 ? (
						<View style={styles.accordionContainer}>
							<FlatList
								style={{ marginTop: 0 }}
								data={data}
								keyExtractor={item => item.assignedPointId}
								renderItem={({ item }) => {
									return (
										<View style={styles.listViewContainer}>
											<Text style={styles.headerTitle}>
												{item.assignedPointName}
											</Text>
											<View style={styles.sectionStyle}>
												<Text style={styles.textStyle}>
													Point ID:
												</Text>
												<Text style={styles.textStyle}>
													{item.assignedPointId}
												</Text>
											</View>
											<View style={styles.sectionStyle}>
												<Text style={styles.textStyle}>
													Date:
												</Text>
												<Text style={styles.textStyle}>
													{item.date}
												</Text>
											</View>
											<View style={styles.sectionStyle}>
												<Text style={styles.textStyle}>
													Latitude:
												</Text>
												<Text style={styles.textStyle}>
													{item.latitude}
												</Text>
											</View>
											<View style={styles.sectionStyle}>
												<Text style={styles.textStyle}>
													Longitude:
												</Text>
												<Text style={styles.textStyle}>
													{item.longitude}
												</Text>
											</View>
											<View style={styles.sectionStyle}>
												<Text style={styles.textStyle}>
													Type:
												</Text>
												<Text style={styles.textStyle}>
													{item.type}
												</Text>
											</View>
										</View>
									);
								}}
							/>
						</View>
					) : (
						<View style={styles.messageContainerStyle}>
							<Text>{I18n.t('no_data')}</Text>
						</View>
					)}
				</View>
			) : (
				<View style={styles.messageContainerStyle}>
					<Spinner />
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginTop: StatusBar.currentHeight,
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		flex: 1,
	},

	pageHeading: {
		fontSize: 25,
		fontWeight: 'bold',
		marginTop: 20,
		marginBottom: 8,
		fontFamily: 'Quicksand',
		color: '#756BDE',
	},

	accordionContainer: {
		width: '100%',
		padding: 20,
	},

	listViewContainer: {
		marginTop: 10,
		borderWidth: 1,
		borderColor: '#a1a1a1',
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5,
		width: '70%',
		alignSelf: 'center',
		padding: 5,
	},
	headerTitle: {
		fontSize: 23,
		fontWeight: '100',
		fontFamily: 'Quicksand',
		color: Constants.colors.grayColor,
	},
	headerTime: {
		fontSize: 17,
		fontFamily: 'QuicksandBold',
		color: Constants.colors.grayColor,
	},
	sectionStyle: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	textStyle: {
		fontWeight: '400',
		color: Constants.colors.black,
	},
});

export default Schedules;
