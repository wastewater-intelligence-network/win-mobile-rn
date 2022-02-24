import Realm from "realm";
import Constants from "./constants";
import Util from "./Util";

export default class DBManager {
    
    static schema = {name: Constants.schemaName.UserDetails, properties: {token: 'string', expiryTime: 'string', roles:'string[]'}};

    static isValidSession(navigation) {
        Realm.open({
            schema: [DBManager.schema]
            }).then(realm => {
            let objects = realm.objects(Constants.schemaName.UserDetails);
            if (objects.length > 0) {
                let token = objects[0].token;
                let timeStamp = objects[0].expiryTime;
                let serverTimeStamp = parseInt (timeStamp);
                let currentMobileTimeStamp = Util.getCurrentTimeStamp()
                console.log(`${Constants.debugDesc.text} Server time stamp=${serverTimeStamp}`);
                console.log(`${Constants.debugDesc.text} Mobile time stamp=${currentMobileTimeStamp}`);
                let roles = objects[0].roles;
                if (serverTimeStamp > currentMobileTimeStamp) {
                    navigation.navigate(Constants.screenName.Home, objects[0].roles);
                } else {
                    navigation.navigate(Constants.screenName.Login);
                }
            }
        });
    }

    static saveInLocalDB(token, timestamp) {
        console.log(`token=${token} and timestamp=${timestamp}`);
        Realm.open({
            schema: [DBManager.schema]
            }).then(realm => {
            let objects = realm.objects(Constants.schemaName.UserDetails);
            if (objects.length == 0) {
                realm.write(() => {
                realm.create('UserDetails', {token: token, expiryTime:timestamp, roles:["admin"]});
                });
            } else {
                realm.write(() => {
                objects[0].token = token;
                objects[0].expiryTime = timestamp;
                });
            }
        });
    }

    static saveRoles(roles) {
        Realm.open({
            schema: [DBManager.schema]
            }).then(realm => {
            let objects = realm.objects(Constants.schemaName.UserDetails);
            if (objects.length > 0) {
                realm.write(() => {
                objects[0].roles = roles;
                });
            } 
        });
    }

    static logout(navigation) {

        Realm.open({
            schema: [DBManager.schema]
            }).then(realm => {
            let objects = realm.objects(Constants.schemaName.UserDetails);
            if (objects.length > 0) {
                realm.write(() => {
                console.log('here');
                realm.delete(objects[0]);
                console.log('there');
                navigation.navigate(Constants.screenName.Login)
                });
            } 
        });
    }

    static clearLocalDB() {

        Realm.open({
            schema: [DBManager.schema]
            }).then(realm => {
            let objects = realm.objects(Constants.schemaName.UserDetails);
            if (objects.length > 0) {
                realm.write(() => {
                realm.delete(objects[0]);
                });
            } 
        });
    }
}