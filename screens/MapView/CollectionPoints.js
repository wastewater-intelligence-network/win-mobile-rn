
import React, { useEffect, useState, useRef } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import MapboxGL from "@react-native-mapbox-gl/maps";
import SampleTracking from '../../controllers/sample_tracking';
import Spinner from "../Spinner";
import Util from "../Util";
import WinCustomAlert from "../WinCustomAlert";
import Constants from "../constants";


const HackMarker = ({ children }) =>
    Platform.select({
        ios: children,
        android: (
            <Text
                style={{
                    lineHeight: 88, // there is some weird gap, add 40+ pixels
                    backgroundColor: 'red',
                }}>
                {children}
            </Text>
        ),
    })


MapboxGL.setAccessToken('pk.eyJ1Ijoid2lubml1YSIsImEiOiJjbDBrbWFhdTEwbTczM2Nwd21nODdzZGhpIn0.7j_9ryv199IqfNbkcGSlrw');

export default CollectionPoints = ({ route, navigation }) => {

  const[dataLoaded, setDataLoaded] = useState(false);
  const [collectionPointList, setCollectionPointList] = useState(false);
  const [lat, setLat] = useState(0.0);
  const [long, setLong] = useState(0.0);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  let collectionPoint1 = {};
  const[collectionPoint, setCollectionPoint] = useState(undefined);

  const isFirstRender = useRef(true);

  useEffect(() => {

    if (isFirstRender.current) {
      fetchCollectionPoints();
      isFirstRender.current = false 
      return;
    }
    //get the data
    let firstObj = collectionPointList[0];
    setLat(firstObj.location.coordinates[0]);
    setLong(firstObj.location.coordinates[1]);
  }, [collectionPointList])

const fetchCollectionPoints = () => {
  var sampleTracking = new SampleTracking()
  setDataLoaded(false);
  sampleTracking.getAllCollectionPoints(Util.getFilteredDate(), navigation)
    .then(data => {
      setCollectionPointList(data);
      setDataLoaded(true);
    })
}

 const renderAnnotationsiteration = () => {
    const items = [];

    for (let i = 0; i < collectionPointList.length; i++) {
      items.push(renderAnnotation(i));
    }
    return items;
  };

  const didSelectAnnotation = () => {
    console.log('annotation clicked called');

  }

  const getSpecifiedData = (value) => {
    console.log('selected value', value.properties.id);
    //filter data from list and display that in popup 
    let filterdata = collectionPointList.filter((item) => item._id == value.properties.id).map(({pointId, name, location,type }) => ({ pointId, name, location,type }));
		let jsonData = filterdata[0];
    collectionPoint1 = jsonData;
    console.log('Filtered mapped data', jsonData);
    console.log('collection poins', collectionPoint1);

    setCollectionPoint(jsonData)
    setShowSuccessPopup(true);
    
  }

  const renderAnnotation = (counter) => {
    const collectionPoint = collectionPointList[counter];
    const co_ordinate = [collectionPoint.location.coordinates[0], collectionPoint.location.coordinates[1]]
    return (

      <MapboxGL.PointAnnotation
        key={collectionPoint._id}
        id={collectionPoint._id}
        
        coordinate={co_ordinate}
        onSelected = {(value) => getSpecifiedData(value)}
        >
        <View style={{
                  height: 20, 
                  width: 20, 
                  backgroundColor: 'red', 
                  borderRadius: 10, 
                  borderColor: '#fff', 
                  borderWidth: 3
                }} 
        />

         {/* <Image
              source={markerImage}
              style={{
                 flex: 1,
                resizeMode: 'contain',
                width: 35,
                height: 35
           }}/> */}

      {/* <View>
         <Text >
           {<Image source={markerImage} style={{width: 30, height: 30}}/>}
        </Text>
      </View> */}

      </MapboxGL.PointAnnotation>
    );
  }

  return (
    <View style={{flex: 1, height: "100%", width: "100%" }}>
      <Text style={styles.pageHeading}>Collection Points</Text>	
      { dataLoaded == true ?
      <MapboxGL.MapView
        styleURL={MapboxGL.StyleURL.Street}
        zoomLevel={11}
        centerCoordinate={[lat, long]}
        style={{flex: 1}}>
          <MapboxGL.Camera
            zoomLevel={11}
            centerCoordinate={[lat, long]}
            animationMode={'flyTo'}
            animationDuration={0}
          >
          </MapboxGL.Camera>
           {renderAnnotationsiteration()} 
      </MapboxGL.MapView>
    :
    <Spinner />
}

        <WinCustomAlert
						displayMode={'success'}
						displayMsg={''}
						visibility={showSuccessPopup}
						dismissAlert={setShowSuccessPopup}
						onPressHandler = {() => console.log('clciked')}
						calculatedHeight = {220}
            collectionPoints={collectionPoint}

					/>

    </View>
  )
}


const styles = StyleSheet.create({
  pageHeading: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
    fontFamily: "Quicksand",
    color: "#756BDE",
    alignSelf: 'center'
  }
});





