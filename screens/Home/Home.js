import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	Image,
	TouchableHighlight,
	ToastAndroid,
	BackHandler,
	Alert,
	TouchableOpacity,
} from 'react-native';
import Constants from '../constants';
import Realm from 'realm';
import Util from '../Util';
import DBManager from '../DBManager';
import I18n from '../../i18n/i18n';

import SampleCollectionIcon from '../../assets/safety-suit.png';
import TransporterIcon from '../../assets/delivery-man.png';
import LabAcceptanceIcon from '../../assets/parcel.png';
import LabTestIcon from '../../assets/medical-lab.png';
import ListIcon from '../../assets/task-list.png';
import InventoryIcon from '../../assets/inventory.png';
import ScheduleIcon from '../../assets/schedule.png';
import SurveyIcon from '../../assets/survey.png';
import MapListIcon from '../../assets/sampling_sites_map.png';
import SurveyListIcon from '../../assets/survey_list.png';

import SiteSurvey from '../SiteSurvey/SiteSurvey';

export default function Home({ navigation, route }) {
	const [userRole, setUserRole] = useState('');
	const [rol, setRol] = useState();
	const [finalRoles, setFinalRoles] = useState();
	const [locale, setLocale] = useState('en');

	let finalFilterArray = { collector: [collectorObj] };

	useEffect(() => {
		// forceUpdate();
		console.log('Parent: ' + locale);
	}, [locale]);

	useEffect(() => {
		saveInDB();
		const backAction = () => {
			if (navigation.isFocused()) {
				BackHandler.exitApp();
				return true;
			}
		};
		const backHandler = BackHandler.addEventListener(
			'hardwareBackPress',
			backAction,
		);
		return () => backHandler.remove();
	}, []);

	const saveInDB = () => {
		DBManager.saveRoles(route.params);
	};

	// const inititealization = () => {
	// 	makeFilterList();
	// };

	const getRoles = () => {
		let roles = {};

		roles['common'] = [listObj, mapView];
		roles[Constants.userRoles.collector] = [
			collectorObj,
			inventoryManagement,
			schedules,
		];
		roles[Constants.userRoles.transporter] = [transporterObj];
		roles[Constants.userRoles.technician] = [technicianObj];
		roles[Constants.userRoles.admin] = [
			collectorObj,
			inventoryManagement,
			schedules,
			transporterObj,
			technicianObj,
			siteSurvey,
			siteSuveyList,
		];

		let roleList = route.params;
		if (roleList === undefined) {
			return;
		}

		let tempRoleList = [];
		roleList.forEach(role => {
			tempRoleList.push(...roles[role]);
		});

		tempRoleList.push(...roles['common']);

		return new Set(tempRoleList);
	};

	const signoutHandler = () => {
		Alert.alert('Alert!', 'Do you want to logout?', [
			{
				text: 'No',
				style: 'cancel',
			},
			{
				text: 'Yes',
				onPress: () => DBManager.logout(navigation),
			},
		]);
	};

	const collectorObj = {
		text: I18n.t('sample_collection'),
		icon: SampleCollectionIcon,
		navigate: Constants.screenName.SampleCollector,
	};

	const transporterObj = {
		text: I18n.t('sample_transport'),
		icon: TransporterIcon,
		navigate: Constants.screenName.SampleTransporter,
	};

	const technicianObj = {
		text: I18n.t('sample_accept'),
		icon: LabAcceptanceIcon,
		navigate: Constants.screenName.SampleAcceptance,
	};

	const listObj = {
		text: I18n.t('sample_list'),
		icon: ListIcon,
		navigate: Constants.screenName.SamplesList,
	};

	const siteSurvey = {
		text: I18n.t('site_survey'),
		icon: SurveyIcon,
		navigate: Constants.screenName.SiteSurvey,
	};

	const inventoryManagement = {
		text: I18n.t('inventory_management'),
		icon: InventoryIcon,
		navigate: Constants.screenName.Inventory,
	};

	const siteSuveyList = {
		text: I18n.t('site_survey_list'),
		icon: SurveyListIcon,
		navigate: Constants.screenName.SiteSurveyList,
	};
	const schedules = {
		text: I18n.t('schedules'),
		icon: ScheduleIcon,
		navigate: Constants.screenName.Schedule,
	};

	const mapView = {
		text: I18n.t('collection_point'),
		icon: MapListIcon,
		navigate: Constants.screenName.collectionPoints,
	};

	const renderFinalTaskBoxes = () => {
		var view = [];
		// if (filteredCollectionList.length === 0) {
		//     console.log(`count under rednder final boxes=${filteredCollectionList.length}`);
		//     return
		// }

		let rolesObjectList = getRoles();

		if (rolesObjectList === undefined) {
			console.log('object not defined yet');
			return;
		}

		rolesObjectList.forEach((role, idx) => {
			view.push(
				<TouchableHighlight
					key={idx}
					style={styles.taskBox}
					underlayColor="#ddd"
					onPress={() => {
						navigation.navigate(role.navigate);
					}}>
					<>
						<Image source={role.icon} style={styles.taskImage} />
						<Text
							style={styles.taskText}
							textBreakStrategy="balanced">
							{role.text}
						</Text>
					</>
				</TouchableHighlight>,
			);
		});
		return view;
	};

	return (
		<View style={styles.container}>
			<Text style={styles.listTaskMessage}>
				{I18n.t('list_of_tasks')}
			</Text>
			<View style={styles.taskBoxContainer}>
				{renderFinalTaskBoxes()}
			</View>
			<View style={styles.buttonContainer}>
				<TouchableOpacity
					style={styles.button}
					onPress={() => {
						navigation.navigate(Constants.screenName.ChooseLocale, {
							setLocaleFunc: setLocale,
						});
					}}>
					<Text style={styles.buttonText}>
						{I18n.t('switch_language')}
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={signoutHandler}
					style={styles.button}>
					<Text style={styles.buttonText}>{I18n.t('sign_out')}</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 27,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		fontFamily: 'Quicksand',
	},
	listTaskMessage: {
		fontSize: 25,
		textAlign: 'center',
		color: Constants.colors.primary,
	},
	taskBoxContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 30,
		flexWrap: 'wrap',
	},
	taskBox: {
		width: '30%',
		height: 120,
		backgroundColor: '#eee',
		margin: 5,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 3,
	},
	taskImage: {
		width: 50,
		height: 50,
	},
	taskText: {
		fontSize: 14,
		paddingTop: 5,
		textAlign: 'center',
		fontWeight: 'bold',
		color: Constants.colors.black,
	},
	buttonContainer: {
		marginTop: 50,
	},
	button: {
		backgroundColor: Constants.colors.primaryDark,
		marginVertical: 6,
		borderRadius: 7,
	},
	buttonText: {
		color: '#fff',
		fontSize: 15,
		textAlign: 'center',
		padding: 10,
	},
});
