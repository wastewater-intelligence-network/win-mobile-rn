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
}