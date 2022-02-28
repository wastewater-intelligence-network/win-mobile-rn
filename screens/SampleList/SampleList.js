
import React, { useState, useRef, useCallback, useEffect } from "react";
import {
	StyleSheet,
	View,
	Text,
	StatusBar,
	Image,
	TouchableOpacity
} from "react-native";
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';
import DatePicker from 'react-native-date-picker';

import WinLogoColor from '../../assets/win_logo_color.png';
import Authentication from '../../controllers/authentication';
import SampleTracking from '../../controllers/sample_tracking';
import Constants from '../constants';

import SampleCollectionIcon from '../../assets/sample_collection.png';
import SampleInTransitIcon from '../../assets/transition.png';
import SampleInLabIcon from '../../assets/sample_accepted.png';
import Util from "../Util";

export default function SampleList({ navigation }) {

	const [sampleList, setSampleList] = useState([])
	const [date, setDate] = useState(new Date())
	const [open, setOpen] = useState(false)

	useEffect(() => {
		var sampleTracking = new SampleTracking()
		sampleTracking.getSamplesList(Util.getCurrentDate(), navigation)
			.then(setSampleList)
		console.log(`calculated date = ${Util.getCurrentDate()}`)
		//	sampleTracking.getSamplesList('2022-2-8', navigation)
		//		.then(setSampleList)
	}, [])

	const detailedStatusDefault = [
		{
			"message": "Sample not yet collected"
		}, {
			"message": "Sample yet to be transported"
		}, {
			"message": "Sample has not reached the lab"
		}
	]

	const renderHeader = (item) => {
		var l = item.statusLog.length
		var date = new Date(item.statusLog[l - 1].timestamp)
		var statusRes = getStatusResponse(item.status)
		return (
			<View
				style={styles.accordionHeader}
			>
				<View
					style={styles.accordionHeaderLeftContainer}
				>
					<Text
						style={styles.accordionHeaderTitle}
					>
						{item.sampleCollectionLocation.name}
					</Text>
					<Text
						style={styles.accordionHeaderTime}
					>
						{date.getHours() % 12 + ':' + date.getMinutes() + ' ' + (date.getHours() < 12 ? 'AM' : 'PM')}
					</Text>
				</View>
				<View
					style={{ backgroundColor: statusRes.color, ...styles.accordionHeaderRightContainer }}
				>
					<Image
						source={statusRes.icon}
						style={styles.accordionHeaderStatusImg}
					/>
					<Text style={styles.accordionHeaderStatusText}>{statusRes.short}</Text>
				</View>

			</View>
		);
	}

	const getStatusResponse = (status) => {
		if (status === Constants.status.sampleCollected) {
			return {
				long: 'Sample collected',
				short: 'Sample\nCollected',
				icon: SampleCollectionIcon,
				color: '#0020b8'
			}
		} else if (status === Constants.status.sampleInTransit) {
			return {
				long: 'Sample in transit',
				short: 'Sample\nOnRoute',
				icon: SampleInTransitIcon,
				color: '#584174'
			}
		} else if (status === Constants.status.sampleReceivedInLab) {
			return {
				long: 'Sample in lab',
				short: 'Sample\nReceived',
				icon: SampleInLabIcon,
				color: '#356934'
			}
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
	}

	const renderDetailedStatus = (statusList) => {
		var res = []
		detailedStatusDefault.forEach((statusItem, i) => {
			var response = statusItem.message
			var color = Constants.colors.gray
			var date = undefined
			if (i < statusList.length) {
				var d = new Date(statusList[i].timestamp)
				response = getStatusResponse(statusList[i].status).long
				date = <Text style={styles.detailedStatusDate}>{d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear() + ' ' + d.getHours() % 12 + ':' + d.getMinutes() + ':' + d.getSeconds() + ' ' + (d.getHours() < 12 ? 'AM' : 'PM')}</Text>
				color = '#3D7B3D'
			}
			res.push(
				<View
					key={i}
					style={{
						borderLeftWidth: 10,
						borderColor: color,
						paddingHorizontal: 10,
						paddingVertical: 10,
						marginVertical: 4
					}}
				>
					<Text style={styles.detailedStatusText}>{response}</Text>
					{date}
				</View>
			)
		})

		return res
	}

	const renderBody = (item) => {
		return (
			<View style={styles.accordionBody}>
				{
					[
						["Sample ID", item.sampleId],
						["Container ID", item.containerId],
						["Location ID", item.sampleCollectionLocation.pointId],
						["Type", item.sampleCollectionLocation.type]
					].map((v, i) => {
						if (v) {
							return (
								<View key={i} style={styles.accordionBodyRow}>
									<Text style={styles.accordionBodyTableKey}>{v[0]}</Text>
									<Text style={styles.accordionBodyTableValue}>{v[1]}</Text>
								</View>
							)
						}
					})
				}
				<View style={styles.accordionBodyStatusContainer}>
					{renderDetailedStatus(item.statusLog)}
				</View>
			</View>
		);
	}



	return (
		<View
			style={styles.container}
		>
			{console.log(`${Constants.debugDesc.text} comes under sampling list`)}
			<Text style={styles.pageHeading}>Sampling Status</Text>
			{/* <TouchableOpacity onPress={() => setOpen(true)}>
				<Text>Search</Text>
			</TouchableOpacity> */}

			{/* <DatePicker
				modal
				open={open}
				date={date}
				onConfirm={(date) => {
					setOpen(false)
					setDate(date)
				}}
				onCancel={() => {
					setOpen(false)
				}}
			/> */}

			<View style={styles.accordionContainer}>
				<AccordionList
					style={styles.accordionList}
					list={sampleList}
					header={renderHeader}
					body={renderBody}
					keyExtractor={item => item.sampleId}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: StatusBar.currentHeight,
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%'
	},
	accordionContainer: {
		width: '100%',
		padding: 20
	},
	accordionList: {
		marginBottom: 80
	},
	pageHeading: {
		fontSize: 25,
		fontWeight: "bold",
		marginTop: 40,
		marginBottom: 8,
		fontFamily: "Quicksand",
		color: "#756BDE"
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
		borderTopRightRadius: 5
	},
	accordionHeaderLeftContainer: {
		flex: 1,
		paddingLeft: 10
	},
	accordionHeaderTitle: {
		fontSize: 23,
		fontWeight: '100',
		fontFamily: "Quicksand"
	},
	accordionHeaderTime: {
		fontSize: 17,
		fontFamily: "QuicksandBold"
	},
	accordionHeaderRightContainer: {
		paddingTop: 9,
		paddingBottom: 4,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5
	},
	accordionHeaderStatusText: {
		fontSize: 12,
		color: '#000',
		paddingVertical: 3,
		paddingHorizontal: 10,
		textAlign: 'center',
		fontFamily: "QuicksandBold",
		color: '#fff'
	},
	accordionHeaderStatusImg: {
		width: 29,
		height: 25
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
		flexDirection: 'row'
	},
	accordionBodyTableKey: {
		flex: 1,
		fontFamily: "QuicksandBold"
	},
	accordionBodyTableValue: {
		flex: 2,
		fontFamily: "Quicksand"
	},
	accordionBodyStatusContainer: {
		marginTop: 20,
		paddingTop: 20,
		borderTopWidth: 1,
		borderColor: '#a1a1a1'
	},
	detailedStatusText: {
		fontFamily: "QuicksandBold",
	},
	detailedStatusDate: {
		fontSize: 13,
		fontFamily: "Quicksand",
	}
});
