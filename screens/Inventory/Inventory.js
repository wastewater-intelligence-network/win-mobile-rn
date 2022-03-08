import React, { useState } from 'react';
import {
    View, 
    Text,
    StyleSheet,
    StatusBar,
    TextInput
    } from 'react-native';
import Button from '../components/Button';


const Inventory = ({navigation}) => {

    const [location, setLocation] = useState('');
    const [area, setArea] = useState('');
    const [temp, setTemp] = useState('');

    return(
        <View style={styles.container}>
            <Text style={styles.pageHeading}>Inventory Survey</Text>		

                <View>
                        <Text style={{ marginLeft:30, marginTop: 20 }}>Location</Text>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="New Delhi"
                                placeholderTextColor="#003f5c"
                                value={location}
                                onChangeText={(location) => setLocation(location.substr(0, 15)) }
                            />
                        </View>
                </View>	

                <View>
                        <Text style={{ marginLeft:30, marginTop: 20 }}>Area</Text>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Sector B"
                                placeholderTextColor="#003f5c"
                                value={area}
                                onChangeText={(location) => setArea(area.substr(0, 15)) }
                            />
                        </View>
                </View>	

                <View>
                        <Text style={{ marginLeft:30, marginTop: 20 }}>Temperature</Text>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="10 C"
                                placeholderTextColor="#003f5c"
                                value={temp}
                                onChangeText={(temp) => setTemp(temp.substr(0, 15)) }
                            />
                        </View>
                </View>	


                <View>
                        <Text style={{ marginLeft:30, marginTop: 20 }}>Other Info</Text>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Other Info"
                                placeholderTextColor="#003f5c"
                                value={location}
                                onChangeText={(location) => setLocation(location.substr(0, 15)) }
                            />
                        </View>
                </View>


                <View style={{marginLeft: 20, marginRight:20, marginTop:50, height: 40}}>
                        <Button onPress = {() => navigation.goBack()}>
                            Submit
                        </Button>
                 </View>
                
        </View>
    );
}


const styles = StyleSheet.create({
	container: {
		marginTop: StatusBar.currentHeight,
        flex: 1
	},

    pageHeading: {
		fontSize: 25,
		fontWeight: "bold",
		marginTop: 0,
		marginBottom: 8,
		fontFamily: "Quicksand",
		color: "#756BDE",
        alignSelf: 'center'
	},
    TextInput: {
        height: 45,
        flex: 1,
        padding: 2,
        //marginLeft: 20,
        width: "95%",
    },

    inputView: {
        height: 45,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 5,
        borderColor: "#d3d3d3",
        borderWidth: 1,
        alignItems: "center"
      },

      containerOfTwoText: {
        justifyContent: 'space-between',
        flexDirection:'row'
      },
      inputViewLeft: {
        height: 45,
        width: "40%",
        marginLeft: 30,
        marginRight: 5,
        marginTop: 5,
        borderColor: "#d3d3d3",
        borderWidth: 1,
        alignItems: "center",
      },

      inputViewRight: {
        height: 45,
        width: "40%",
        marginLeft: 5,
        marginRight: 30,
        marginTop: 5,
        borderColor: "#d3d3d3",
        borderWidth: 1,
        alignItems: "center",
      },


 });

export default Inventory;