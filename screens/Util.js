import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "./constants";

export default class Util {

    static getCurrentDate() {
            var dateObj = new Date();
            var date = dateObj.getDate();
            var month = dateObj.getMonth() + 1;
            var year = dateObj.getFullYear();
            return year + '-' + month + '-' + date;//format: dd-mm-yyyy;
    }

    static getCurrentTimeStamp() {
        return Math.floor(Date.now() / 1000)
    }

    // static isValidSession(navigation) {
    //     Realm.open({
    //         schema: [{name: 'UserDetails', properties: {token: 'string', expiryTime: 'string', roles:'string[]'}}]
    //         }).then(realm => {
    //         let objects = realm.objects('UserDetails');
    //         if (objects.length > 0) {
    //             console.log(`fetch roles=${objects[0].roles}`);
    //             navigation.navigate('Home', objects[0].roles);
    //         } 
    //     });

    //    /* AsyncStorage.getItem(Constants.storageKey.token)
    //     .then(token => {
    //         AsyncStorage.getItem(Constants.storageKey.timestamp)
    //             .then(timestamp => {
    //                     console.log(`${Constants.debugDesc.text} got token=${token} `)
    //                     console.log(`${Constants.debugDesc.text} server timestamp=${timestamp} `)
    //                         let serverTimeStamp = parseInt (timestamp)
    //                         let currentMobileTimeStamp = Util.getCurrentTimeStamp()
    //                         console.log(`${Constants.debugDesc.text} Server time stamp=${serverTimeStamp}`);
    //                         console.log(`${Constants.debugDesc.text} Mobile time stamp=${currentMobileTimeStamp}`);
    //                         if (serverTimeStamp > currentMobileTimeStamp) {
    //                             console.log(`${Constants.debugDesc.text} comes under resolve pass`);
    //                             navigation.navigate('Home', ["collector","admin"]);
    //                         } else {
    //                             console.log(`${Constants.debugDesc.text} comes under reject fail`)
    //                            return false
    //                         }

    //         }).catch(() =>{
    //             console.log('coming here really1!!!')
    //         })
    //     })
    //     .catch(() =>{
    //         console.log('coming here really2!!!')

    //     })*/
    // }



}