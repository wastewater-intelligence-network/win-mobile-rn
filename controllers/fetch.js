import Authentication from "./authentication"

const WIN_API_ENDPOINT = 'https://win.niua.org:8081'//'http://192.168.0.105:8080'

import Constants from '../screens/constants';
import { Alert } from 'react-native';

export default function Fetch(resource, init, navigation) {
    var auth = new Authentication()
    return new Promise((resolve, reject) => {
        auth.getNewSessionToken(resource).then(token => {
            console.log(`got token from DB if exists= ${token}`);
            if (token === undefined && resource !== Constants.endPoints.login) {
                console.log(`${Constants.debugDesc.text} coming inside invalid token or time stamp `);
                Alert.alert(Constants.alertMessages.error, Constants.alertMessages.invalidSession, [
                    {
                        title: 'Ok',
                        onPress: () => { navigation.navigate(Constants.screenName.Login);
                    }
                    } 
                ])
                return
            }           
            console.log(`${Constants.debugDesc.text} coming inside promise==== `);
            if(init.headers === undefined) {
                init['headers'] = {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
                console.log(`${Constants.debugDesc.text} coming in init header undefined section `);

            } else {
                console.log('Token: ' + token)
                
                init['headers']['Content-Type'] = 'application/json'
        
                if(init['headers']['Authorization'] === undefined) {
                    init['headers']['Authorization'] = 'Bearer ' + token
                }
                console.log(init)
                console.log(`${Constants.debugDesc.text} coming in init header section `);

            }
            console.log(`${Constants.debugDesc.text} coming here = ${init} `);
            console.log(`${Constants.debugDesc.text} token =${token} `);

            fetch(WIN_API_ENDPOINT + resource, init)
            .then(resolve)
            .then(res => {
                // Check if user is unauthorised and direct to login.
                // Case to handle session expiry on the server
                if(res.status === 401) {
                    Alert.alert("Error", "Unauthorised user. Please login again.")
                    navigation.pop()
                    navigation.replace(Constants.screenName.Login)
                } else {
                    resolve(res)
                }
            }).catch(reject)
        })
        .catch((reject) =>{
            console.log(`${Constants.debugDesc.text} not getting any valid token or time stamp`);
            //redirect to login screen 
            navigation.navigate('Login');

        })
    })
}
