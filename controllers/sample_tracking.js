import Fetch from './fetch';
import Constants from '../screens/constants';

export default class SampleTracking {

    siteSurveyCollected = (location, siteName, pointID, samplingType, prefferedType, navigation) => {

        return new Promise((resolve, reject) => {
            var data = {
                "pointId": pointID,
                "name": siteName,
                "location": {
                    "type": "Point",
                    "coordinates": [
                        location.coords.longitude, 
                        location.coords.latitude
                    ]
                },
                "type": samplingType,
                "samplingType": prefferedType
            }

            Fetch('/setPointForSurvey', {
                method: 'POST',
                body: JSON.stringify(data)
            }, navigation)
                .then(res => res.json())
                .then(res => {
                    console.log(`response of sample list =${res}`)
                    console.log(`${Constants.debugDesc.text} got response of site survey =${JSON.stringify(res)}`)
                    resolve(res)
                })
                .catch(reject)
        })
    }

    upgradeSurveyPointToCollectionPoint = (latitude, longitude, siteName, pointID, samplingType, prefferedType, navigation) => {

        return new Promise((resolve, reject) => {
            var data = {
                "pointId": pointID,
                "name": siteName,
                "location": {
                    "type": "Point",
                    "coordinates": [
                        latitude, 
                        longitude
                    ]
                },
                "type": samplingType,
                "samplingType": prefferedType
            }

            Fetch('/upgradeSurveyPointToCollectionPoint', {
                method: 'PATCH',
                body: JSON.stringify(data)
            }, navigation)
                .then(res => res.json())
                .then(res => {
                    console.log(`response of upgradeSurveyPointToCollectionPoint =${res}`)
                    console.log(`${Constants.debugDesc.text} got response of upgradeSurveyPointToCollectionPoint =${JSON.stringify(res)}`)
                    resolve(res)
                })
                .catch(reject)
        })
    }

    sampleCollected = (location, containerId, pointId, additionalData, navigation) => {
        return new Promise((resolve, reject) => { 
            var data = {
                "containerId": containerId,
                "location": {
                    "type": "Point",
                    "coordinates": [
                        location.coords.longitude,
                        location.coords.latitude
                    ]
                }
            }

            if(additionalData) {
                data["additionalData"] = additionalData
            }

            if(pointId) {
                console.log("PointId: " + pointId)
                data["pointId"] = pointId
            }

            Fetch('/samplingRequest', {
                method: 'POST',
                body: JSON.stringify(data)
            }, navigation)
                .then(res => res.json())
                .then(res => {
                    resolve(res)
                })
                .catch(reject)
        })
    }

    changeSampleStatus = (containerId, statusPatch, navigation) => {
        return new Promise((resolve, reject) => { 
            var data = {
                "containerId": containerId,
                "statusPatch": statusPatch
            }

            Fetch('/samplingStatus', {
                method: 'PATCH',
                body: JSON.stringify(data)
            }, navigation )
                .then(res => res.json())
                .then(res => {
                    resolve(res)
                })
                .catch(reject)
        })
    }

    sampleInTransit = (containerId, navigation) => {
        return this.changeSampleStatus(containerId, 'sample_in_transit', navigation)
    }

    sampleAcceptedInLab = (containerId, navigation) => {
        return this.changeSampleStatus(containerId, 'sample_received_in_lab', navigation)
    }


    getSamplesList = (date, navigation) => {
        return new Promise((resolve, reject) => {
            Fetch('/getSamplesCollectedOn?date=' + date, {
                method: 'GET'
            }, navigation)
                .then(res => res.json())
                .then(res => {
                    console.log(`response of sample list =${res}`)
                    console.log(`${Constants.debugDesc.text} josn of samplelist is =${JSON.stringify(res)}`)

                    resolve(res)
                })
                .catch(reject)
        })
    }

    getAllPointsSurveyList = (date, navigation) => {
        return new Promise((resolve, reject) => {
            Fetch('/getAllPointsSurvey' , {
                method: 'GET'
            }, navigation)
                .then(res => res.json())
                .then(res => {
                    console.log(`response of sample point list =${res}`)
                    console.log(`${Constants.debugDesc.text} josn of sample point is =${JSON.stringify(res)}`)
                    resolve(res)

                })
                .catch(reject)
        })
    }

    getSchedules  = (date, navigation) => {
        return new Promise((resolve, reject) => {
            Fetch('/getSchedule', {
                method: 'GET'
            }, navigation)
                .then(res => res.json())
                .then(res => {
                    console.log(`response of get schedules =${res.schedule}`)
                    console.log(`${Constants.debugDesc.text} josn of samplelist is =${JSON.stringify(res.schedule)}`)
                    resolve(res.schedule);
                })
                .catch(reject)
        })
    }

    getAllCollectionPoints = (date, navigation) => {
        return new Promise((resolve, reject) => {
            Fetch('/getCollectionPoints' , {
                method: 'GET'
            }, navigation)
                .then(res => res.json())
                .then(res => {
                    console.log(`response of all collection points =${res}`)
                    console.log(`${Constants.debugDesc.text} josn of all collection points =${JSON.stringify(res)}`)
                    resolve(res)
                })
                .catch(reject)
        })
    }
}
