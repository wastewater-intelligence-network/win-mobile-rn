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

    static getFormatedDate(dateObj) {
        var date = dateObj.getDate();
        var month = dateObj.getMonth() + 1;
        var year = dateObj.getFullYear();
        return (date < 10 ? '0' + date:date) + '-' + (month < 10 ? '0' + month: month) + '-' + year ;
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
        let minutes = date.getMinutes()  ;
        return (hour < 10 ? '0' + hour : hour) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ( date.getHours() < 12 ? 'AM' : 'PM')
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

    static showDateAndTime(statusList, index) {

        var d = new Date(statusList[index].timestamp)
        var date = d.getDate();
        var month = d.getMonth();
        var hr = d.getHours() % 12;
        var min = d.getMinutes();
        var ss = d.getSeconds();
        var date = (date < 10 ? '0' + date: date) + '/' + (month < 10 ? '0' + month: month) + '/' + d.getFullYear() + ' ' + (hr < 10 ?( '0' + hr): hr) + ':' + (min < 10 ? '0' + min: min) + ' ' + (d.getHours() < 12 ? 'AM' : 'PM')
        return date;
    }

}