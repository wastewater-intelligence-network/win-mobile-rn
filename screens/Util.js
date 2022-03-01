import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "./constants";

export default class Util {

    static getDate(date) {
            var dateObj = date
            var date = dateObj.getDate();
            var month = dateObj.getMonth() + 1;
            var year = dateObj.getFullYear();
            return date + '-' + month + '-' + year ;//format: dd-mm-yyyy;
    }

    static getFilteredDate(selectedDate = new Date()) {
            console.log('Here is coming');
            var dateObj = selectedDate;
            var date = dateObj.getDate();
            var month = dateObj.getMonth() + 1;
            var year = dateObj.getFullYear();
            return year + '-' + month + '-' + date;//format: dd-mm-yyyy;       
    }




    static getCurrentTimeStamp() {
        return Math.floor(Date.now() / 1000)
    }

    static isValidQRScan(qrData) {
        return ((qrData.length === Constants.scanCharater.length) ? true:false)
    }

}