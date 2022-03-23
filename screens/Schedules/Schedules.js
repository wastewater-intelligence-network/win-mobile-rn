import React, { useState, useRef, useEffect } from "react";
import {
	StyleSheet,
	View,
	Text,
	StatusBar,
	Image,
	TouchableOpacity,
	Dimensions,
	FlatList
} from "react-native";

import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';


import SampleTracking from '../../controllers/sample_tracking';
import Util from "../Util";
import Spinner from "../Spinner";


const Schedules = ({ navigation }) => {

    const[dataLoaded, setDataLoaded] = useState(false);
    const [scheduleList, setScheduleList] = useState(false);

    useEffect(() => {
		fetchSchedules();
	}, [])

    const fetchSchedules = () => {
		var sampleTracking = new SampleTracking()
		setDataLoaded(false);
		sampleTracking.getSchedules(Util.getFilteredDate(), navigation)
			.then(data => {
				setScheduleList(data)
                console.log(`++++fetch data=${data}`);
				setDataLoaded(true)
			})
	}

    const renderBody = (item) => {
		return (
			<View style={styles.accordionBody}>
                <Text>Hello I am on details</Text>
				{/* {renderBody
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
				</View> */}
			</View>
		);
	}

    const renderHeader = (item) => {
		
        return (
			<View
				style={ styles.accordionHeader }
			>
				<View
					style={styles.accordionHeaderLeftContainer}
				>
					<Text
						style={styles.accordionHeaderTitle}
					>
						{item.longitude}
					</Text>
					<Text style={styles.accordionHeaderTime}>
						 {item.time} 
					</Text>
				</View>

				{/* <View
					style={{ backgroundColor: statusRes.color, ...styles.accordionHeaderRightContainer }}
				>
					<Image
						source={statusRes.icon}
						style={styles.accordionHeaderStatusImg}
					/>
					<Text style={styles.accordionHeaderStatusText}>{statusRes.short}</Text>
				</View> */}

			</View>
		);
	}

    return(
        <View style={styles.container}>
            <Text style={styles.pageHeading}>Schedules</Text>	

            { dataLoaded === true  ?
			<View style={styles.container}> 
				{scheduleList.length > 0 ?
					<View style={styles.accordionContainer}>
						<AccordionList
							style={styles.accordionList}
							list={scheduleList}
							header={renderHeader}
							body={renderBody}
							keyExtractor={item => item.longitude}
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
        marginTop: StatusBar.currentHeight,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
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

    accordionList: {
		marginBottom: 105
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
});

export default Schedules;