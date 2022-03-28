import React, { useState, useRef, useEffect } from "react";
import {
	StyleSheet,
	View,
	Text,
	StatusBar,
	Image,
	TouchableOpacity,
	Dimensions,
	FlatList,
	Alert,
    ToastAndroid
} from "react-native";

import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';

import Icon from 'react-native-vector-icons/Ionicons'
import SampleTracking from '../../controllers/sample_tracking';
import Util from "../Util";
import Spinner from "../Spinner";
import Constants from "../constants";
import WinLogoColor from '../../assets/win_logo_color.png';

const SiteSurveyList = ({ navigation }) => {

    const[dataLoaded, setDataLoaded] = useState(false);
    const [scheduleList, setScheduleList] = useState(false);

    useEffect(() => {
		fetchSchedules();
	}, [])

    const fetchSchedules = () => {
		var sampleTracking = new SampleTracking()
		setDataLoaded(false);
		sampleTracking.getAllPointsSurveyList(Util.getFilteredDate(), navigation)
			.then(data => {
				setScheduleList(data);
				setDataLoaded(true);
			})
	}

	const siteSurveyHandle = (id) => {

		let filterdata = scheduleList.filter((item) => item._id == id).map(({pointId, name, location,type,samplingType }) => ({ pointId, name, location,type,samplingType }));
		let jsonData = filterdata[0];

        var sampleTracking = new SampleTracking()
		setDataLoaded(false)
		sampleTracking.upgradeSurveyPointToCollectionPoint(jsonData.location.coordinates[0], jsonData.location.coordinates[1], jsonData.name, jsonData.pointId, jsonData.type, jsonData.samplingType, navigation)
			.then(data => {
                ToastAndroid.showWithGravity(Constants.alertMessages.collectionAddedSuccessfully, ToastAndroid.SHORT, ToastAndroid.BOTTOM)
				setDataLoaded(true);
			})
	}

	const siteSurveyClickHandle = (id) => {
        Alert.alert(
            "Alert!",
            "Do you want to Update survey point to collection point?",
            [
                {
                    text: "No",
                    style: "cancel"
                },
                {
                    text: "Yes",
                    onPress: () => siteSurveyHandle(id)
                }
            ]
        );
    }

    return(
        <View style={styles.container}>
            <Text style={styles.pageHeading}>Survey Points</Text>	

            { dataLoaded === true  ?
			<View style={styles.container}> 
				{scheduleList.length > 0 ?
					<View style={styles.accordionContainer}>
						 <FlatList
                            style={{marginTop: 0}}
                            data={scheduleList}
                            keyExtractor={item=>item._id}
                            renderItem={({item})=> {
                                return(         
                                       <View style={styles.listViewContainer}> 
									             <View style={styles.sectionStyle}>                        
                                                	 <Text style={styles.headerTitle}>{item.name}</Text>
													 <TouchableOpacity
													 	onPress={()=>siteSurveyClickHandle(item._id) }
													 >
														 <Icon name="add-circle-outline" size={30} color="green" />
													 </TouchableOpacity>
											 	</View>
                                                 <Text></Text>

                                                <View style={styles.sectionStyle}>
                                                      <Text style={styles.textStyle}>Point ID:</Text>
                                                      <Text style={styles.textStyle}>{item.pointId}</Text>
                                                </View>
                                                <View style={styles.sectionStyle}>
                                                      <Text style={styles.textStyle}>Name:</Text>
                                                      <Text style={styles.textStyle}>{item.name}</Text>
                                                </View>
                                                <View style={styles.sectionStyle}>
                                                      <Text style={styles.textStyle}>Latitude:</Text>
                                                      <Text style={styles.textStyle}>{item.location.coordinates[0]}</Text>
                                                </View>
                                                <View style={styles.sectionStyle}>
                                                      <Text style={styles.textStyle}>Longitude:</Text>
                                                      <Text style={styles.textStyle}>{item.location.coordinates[1]}</Text>
                                                </View>
                                                <View style={styles.sectionStyle}>
                                                      <Text style={styles.textStyle}>Type:</Text>
                                                      <Text style={styles.textStyle}>{item.type}</Text>
                                                </View>
												<View style={styles.sectionStyle}>
                                                      <Text style={styles.textStyle}>Sampling Type:</Text>
                                                      <Text style={styles.textStyle}>{item.samplingType}</Text>
                                                </View>
                                        </View>
                                );
                                     }            
                                  }
                      />
					</View> 
				:
					<View style={styles.messageContainerStyle}>
						<Text>No data found</Text>
					</View>
				}			
			</View>
			: 
			<View style={styles.messageContainerStyle}>
					<Spinner/>
			 </View>
			
			}
        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        marginTop:StatusBar.currentHeight,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        flex:1
    },

	winLogo: {
		width: 20,
		height: 20,
	},

    pageHeading: {
		fontSize: 25,
		fontWeight: "bold",
		marginTop: 40,
		marginBottom: 8,
		fontFamily: "Quicksand",
		color: "#756BDE"
	},

    accordionContainer: {
		width: '100%',
		padding: 20
	},

    listViewContainer: {
        marginTop: 10,
		borderWidth: 1,
		borderColor: '#a1a1a1',
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5,
        width: '70%',
        alignSelf:'center',
        padding: 5
    },
    headerTitle: {
		fontSize: 23,
		fontWeight: '100',
		fontFamily: "Quicksand",
		color: Constants.colors.grayColor,
	},
	headerTime: {
		fontSize: 17,
		fontFamily: "QuicksandBold",
		color: Constants.colors.grayColor
	},
    sectionStyle: {
        flexDirection: 'row',
        justifyContent:'space-between'
    },
    textStyle: {
        fontWeight: '400',
        color: Constants.colors.black
    }
});


export default SiteSurveyList;