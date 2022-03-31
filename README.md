#  Platform supported

    For now only supporting ANDROID.

#   To run the application 

    Open command prompt

    cd to WinMobileApp(soruce root folder)  

    install dependencies: npm install

    open new terminal and start metro bundler: npx react-native start

    run the app: npx react-native run-android

#   Folder Structure 

    •   All the API related code/calling is inside controllers folder(under root).it contains authentication.js, fetch.js and sample_tracking.js

    •   All assets and fonts is under assets folder(under root)

    •   Routing is declared in App.js file

    •   Each screen/UI of the app is inside screens folder like Home, Inventory, Login, MapView, etc.

    •   Component is inside screens/components folder

    •   Database operation is under DBManager

    •   All the common operation folder like constant, model,WinCustomAlert, Utils, etc. is under screens folder.

    
 # To Add App icons

    Added app Icon under android/app/src/main/res

  # To Add splash screen
    
    used react-native-splash-screen to set splash screen

  # Create APK and Android App Bundle.

    it is being used by Android studio.

  # RELEASE-BUILD : ANDROID :MANUAL

    Open a terminal/command prompt inside the root directory of your project and run the following commands:

    1. Start the node packaging bundler: npm start

    2. When the terminal shows: “Loading dependency graphs….”, open a new terminal in the same directory and now run the following to create a new directory inside the app to store the assets:

    mkdir -p android/app/src/main/assets

    3. Use react-native’s bundle to bundle the assets in the directory created above:

    npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/build/intermediates/res/merged/release/

    4. Curl the .js files created to the index.android.bundle:

    curl "http://localhost:8081/index.bundle?platform=android" -o "android/app/src/main/assets/index.android.bundle"

    5. Change to /android directory and run gradlew to build the APK:
    cd android && ./gradlew clean assembleRelease

    Note: if got any error please look into progaurd rules

