import Realm from "realm";
import Constants from "./constants";

export default class DBManager {
    
    static schema = {name: Constants.schemaName.UserDetails, properties: {token: 'string', expiryTime: 'string', roles:'string[]'}};

    static isValidSession(navigation) {
        Realm.open({
            schema: [DBManager.schema]
            }).then(realm => {
            let objects = realm.objects(Constants.schemaName.UserDetails);
            if (objects.length > 0) {
                navigation.navigate('Home', objects[0].roles);
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
}