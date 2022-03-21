import React, { useState, useEffect } from 'react';
import {
    View, 
    Text,
    StyleSheet,
    StatusBar,
    TextInput,
    PermissionsAndroid
    } from 'react-native';
import Button from '../components/Button';
import {Picker} from '@react-native-picker/picker';
import Geolocation from '@react-native-community/geolocation';

const SiteSurvey = ({navigation}) => {

    const [location, setLocation] = useState('');
    const [samplingSite, setsamplingSite] = useState('');
    const [siteID, setSiteID] = useState('');
    const [selectedSamplingSite, setSelectedSamplingSite] = useState('');
    const [preferredTypes, setPreferredTypes] = useState('');
    let placeholderTextColor = "#d3d3d1";

    const submitHandle = () => {
        
        console.log(`location=${location} sampling site=${samplingSite} site id=${siteID} Site type=${selectedSamplingSite} preferred type=${preferredTypes}`);
        alert('Submit button clicked!!need to integerate API')
    };

    const requestLocationPermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: "WinMobile App Location Permission",
              message: "WinMobile App needs access to your location ",
              buttonPositive: "OK"
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getLocation();
          } else {
            requestLocationPermission();
          }
        } catch (err) {
          console.warn(err);
        }
      };

      const getLocation = () => {
            Geolocation.getCurrentPosition((data) =>{
                let lat_long = 'lat ' +data.coords.latitude + ',long ' + data.coords.longitude
                setLocation(lat_long);               
            })
         };

    useEffect(() => {
        requestLocationPermission();
      }, []);

    return(
        <View style={styles.container}>
            <Text style={styles.pageHeading}>Site Survey</Text>		

                <View>
                        <Text style={styles.titleLabel}>Location</Text>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Location"                               
                                value={location}
                                onChangeText={(location) => setLocation(location.substr(0, 15)) }
                                editable={false}
                            />
                        </View>
                </View>	

                <View>
                        <Text style={styles.titleLabel}>Sampling Site Name</Text>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Sampling site"
                                value={samplingSite}
                                onChangeText={(site) => setsamplingSite(site.substr(0, 15)) }
                            />
                        </View>
                </View>	

                <View>
                        <Text style={styles.titleLabel}>Sampling Site(ID)</Text>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Site ID"
                                value={siteID}
                                onChangeText={(sID) => setSiteID(sID.substr(0, 15)) }
                            />
                        </View>
                </View>	


                <View>
                        <Text style={styles.titleLabel}>Sampling Site Types</Text>
                        <View style={styles.inputView}>
                            <Picker
                                style={styles.pickerStyle}
                                selectedValue={selectedSamplingSite}
                                onValueChange={(itemValue, itemIndex) =>
                                    setSelectedSamplingSite(itemValue)
                                }>
                                <Picker.Item label="Select Sampling site Types" value="" />
                                <Picker.Item label="STP" value="STP" />
                                <Picker.Item label="SPS" value="SPS" />
                                <Picker.Item label="Manhole" value="Manhole" />
                            </Picker>
                        </View>
                </View>

                <View>
                        <Text style={styles.titleLabel}>Prefered Types</Text>
                        <View style={styles.inputView}>
                            <Picker
                                style={styles.pickerStyle}
                                selectedValue={preferredTypes}
                                onValueChange={(itemValue, itemIndex) =>
                                    setPreferredTypes(itemValue)
                                }>
                                <Picker.Item label="Select Prefered Types" value="" />
                                <Picker.Item label="dip sampling" value="dip sampling" />
                                <Picker.Item label="laddle sampling" value="laddle sampling" />
                                <Picker.Item label="mechanised sampling" value="mechanised sampling" />
                            </Picker>
                        </View>
                </View>

                <View style={{marginLeft: 20, marginRight:20, marginTop:50, height: 40}}>
                        <Button onPress = {() => submitHandle()}>
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

    pickerStyle: {
        width: '100%',
        marginTop: -5 
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

      titleLabel: {
        marginLeft: 30,
        marginTop: 10,
        color: '#003f5c'
    },

 });

export default SiteSurvey;