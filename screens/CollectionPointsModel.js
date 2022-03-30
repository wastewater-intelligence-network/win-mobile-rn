import React from 'react';
import {
    Text,
    View
} from 'react-native';
import Util from './Util';
import Constants from './constants';

export default function CollectionPointsModel({collectionRes}) {

    return(
        <View style={{flex:1, alignSelf: 'center'}}>
            <Text></Text>
            <View style={styles.sectionStyle}>
                <Text style={styles.textStyle}>Place:</Text>
                <Text style={styles.textStyle}>{collectionRes.name}</Text>
            </View>
            <View style={styles.sectionStyle}>
                <Text style={styles.textStyle}>PointID:</Text>
                <Text style={styles.textStyle}>{collectionRes.pointId}</Text>
            </View>
            <View style={styles.sectionStyle}>
                <Text style={styles.textStyle}>Type:</Text>
                <Text style={styles.textStyle}>{collectionRes.type}</Text>
            </View>
            <View style={styles.sectionStyle}>
                <Text style={styles.textStyle}>Latitude:</Text>
                <Text style={styles.textStyle}>{'   '+ collectionRes.location.coordinates[0]  }</Text>
            </View>
            <View style={styles.sectionStyle}>
                <Text style={styles.textStyle}>Longitude:</Text>
                <Text style={styles.textStyle}>{'   '+collectionRes.location.coordinates[1]  }</Text>
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
        fontWeight: '500',
        color: Constants.colors.grayColor
    }
};

