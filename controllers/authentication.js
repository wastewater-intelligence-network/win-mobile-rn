//import * as SecureStore from 'expo-secure-store';
import AsyncStorage  from '@react-native-async-storage/async-storage';
import base64 from 'react-native-base64';

import Fetch from './fetch';
import Constants from '../screens/constants';
import Util from '../screens/Util';
import DBManager from '../screens/DBManager';
import Realm from 'realm';

export default class Authentication {
    login(username, password) {
        let headers = {
            'Authorization': 'Basic ' + base64.encode(username + ':' + password)
        }
		
        return new Promise((resolve, reject) => {
            Fetch(
                '/login',
                {
                    method: 'GET',
                    headers: headers
                }
            )
                .then(res => res.json())
                .then(res => {
                    if(res.token) {
                        let timestamp = res.tokenExpiryTimestamp;
                        DBManager.saveInLocalDB(res.token, timestamp.toString());
                        AsyncStorage.setItem(Constants.storageKey.token, res.token)
                       // SecureStore.setItemAsync(Constants.storageKey.token, res.token)
                        AsyncStorage.setItem(Constants.storageKey.timestamp, timestamp.toString());
                       // SecureStore.setItemAsync(Constants.storageKey.timestamp, timestamp.toString())
                        //need to set time stamp from server
                        console.log('+++come in response');
                        console.log(`token expiry = ${res.tokenExpiryTimestamp}`)
                        console.log(`${Constants.debugDesc.text} got json login with data ${res}`)
                        console.log(`${Constants.debugDesc.text} josn is =${JSON.stringify(res)}`)
                        let json = res;
                        console.log(`${Constants.debugDesc.text} JSON ${res.roles}`);

                        resolve(json);
                        // ToastAndroid.showWithGravity("Login Successful", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
                        // navigation.navigate('Home')
                    } else {
                        console.log(`${Constants.debugDesc.text} Not getting toen but success in json response `)
                        resolve(false)
                        // ToastAndroid.show("Could not login. Please check your username and password", ToastAndroid.LONG)
                    }
                })
                .catch(reject => {
                    console.log(`${Constants.debugDesc.text} coming in json parsing catch part `)
                    resolve(false);
                })
                .catch((reject) =>{
                    console.log(`${Constants.debugDesc.text} coming in outer catch of fetch `)
                })
                
                
        })
    }
    

    isSessionActive() {
        return new Promise((resolve, reject) => { 
            AsyncStorage.getItem('token')
                .then(token => {
                    if(token) {
                        resolve(true)
                    }
                    resolve(false) //set to true earlier it was false
                })
                .catch(reject)
        })
    }


    getNewSessionToken(resource) {

        return new Promise((resolve, reject) => {
            Realm.open({
                schema: [DBManager.schema]
                }).then(realm => {
                let objects = realm.objects(Constants.schemaName.UserDetails);
                console.log('coming here in get session block');
                if (objects.length > 0) {
                  let token = objects[0].token;
                  if(token && resource != Constants.endPoints.login) {
                    let serverTimeStamp = parseInt (objects[0].expiryTime)
                    let currentMobileTimeStamp = Util.getCurrentTimeStamp()
                    console.log(`${Constants.debugDesc.text} Server time stamp=${serverTimeStamp}`);
                    console.log(`${Constants.debugDesc.text} Mobile time stamp=${currentMobileTimeStamp}`);
                    if (serverTimeStamp > currentMobileTimeStamp) {
                        console.log(`${Constants.debugDesc.text} comes under resolve`);
                        resolve(token)
                    } else {
                        console.log(`${Constants.debugDesc.text} comes under reject`)
                         // need to update DB or clear DB
                        DBManager.clearLocalDB();
                        resolve(undefined)
                    }
                }
             } else if (resource === Constants.endPoints.login) {
                console.log('come here in condition++++');
                resolve(undefined)
            }
            });
        });
    }

    getSessionToken(resource) {
        return new Promise((resolve, reject) => { 
            AsyncStorage.getItem(Constants.storageKey.token)
                .then(token => {
                    console.log(`token=${token}`);
                    //find expiry time 
                    AsyncStorage.getItem(Constants.storageKey.timestamp)
                        .then(timestamp => {
                                console.log(`${Constants.debugDesc.text} got token=${token} `)
                                console.log(`${Constants.debugDesc.text} server timestamp=${timestamp} `)
                                if(token && resource != Constants.endPoints.login) {
                                    let serverTimeStamp = parseInt (timestamp)
                                    let currentMobileTimeStamp = Util.getCurrentTimeStamp()
                                    console.log(`${Constants.debugDesc.text} Server time stamp=${serverTimeStamp}`);
                                    console.log(`${Constants.debugDesc.text} Mobile time stamp=${currentMobileTimeStamp}`);

                                    if (serverTimeStamp > currentMobileTimeStamp) {
                                        console.log(`${Constants.debugDesc.text} comes under resolve`);
                                        resolve(token)
                                    } else {
                                        console.log(`${Constants.debugDesc.text} comes under reject`)
                                        resolve(undefined)
                                    }
                                }
                                if (resource === Constants.endPoints.login) {
                                    resolve(undefined)
                                }

                    }).catch(() =>{
                        console.log('coming here really!!!')
                        reject();
                    })
                })
                .catch(reject)
        })
    }
}