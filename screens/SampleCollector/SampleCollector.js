import React, { useState, useEffect } from 'react';
import {
	Text, 
	View, 
	StyleSheet, 
	Button, 
	Dimensions,
	Alert,
	ActivityIndicator,
	TextInput,
	TouchableHighlight,
	ToastAndroid,
    PermissionsAndroid

} from 'react-native';

//Location and bar code scnner package will come here
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { Overlay } from 'react-native-elements';

import Geolocation from '@react-native-community/geolocation';
import Constants from '../constants';
import WinCustomAlert from '../WinCustomAlert';
import SampleTracking from '../../controllers/sample_tracking';
import BarcodeMask from 'react-native-barcode-mask';
import DBManager from '../DBManager';
import Util from '../Util';

export default function SampleCollector({ navigation }) {

    const [latitude, setLatitude] = useState(0);
    const [longitude, setlongitude] = useState();
    const [locationAccessed, setLocationAccessed] = useState(false)

    const [location, setLocation] = useState(undefined);
    const [sampleDataOverlayVisible, setSampleDataOverlayVisible] = useState(false);
    const [listOverlayVisible, setListOverlayVisible] = useState(false);
    const [locationPermissionVisible, setLocationPermissionVisible] = useState(false);
    const [scanned, setScanned] = useState(true);
    const [qrData, setQrData] = useState(undefined);
    const [collectionPointList, setCollectionPointList] = useState(undefined);



    const [phValue, setPhValue] = useState(undefined)
	const [temperatureValue, setTemparatureValue] = useState(undefined)
  	const [inflowValue, setInflowValue] = useState(undefined)

    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
	const [showErrPopup, setShowErrPopup] = useState(false);
	const [serverMessage, setServerMessage] = useState('');

	const [reactiveQR, setReactiveQR] = useState(true);
	const [scanner, setScanner] = useState(null);

    const handleSampleDataSubmit = (pointId) => {
    console.log(`${Constants.debugDesc.text} handle additional data with point id=${pointId}`);
  
      if(sampleDataOverlayVisible) {
        toggleOverlay('sampleDataOverlay')
      }
  
      let additionalData
      
      if(phValue !== undefined || temperatureValue !== undefined || inflowValue !== undefined) {
        additionalData = {
          'ph': phValue,
          'temperature': temperatureValue,
          'inflow': inflowValue
        }
      }
	  
      console.log(`${Constants.debugDesc.text} after adding additional = ${additionalData} qrcode=${qrData}`);
      
      var s = new SampleTracking()
      console.log(`location=${location.coords}`);
      s.sampleCollected(location, qrData, pointId, additionalData, navigation)
        .then((res) => {
          console.log(`${Constants.debugDesc.text} response after adding = ${res} with status=${res.status}`);
          if(res.status === 501) {
            setCollectionPointList(res.list)
            toggleOverlay('listOverlay')
            return
          } else if(res.status !== 200) {
			setServerMessage(res.message)
            setShowErrPopup(true);
          } else {
			setServerMessage(res.message)
            setShowSuccessPopup(true)
          }
        })
        .catch(err => console.log(err))
    }

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
            console.log("You can use the location");
            getLocation();
          } else {
            console.log("Location permission denied");
            requestLocationPermission();
          }
        } catch (err) {
          console.warn(err);
        }
      };
    
    const getLocation = () => {
        Geolocation.getCurrentPosition((data) =>{
                console.log(`get location long=${data.coords.longitude}`);
                console.log(`get location lat=${data.coords.latitude}`);
                setLatitude(data.coords.latitude);
                setLocation(data);
                setLocationAccessed(true)
                setScanned(false)
        })
    };

    onSuccess = e => {
      console.log(`capture data=${e.data}`);
      setScanned(true)
	  setQrData(e.data)

	  if (Util.isValidQRScan(e.data)) {
		setReactiveQR(false)
		toggleOverlay('sampleDataOverlay')
	  } else {
		// setServerMessage(Constants.alertMessages.invalidQRCode)
		// setShowErrPopup(true);
		ToastAndroid.showWithGravity(Constants.alertMessages.invalidQRCode, ToastAndroid.SHORT, ToastAndroid.BOTTOM)
		setTimeout(function(){
			scanner.reactivate();
		}, 3000);
		setScanned(false);
		setReactiveQR(false);
	  }
	  
   }

   const toggleOverlay = (overlay) => {
      if(overlay === 'locationPermissionOverlay') {
        setLocationPermissionVisible(!locationPermissionVisible)
      } else if(overlay === 'sampleDataOverlay') {
        console.log(`coming here and set value =${sampleDataOverlayVisible}`);
        setSampleDataOverlayVisible(!sampleDataOverlayVisible)
      } else if(overlay === 'listOverlay') {
        setListOverlayVisible(!listOverlayVisible)
      }
	};

  const saveToDB = () => {
		setScanned(true) 
		navigation.goBack();
	}

  const errorAction = () => {
		setScanned(false);
		navigation.goBack();
	}

  const renderCollectionPointList = () => {
		if(collectionPointList !== undefined) {
			let list = []
			collectionPointList.forEach((point, idx) => {
				list.push(
					<TouchableHighlight
						key={idx}
						style={styles.pointListItemContainer}
						underlayColor={Constants.colors.primaryDark}
						onPress={() => {
							handleSampleDataSubmit(point.pointId)
							toggleOverlay('listOverlay')
						}}	
					>
						<Text 
							key={idx}
							style={styles.pointListItem}
						>
							{point.name}
						</Text>
					</TouchableHighlight>
				)
			})
			return list
		}
		
	}

    useEffect(() => {
      requestLocationPermission();
    }, []);


    return(
        <View style= {{flex: 1, backgroundColor: 'black'}}>
            <Text>Sample collector page {latitude}</Text>
            { locationAccessed == true ? <QRCodeScanner reactivate = {reactiveQR} onRead={scanned ? undefined : onSuccess} style={{ height: "100%", width: Dimensions.get('window').width}} ref={(node) => { setScanner(node) }}/>: undefined}
            { locationAccessed == true? <BarcodeMask width={300} height={300} showAnimatedLine={false} outerMaskOpacity={0.9}/>: undefined }

          <Overlay isVisible={location === undefined}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Getting your location</Text>
		  </Overlay>

         	 <Overlay
				 	style={styles.sampleDataOverlay}
					isVisible={sampleDataOverlayVisible} 
					onBackdropPress={() => {toggleOverlay('sampleDataOverlay'); setScanned(false)}}
		       >
					<Text style={styles.sampleDataHeading}>Additional Data</Text>
					<Text style={{color: 'green',fontWeight:'500', alignSelf: 'center'}}>Scanned QR Code: {qrData}</Text>
					<TextInput
						style={styles.sampleDataInput}
						placeholder='pH Value'
						selectionColor="#756BDE"
						autoCapitalize='none'
						keyboardType='decimal-pad'
						onChangeText={setPhValue}
					/>
					<TextInput
						style={styles.sampleDataInput}
						placeholder='Temperature'
						selectionColor="#756BDE"
						autoCapitalize='none'
						keyboardType='decimal-pad'
						onChangeText={setTemparatureValue}
					/>
					<TextInput
						style={styles.sampleDataInput}
						placeholder='Inflow'
						selectionColor="#756BDE"
						autoCapitalize='none'
						keyboardType='decimal-pad'
						onChangeText={setInflowValue}
					/>
					<TouchableHighlight 
						style={styles.button}
						underlayColor={Constants.colors.primaryDark}
						onPress={() => {handleSampleDataSubmit(undefined)}}
					>
					<Text style={styles.buttonText}>Submit</Text>
					</TouchableHighlight>
			</Overlay>

       			 <Overlay
				 	style={styles.sampleDataOverlay}
					isVisible={listOverlayVisible} 
					onBackdropPress={() => {toggleOverlay('listOverlay'); setScanned(false)}}
				 >
					<Text style={styles.pointListHeading}>Multiple collection points nearby. Please pick one</Text>
					{renderCollectionPointList()}
				</Overlay>

     			   <WinCustomAlert
						displayMode={'success'}
						displayMsg={serverMessage}
						visibility={showSuccessPopup}
						dismissAlert={setShowSuccessPopup}
						onPressHandler = {() => saveToDB()}
					/>
					<WinCustomAlert
						displayMode={'failed'}
						displayMsg={serverMessage}
						visibility={showErrPopup}
						dismissAlert={setShowErrPopup}
						onPressHandler = {() => errorAction() }
					/>
        </View>
    );
};

const styles = StyleSheet.create({

  container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	maintext: {
		fontSize: 16,
		margin: 20,
		zIndex: 4,
	},
	barcodebox: {
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'hidden',
	},
	againbutton: {
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: 3,
		marginTop: -300,
		paddingBottom: 0
	},
	result: {
		paddingHorizontal: 50,
		paddingVertical: 20   
	},
	sampleDataOverlay: {
		padding: 20
	},
	sampleDataHeading: {
		fontSize: 20,
		paddingHorizontal: 30
	},
	sampleDataInput: {
		margin: 5,
		padding: 10,
		backgroundColor: '#eee'
	},
	button: {
		marginVertical: 5,
		alignItems: "center",
		backgroundColor: "#756BDE",
		padding: 10
	},
	buttonText: {
		fontSize: 15,
		fontWeight: 'bold',
		color: "#fff",
	},
	pointListHeading: {
		fontSize: 18,
		fontWeight: 'bold',
		marginVertical: 10
	},
	pointListItemContainer: {
		backgroundColor: Constants.colors.primary,
		marginVertical: 10
	},
	pointListItem: {
		fontSize: 14,
		padding: 15,
		color: '#fff'
	}

});