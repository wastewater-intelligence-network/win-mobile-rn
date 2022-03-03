import React from 'react';
import {
    Text,
    View
} from 'react-native';
import Util from './Util';

export default function LabDetails({labResponse}) {

    return(
        <View style={{flex:1, alignSelf: 'center'}}>
            <Text></Text>
            <View style={styles.sectionStyle}>
                <Text style={styles.textStyle}>Place:</Text>
                <Text style={styles.textStyle}>{labResponse.sample.sampleCollectionLocation.name}</Text>
            </View>
            <View style={styles.sectionStyle}>
                <Text style={styles.textStyle}>SampleID:</Text>
                <Text style={styles.textStyle}>{labResponse.sample.sampleId}</Text>
            </View>
            <View style={styles.sectionStyle}>
                <Text style={styles.textStyle}>ContainerID:</Text>
                <Text style={styles.textStyle}>{labResponse.sample.containerId}</Text>
            </View>
            <View style={styles.sectionStyle}>
                <Text style={styles.textStyle}>LocationID:</Text>
                <Text style={styles.textStyle}>{labResponse.sample.sampleCollectionLocation.pointId}</Text>
            </View>
            <View style={styles.sectionStyle}>
                <Text style={styles.textStyle}>Type:</Text>
                <Text style={styles.textStyle} >{labResponse.sample.sampleCollectionLocation.location.type}</Text>
            </View>
            <View style={styles.sectionStyle}>
                <Text style={styles.textStyle}>Sample Collected:</Text>
                <Text style={styles.textStyle}>{Util.showDateAndTime(labResponse.sample.statusLog, 0)}</Text>
            </View>
            <View style={styles.sectionStyle}>
                <Text style={styles.textStyle}>Sample Transmitted:</Text>
                <Text style={styles.textStyle}>{Util.showDateAndTime(labResponse.sample.statusLog, 1)}</Text>
            </View>
        </View>
    );
};

const styles = {
    sectionStyle: {
        flexDirection: 'row',
        justifyContent:'space-between'
    },
    textStyle: {
        fontWeight: '500'
    }
};

