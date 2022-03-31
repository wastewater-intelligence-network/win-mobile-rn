var Constants = {
    debugDesc: {
        text: "WIN-MOBILE-APP"
    },
    alertMessages: {
        invalidSession: "Invalid session, Please try to login",
        error: "Error!!",
        invalidQRCode: "Invalid QR code scanned",
        invalidQREntered: "Invalid QR code entered",
        nodataFound: "No data found",
        collectionAddedSuccessfully: "Collection point added successfully"
    },
    colors: {
        primary: "#756BDE",
        primaryDark: "#4e41d5",
        gray: "#d4d4d4",
        grayColor: 'gray',
        black: 'black'

    },
    screenName: {
        SampleCollector: 'SampleCollector',
        SampleTransporter: 'SampleTransporter',
        SampleAcceptance: 'SampleAcceptance',
        SamplesList: 'SamplesList',
        Login: 'Login',
        Home: 'Home',
        SiteSurvey: 'SiteSurvey',
        Inventory:'InventoryManagement',
        Schedule: 'Schedules',
        SiteSurveyList: 'SiteSurveyList',
        collectionPoints: 'CollectionPoints',
    },
    status: {
        sampleCollected: 'sample_collected',
        sampleInTransit: 'sample_in_transit',
        sampleReceivedInLab: 'sample_received_in_lab',
        sampleTestInProgress: 'sample_test_in_progress',
        sampleResultOut: 'sample_result_out'
    },
    userRoles: {
        collector: 'collector',
        transporter: 'transporter',
        admin: 'admin',
        technician: 'technician'
    },
    homeMenuTitle: {
        transporter: "Sample\nTransportation",
        technician: "Accept\nSample"
    },
    endPoints: {
        login: '/login'
    },
    storageKey: {
        token: "token",
        timestamp: "timestamp"
    },

    schemaName: {
        UserDetails: "UserDetails"
    },

    scanCharater: {
        length: 5,
        regEx: /^(?:[A-Za-z0-9]+)$/
    },
    statusLog: {
        error: 'error'
    }
}

export default Constants;
