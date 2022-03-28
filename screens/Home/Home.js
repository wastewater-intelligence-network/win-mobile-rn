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
    TouchableOpacity
} from 'react-native';
import Constants from '../constants';
import Realm from 'realm';
import Util from '../Util';
import DBManager from '../DBManager';

import SampleCollectionIcon from '../../assets/safety-suit.png';
import TransporterIcon from '../../assets/delivery-man.png';
import LabAcceptanceIcon from '../../assets/parcel.png';
import LabTestIcon from '../../assets/medical-lab.png';
import ListIcon from '../../assets/task-list.png';

export default function Home({navigation, route}) {

    const [userRole, setUserRole] = useState('');
    const [rol, setRol] = useState();
    const [finalRoles, setFinalRoles] = useState();

    let filteredCollectionList = [];
    let finalFilterArray = {"collector": [
        collectorObj
    ]};


    useEffect(() => {
        setFinalRoles(filteredCollectionList);
        saveInDB();
        const backAction = () => {
            if (navigation.isFocused()) {
                BackHandler.exitApp()
                return true;
            }
        };
        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
        return () => backHandler.remove();

	}, []);


    const saveInDB = () => {
        DBManager.saveRoles(route.params);
    }

    const inititealization = () => {
       makeFilterList();
    }

   const  makeFilterList = () => {

        // set roles from navigation
        let roleList = route.params;
        if (roleList === undefined) {
            return
        } 

        if(roleList.indexOf(Constants.userRoles.collector) !== -1) {
           filteredCollectionList.push(collectorObj)
        } 

        if (roleList.indexOf(Constants.userRoles.transporter) !== -1) {
           filteredCollectionList.push(transporterObj)
        }

        if (roleList.indexOf(Constants.userRoles.technician) !== -1) {
            filteredCollectionList.push(technicianObj)
        }
        
        if (roleList.indexOf(Constants.userRoles.admin) !== -1) {
            let checkUserRoles = []
            for (var index in filteredCollectionList) {
                let object = filteredCollectionList[index]
                checkUserRoles.push(object.text)
            }
            //check what roles it contains
            if(!(checkUserRoles.indexOf(Constants.homeMenuTitle.transporter) !== -1)) {
                filteredCollectionList.push(transporterObj)
            } 
            if(!(checkUserRoles.indexOf(Constants.homeMenuTitle.technician) !== -1)) {
                filteredCollectionList.push(technicianObj)
            } 
        }
        filteredCollectionList.push(listObj);
        filteredCollectionList.push(siteSurvey);
        filteredCollectionList.push(inventoryManagement);
        filteredCollectionList.push(siteSuveyList);
        filteredCollectionList.push(mapView);

    };

    const signoutHandler = () => {
        Alert.alert(
            "Alert!",
            "Do you want to logout?",
            [
                {
                    text: "No",
                    style: "cancel"
                },
                {
                    text: "Yes",
                    onPress: () => DBManager.logout(navigation)
                }
            ]
        );
    }

    const collectorObj = {
        "text": "Sample\nCollection",
        "icon": SampleCollectionIcon,
        "navigate": Constants.screenName.SampleCollector
    }

    const transporterObj =  {
        "text": "Sample\nTransportation",
        "icon": TransporterIcon,
        "navigate": Constants.screenName.SampleTransporter
    }

    const technicianObj = {
        "text": "Accept\nSample",
        "icon": LabAcceptanceIcon,
        "navigate": Constants.screenName.SampleAcceptance
    }

    const listObj = {
        "text": "Samples\nList",
        "icon": ListIcon,
        "navigate": Constants.screenName.SamplesList
    }

    const siteSurvey = {
        "text": "Site\nSurvey",
        "icon": ListIcon,
        "navigate": Constants.screenName.SiteSurvey
    }

    const inventoryManagement = {
        "text": "Inventory\nManagement",
        "icon": ListIcon,
        "navigate": Constants.screenName.Inventory
    }

    const siteSuveyList = {
        "text": "Site survey List",
        "icon": ListIcon,
        "navigate": Constants.screenName.SiteSurveyList
    }

    const mapView = {
        "text": "Collection\nPoints",
        "icon": ListIcon,
        "navigate": Constants.screenName.collectionPoints
    }

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			padding: 27,
			backgroundColor: '#fff',
			alignItems: 'center',
			justifyContent: 'center',
            fontFamily: "Quicksand"
		},
        listTaskMessage: {
            fontSize: 25,
            textAlign: "center",
            color: Constants.colors.primary
        },
        taskBoxContainer: {
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 30,
            flexWrap: "wrap"
        },
        taskBox: {
            width: "45%",
            height: 140,
            backgroundColor: "#eee",
            margin: 5,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 3
        },
        taskImage: {
            width: 50,
            height: 50
        },
        taskText: {
            fontSize: 14,
            paddingTop: 5,
            textAlign: "center",
            fontWeight: "bold",
            color: Constants.colors.grayColor
        },
        signout: {
            marginTop: 60,
            fontSize: 15,
            color: Constants.colors.grayColor
        }
	});

  
    const renderFinalTaskBoxes = () => {

        var view = []
        // if (filteredCollectionList.length === 0) {
        //     console.log(`count under rednder final boxes=${filteredCollectionList.length}`);
        //     return
        // }
        if (finalRoles === undefined) {
            console.log('object not defined yet')
            return
        }

        for (var index in finalRoles) {
            let role = finalRoles[index]
            console.log(`name wise=${role.text}`);
            view.push(
                <TouchableHighlight 
                    key={10*index + index}
                    style={styles.taskBox}
                    underlayColor="#ddd"
                    onPress={() => {navigation.navigate(role.navigate)}}
                >
                    <>
                        <Image
                            source={role.icon}
                            style={styles.taskImage}
                        />
                        <Text 
                            style={styles.taskText}
                            textBreakStrategy="balanced"
                        >{role.text}</Text>
                    </>
                </TouchableHighlight>
            )
        }
        return view
    }


    const renderTaskBoxes = () => {

        var view = []
        if (rol === undefined) {
            return
        }

        Object.keys(rol).forEach((role, idx) => {
            rol[role].forEach((r, rIdx) => {
                view.push(
                    <TouchableHighlight 
                        key={10*idx + rIdx}
                        style={styles.taskBox}
                        underlayColor="#ddd"
                        onPress={() => {navigation.navigate(r.navigate)}}
                    >
                        <>
                            <Image
                                source={r.icon}
                                style={styles.taskImage}
                            />
                            <Text 
                                style={styles.taskText}
                                textBreakStrategy="balanced"
                            >{r.text}</Text>
                        </>
                    </TouchableHighlight>
                )
            })
        })
        return view
    }
	
	return (
		<View style={styles.container}>
            {inititealization()}
			<Text style={styles.listTaskMessage}>HERE IS A LIST OF TASKS YOU CAN DO ON THE APP</Text>
            <View style={styles.taskBoxContainer}>
                {renderFinalTaskBoxes()}
            </View>
            <TouchableOpacity onPress={signoutHandler}>
              <Text style={styles.signout}>Sign Out</Text>
            </TouchableOpacity>
		</View>
	);
}
