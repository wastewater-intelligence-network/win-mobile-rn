import React, { useState } from 'react';
import {
    View, 
    Text,
    StyleSheet,
    StatusBar,
    TextInput,
    ScrollView
    } from 'react-native';
import Button from '../components/Button';
import SampleTracking from '../../controllers/sample_tracking';


const Inventory = ({navigation}) => {

    const [PPE, setPPE] = useState('');
    const [faceShield, setFaceShield] = useState('');
    const [mask, setMask] = useState('');
    const [pairOfGloves, setPairOfGloves] = useState('');
    const [sanitiserBottles, setSanitiserBottles] = useState('');

    const [iceBoxes, setIceBoxes] = useState('');
    const [icePacks, setIcePacks] = useState('');
    const [noOfBucket, setNoOfBucket] = useState('');
    const [noOfCutter, setNoOfCutter] = useState('');
    const [garbageBags, setGarbageBags] = useState('');
    const [tissuesPapers, setTissuesPapers] = useState('');

    const [ziplockBags, setZiplockBags] = useState('');
    const [noOfBottles, setNoOfBottles] = useState('');
    const [QRStickers, setQRStickers] = useState('');
    const [noOfRopes, setNoOfRopes ] = useState('');

    let placeholderTextColor = "#d3d3d1";

    const submitHandle = () => {
        var sampleTracking = new SampleTracking();
        sampleTracking.inventoryCollected(PPE, faceShield, mask, pairOfGloves, sanitiserBottles, iceBoxes, icePacks, noOfBucket
            ,noOfCutter, garbageBags, tissuesPapers, ziplockBags, noOfBottles, QRStickers, noOfRopes, navigation);
    }

    return(
        
        <ScrollView style={styles.container}>
            <Text style={styles.pageHeading}>Inventory Survey</Text>		
            <View style={styles.headerStyle}>
                <Text style={styles.headerTextStyle}>Sample Collector</Text>
            </View>

                <View>
                        <Text style={styles.titleLabel}>Number of Aprons (PPE)</Text>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Aprons (PPE)"
                                placeholderTextColor={placeholderTextColor}
                                value={PPE}
                                onChangeText={(ppe) => setPPE(ppe) }
                            />
                        </View>
                </View>	

                <View>
                        <Text style={styles.titleLabel}>Number of face shields</Text>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="face shields"
                                placeholderTextColor={placeholderTextColor}
                                value={faceShield}
                                onChangeText={(val) => setFaceShield(val) }
                            />
                        </View>
                </View>	

                <View>
                        <Text style={styles.titleLabel}>Number of masks</Text>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="masks"
                                placeholderTextColor={placeholderTextColor}
                                value={mask}
                                onChangeText={(val) => setMask(val) }
                            />
                        </View>
                </View>	


                <View>
                        <Text style={styles.titleLabel}>Pair of gloves</Text>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Pair of gloves"
                                placeholderTextColor={placeholderTextColor}
                                value={pairOfGloves}
                                onChangeText={(val) => setPairOfGloves(val) }
                            />
                        </View>
                </View>

                <View>
                        <Text style={styles.titleLabel}>Number of sanitiser bottles</Text>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="sanitiser bottles"
                                placeholderTextColor={placeholderTextColor}
                                value={sanitiserBottles}
                                onChangeText={(val) => setSanitiserBottles(val) }
                            />
                        </View>
                </View>

                <View style={styles.headerStyle}>
                <Text style={styles.headerTextStyle}>Team Items</Text>
            </View>

                <View>
                        <Text style={styles.titleLabel}>Number of ice boxes</Text>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="ice boxes"
                                placeholderTextColor={placeholderTextColor}
                                value={iceBoxes}
                                onChangeText={(val) => setIceBoxes(val) }
                            />
                        </View>
                </View>	

                <View>
                        <Text style={styles.titleLabel}>Number of ice packs</Text>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="ice packs"
                                placeholderTextColor={placeholderTextColor}
                                value={icePacks}
                                onChangeText={(val) => setIcePacks(val) }
                            />
                        </View>
                </View>	

                <View>
                        <Text style={styles.titleLabel}>Number of buckets</Text>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="buckets"
                                placeholderTextColor={placeholderTextColor}
                                value={noOfBucket}
                                onChangeText={(val) => setNoOfBucket(val) }
                            />
                        </View>
                </View>	


                <View>
                        <Text style={styles.titleLabel}>Number of cutters</Text>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="cutters"
                                placeholderTextColor={placeholderTextColor}
                                value={noOfCutter}
                                onChangeText={(val) => setNoOfCutter(val) }
                            />
                        </View>
                </View>

                <View>
                        <Text style={styles.titleLabel}>Number of garbage bags</Text>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="garbage bags"
                                placeholderTextColor={placeholderTextColor}
                                value={garbageBags}
                                onChangeText={(val) => setGarbageBags(val) }
                            />
                        </View>
                </View>

                <View>
                        <Text style={styles.titleLabel}>Number of tissue papers</Text>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="tissue papers"
                                placeholderTextColor={placeholderTextColor}
                                value={tissuesPapers}
                                onChangeText={(val) => setTissuesPapers(val) }
                            />
                        </View>
                </View>

                <View style={styles.headerStyle}>
                <Text style={styles.headerTextStyle}>Sample Kit</Text>
            </View>

                <View>
                        <Text style={styles.titleLabel}>Number of ziplock bags</Text>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="ziplock bags"
                                placeholderTextColor={placeholderTextColor}
                                value={ziplockBags}
                                onChangeText={(val) => setZiplockBags(val) }
                            />
                        </View>
                </View>	

                <View>
                        <Text style={styles.titleLabel}>Number of bottles</Text>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="bottles"
                                placeholderTextColor={placeholderTextColor}
                                value={noOfBottles}
                                onChangeText={(val) => setNoOfBottles(val) }
                            />
                        </View>
                </View>	

                <View>
                        <Text style={styles.titleLabel}>Number of QR stickers</Text>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="QR stickers"
                                placeholderTextColor={placeholderTextColor}
                                value={QRStickers}
                                onChangeText={(val) => setQRStickers(val) }
                            />
                        </View>
                </View>	


                <View>
                        <Text style={styles.titleLabel}>Number of ropes</Text>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="ropes"
                                placeholderTextColor={placeholderTextColor}
                                value={noOfRopes}
                                onChangeText={(val) => setNoOfRopes(val) }
                            />
                        </View>
                </View>

             
                <View style={{marginLeft: 20, marginRight:20, marginTop:50, height: 40}}>
                        <Button onPress = {() => submitHandle()}>
                            Submit
                        </Button>
                 </View>
                
        </ScrollView>
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
        height: 30,
        flex: 1,
        padding: 2,
        width: "95%"
    },

    inputView: {
        height: 30,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 5,
        borderColor: "#d3d3d3",
        borderWidth: 1,
        alignItems: "center"
      },

      titleLabel: {
          marginLeft: 30,
          marginTop: 5,
          color: '#003f5c'
      },
      headerStyle: {
        width: '100%', 
        height: 30, 
        backgroundColor:'#756BDE', 
        alignItems:'center', 
        marginTop: 10
      },
      headerTextStyle: {
        margin: 5, 
        color:'#fff'
      }

 });

export default Inventory;