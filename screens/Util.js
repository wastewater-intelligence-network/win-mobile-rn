import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "./constants";

export default class Util {

    static getDate(date) {
            var dateObj = date
            var date = dateObj.getDate();
            var month = dateObj.getMonth() + 1;
            var year = dateObj.getFullYear();
            return date + '-' + month + '-' + year ;
    }

    static getFilteredDate(selectedDate = new Date()) {
            console.log('Here is coming');
            var dateObj = selectedDate;
            var date = dateObj.getDate();
            var month = dateObj.getMonth() + 1;
            var year = dateObj.getFullYear();
            return year + '-' + month + '-' + date;//format: dd-mm-yyyy;       
    }

    static timeFormatter(date) {
        let hour = date.getHours() % 12;
        let minutes = date.getMinutes() % 12 ;
        return (hour < 10 ? '0' + hour : hour) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ( hour < 12 ? 'AM' : 'PM')
    }

    static getCurrentDate() {
            return new Date()
    }

    static getCurrentTimeStamp() {
        return Math.floor(Date.now() / 1000)
    }

    static isValidQRScan(qrData) {
        return ((qrData.length === Constants.scanCharater.length) ? true:false)
    }

}