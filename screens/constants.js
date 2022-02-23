var Constants = {
    debugDesc: {
        text: "WIN-MOBILE-APP"
    },
    alertMessages: {
        invalidSession: "Invalid session, Please try to login",
        error: "Error!!"
    },
    colors: {
        primary: "#756BDE",
        primaryDark: "#4e41d5",
        gray: "#d4d4d4"
    },
    screenName: {
        SampleCollector: 'SampleCollector',
        SampleTransporter: 'SampleTransporter',
        SampleAcceptance: 'SampleAcceptance',
        SamplesList: 'SamplesList',
        Login: 'Login'
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
    }
}

export default Constants;
