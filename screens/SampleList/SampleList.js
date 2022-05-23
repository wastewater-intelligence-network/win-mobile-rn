import React, { useState, useRef, useCallback, useEffect } from 'react';
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
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/Ionicons';

import WinLogoColor from '../../assets/win_logo_color.png';
import Authentication from '../../controllers/authentication';
import SampleTracking from '../../controllers/sample_tracking';
import Constants from '../constants';

import SampleCollectionIcon from '../../assets/sample_collection.png';
import SampleInTransitIcon from '../../assets/transition.png';
import SampleInLabIcon from '../../assets/sample_accepted.png';
import Util from '../Util';
import Spinner from '../Spinner';
import I18n from '../../i18n/i18n';

export default function SampleList({ navigation }) {
	const [sampleList, setSampleList] = useState([]);
	const [date, setDate] = useState(new Date());
	const [open, setOpen] = useState(false);
	const [dataLoaded, setDataLoaded] = useState(false);

	useEffect(() => {
		var sampleTracking = new SampleTracking();
		setDate(Util.getCurrentDate);
		sampleTracking
			.getSamplesList(Util.getFilteredDate(), navigation)
			.then(data => {
				setSampleList(data);
				setDataLoaded(true);
			});
	}, []);

	const detailedStatusDefault = [
		{
			message: 'Sample not yet collected',
		},
		{
			message: 'Sample yet to be transported',
		},
		{
			message: 'Sample has not reached the lab',
		},
	];

	const renderHeader = item => {
		var l = item.statusLog.length;
		var date = new Date(item.statusLog[0].timestamp);

		var statusRes = getStatusResponse(item.status);
		return (
			<View style={styles.accordionHeader}>
				<View style={styles.accordionHeaderLeftContainer}>
					<Text style={styles.accordionHeaderTitle}>
						{item.sampleCollectionLocation.name}
					</Text>
					<Text style={styles.accordionHeaderTime}>
						{Util.timeFormatter(date)}
					</Text>
				</View>
				<View
					style={{
						backgroundColor: statusRes.color,
						...styles.accordionHeaderRightContainer,
					}}>
					<Image
						source={statusRes.icon}
						style={styles.accordionHeaderStatusImg}
					/>
					<Text style={styles.accordionHeaderStatusText}>
						{statusRes.short}
					</Text>
				</View>
			</View>
		);
	};

	const getStatusResponse = status => {
		if (status === Constants.status.sampleCollected) {
			return {
				long: 'Sample collected',
				short: 'Sample\nCollected',
				icon: SampleCollectionIcon,
				color: '#0020b8',
			};
		} else if (status === Constants.status.sampleInTransit) {
			return {
				long: 'Sample in transit',
				short: 'Sample\nOnRoute',
				icon: SampleInTransitIcon,
				color: '#584174',
			};
		} else if (status === Constants.status.sampleReceivedInLab) {
			return {
				long: 'Sample in lab',
				short: 'Sample\nReceived',
				icon: SampleInLabIcon,
				color: '#356934',
			};
		} /* else if(status === Constants.status.sampleTestInProgress) {
			return {
				long: 'Sample in lab',
				short: 'Sample\nReceived',
				icon: SampleCollectionIcon,
				color: '#0020b8'
			}
		} else if(status === Constants.status.sampleResultOut) {
			return {
				long: 'Sample in lab',
				short: 'Sample\nReceived',
				icon: SampleCollectionIcon,
				color: '#0020b8'
			}
		} */
	};

	const renderDetailedStatus = statusList => {
		var res = [];
		detailedStatusDefault.forEach((statusItem, i) => {
			var response = statusItem.message;
			var color = Constants.colors.gray;
			var date = undefined;
			let errorMessage = '';
			if (i < statusList.length) {
				var d = new Date(statusList[i].timestamp);
				if (statusList[i].hasOwnProperty(Constants.statusLog.error)) {
					errorMessage = statusList[i].message;
					color = 'red';
				} else {
					response = getStatusResponse(statusList[i].status).long;
					var date = d.getDate();
					var month = d.getMonth();
					date = (
						<Text style={styles.detailedStatusDate}>
							{(date < 10 ? '0' + date : date) +
								'/' +
								(month < 10 ? '0' + month : month) +
								'/' +
								d.getFullYear() +
								' ' +
								(d.getHours() % 12 < 10
									? '0' + (d.getHours() % 12)
									: d.getHours() % 12) +
								':' +
								(d.getMinutes() < 10
									? '0' + d.getMinutes()
									: d.getMinutes()) +
								':' +
								(d.getSeconds() < 10
									? '0' + d.getSeconds()
									: d.getSeconds()) +
								' ' +
								(d.getHours() < 12 ? 'AM' : 'PM')}
						</Text>
					);
					color = '#3D7B3D';
				}
			}
			res.push(
				<View
					key={i}
					style={{
						borderLeftWidth: 10,
						borderColor: color,
						paddingHorizontal: 10,
						paddingVertical: 10,
						marginVertical: 4,
					}}>
					<Text style={styles.detailedStatusText}>
						{errorMessage.length > 0 ? errorMessage : response}
					</Text>
					{errorMessage.length > 0 ? undefined : date}
				</View>,
			);
		});
		return res;
	};

	const renderData = (data, field) => {
		if (data === undefined) {
			return 'NA';
		} else {
			return data[field];
		}
	};

	const renderBody = item => {
		return (
			<View style={styles.accordionBody}>
				{[
					['Sample ID', item.sampleId],
					['Container ID', item.containerId],
					['Location ID', item.sampleCollectionLocation.pointId],
					['Type', item.sampleCollectionLocation.type],
				].map((v, i) => {
					if (v) {
						return (
							<View key={i} style={styles.accordionBodyRow}>
								<Text style={styles.accordionBodyTableKey}>
									{v[0]}
								</Text>
								<Text style={styles.accordionBodyTableValue}>
									{v[1]}
								</Text>
							</View>
						);
					}
				})}
				<View style={styles.accordionBodyStatusContainer}>
					{renderDetailedStatus(item.statusLog)}
				</View>
				<View style={styles.accordionBodyDataContainer}>
					<View>
						<Text style={styles.accordionBodyDataHeader}>
							pH Value
						</Text>
						<Text style={styles.accordionBodyDataText}>
							{renderData(item.additionalData, 'ph')}
						</Text>
					</View>
					<View>
						<Text style={styles.accordionBodyDataHeader}>
							Temp (°C)
						</Text>
						<Text style={styles.accordionBodyDataText}>
							{renderData(item.additionalData, 'temperature')}
						</Text>
					</View>
					<View>
						<Text style={styles.accordionBodyDataHeader}>
							Inflow (MLD)
						</Text>
						<Text style={styles.accordionBodyDataText}>
							{renderData(item.additionalData, 'inflow')}
						</Text>
					</View>
				</View>
			</View>
		);
	};

	const selectedDate = passedDate => {
		var sampleTracking = new SampleTracking();
		setDataLoaded(false);
		sampleTracking
			.getSamplesList(Util.getFilteredDate(passedDate), navigation)
			.then(data => {
				setSampleList(data);
				setDataLoaded(true);
			});
	};

	return (
		<View style={styles.container}>
			<Text style={styles.pageHeading}>{I18n.t('sampling_status')}</Text>
			<Text style={styles.dateStyle}>{Util.getFormatedDate(date)}</Text>
			<TouchableOpacity
				style={styles.button}
				onPress={() => setOpen(true)}>
				<Text style={styles.buttonText}>{I18n.t('select_date')}</Text>
			</TouchableOpacity>
			<Text style={styles.dateStyle}>
				Samples available: {sampleList.length}
			</Text>
			<DatePicker
				modal
				mode="date"
				open={open}
				date={date}
				onConfirm={date => {
					setOpen(false);
					setDate(date);
					selectedDate(date);
				}}
				onCancel={() => {
					setOpen(false);
				}}
			/>
			{dataLoaded === true ? (
				<View style={styles.container}>
					{sampleList.length > 0 ? (
						<View style={styles.accordionContainer}>
							<AccordionList
								style={styles.accordionList}
								list={sampleList}
								header={renderHeader}
								body={renderBody}
								keyExtractor={item => item.sampleId}
							/>
						</View>
					) : (
						<View style={styles.noDataView}>
							<Text style={styles.noDataMsg}>
								{I18n.t('no_data')}
							</Text>
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
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		alignSelf: 'center',
		width: '95%',
	},
	accordionContainer: {
		marginTop: 20,
		width: '100%',
		height: '90%',
		padding: 0,
		paddingBottom: 65,
	},
	accordionList: {
		marginBottom: 105,
	},
	pageHeading: {
		fontSize: 25,
		fontWeight: 'bold',
		marginTop: 40,
		marginBottom: 8,
		fontFamily: 'Quicksand',
		color: '#756BDE',
	},
	accordionHeader: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: '#fff',
		paddingVertical: 10,
		paddingHorizontal: 10,
		marginTop: 10,
		alignItems: 'center',
		borderWidth: 1,
		borderColor: '#a1a1a1',
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5,
	},
	accordionHeaderLeftContainer: {
		flex: 1,
		paddingLeft: 10,
	},
	accordionHeaderTitle: {
		fontSize: 23,
		fontWeight: '100',
		fontFamily: 'Quicksand',
		color: Constants.colors.grayColor,
	},
	accordionHeaderTime: {
		fontSize: 17,
		fontFamily: 'QuicksandBold',
		color: Constants.colors.grayColor,
	},
	accordionHeaderRightContainer: {
		paddingTop: 9,
		paddingBottom: 4,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
	},
	accordionHeaderStatusText: {
		fontSize: 12,
		color: '#000',
		paddingVertical: 3,
		paddingHorizontal: 10,
		textAlign: 'center',
		fontFamily: 'QuicksandBold',
		color: '#fff',
	},
	accordionHeaderStatusImg: {
		width: 29,
		height: 25,
	},
	accordionBody: {
		backgroundColor: '#f9f9f9',
		padding: 20,
		borderLeftWidth: 1,
		borderBottomWidth: 1,
		borderRightWidth: 1,
		borderBottomLeftRadius: 5,
		borderBottomRightRadius: 5,
		borderColor: '#a1a1a1',
	},
	accordionBodyRow: {
		flexDirection: 'row',
	},
	accordionBodyTableKey: {
		flex: 1,
		fontFamily: 'QuicksandBold',
		color: Constants.colors.grayColor,
	},
	accordionBodyTableValue: {
		flex: 2,
		fontFamily: 'Quicksand',
		color: Constants.colors.grayColor,
	},
	accordionBodyStatusContainer: {
		marginTop: 20,
		paddingTop: 20,
		borderTopWidth: 1,
		borderColor: '#a1a1a1',
	},
	detailedStatusText: {
		fontFamily: 'QuicksandBold',
		color: Constants.colors.grayColor,
	},
	detailedStatusDate: {
		fontSize: 13,
		fontFamily: 'Quicksand',
		color: Constants.colors.grayColor,
	},
	accordionBodyDataContainer: {
		marginTop: 10,
		paddingTop: 10,
		borderTopWidth: 1,
		borderColor: '#a1a1a1',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	accordionBodyDataHeader: {
		fontWeight: '800',
		color: Constants.colors.grayColor,
	},
	accordionBodyDataText: {
		color: Constants.colors.grayColor,
	},
	dateStyle: {
		marginTop: -2,
		fontWeight: '500',
		fontFamily: 'Quicksand',
		color: '#756BDE',
	},
	chooseDateStyle: {
		marginTop: 2,
		fontWeight: '700',
		fontFamily: 'Quicksand',
		color: '#756BDE',
	},

	messageContainerStyle: {
		justifyContent: 'center',
		height: Dimensions.get('window').height - 120,
	},
	noDataView: {
		justifyContent: 'center',
		marginVertical: 10,
	},
	noDataMsg: {
		fontSize: 15,
	},
	button: {
		backgroundColor: Constants.colors.primaryDark,
		marginVertical: 6,
		borderRadius: 7,
		width: '50%',
	},
	buttonText: {
		color: '#fff',
		fontSize: 15,
		textAlign: 'center',
		padding: 10,
	},
});
