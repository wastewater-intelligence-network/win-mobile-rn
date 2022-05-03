import React, { useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import Login from './screens/Login/Login';
import Constants from './screens/constants';
import Home from './screens/Home/Home';
import SampleList from './screens/SampleList/SampleList';
import SampleCollector from './screens/SampleCollector/SampleCollector';
import SampleTransporter from './screens/SampleTransporter/SampleTransporter';
import Util from './screens/Util';
import SiteSurvey from './screens/SiteSurvey/SiteSurvey';
import Inventory from './screens/Inventory/Inventory';
import SiteSurveyList from './screens/SiteSurvey/SiteSurveyList';
import CollectionPoints from './screens/MapView/CollectionPoints';
import Schedules from './screens/Schedules/Schedules';
import ChooseLocale from './screens/ChooseLocale/ChooseLocale';

import I18n from './i18n/i18n';
import en from './i18n/en';
import hi from './i18n/hi';
import gj from './i18n/gj';
import as from './i18n/as';
import tm from './i18n/tm';
import ka from './i18n/ka';

const Stack = createNativeStackNavigator();

export default function App() {
	I18n.translations = {
		en: en,
		hi: hi,
		gj: gj,
		as: as,
		tm: tm,
		ka: ka,
	};

	useEffect(() => {
		SplashScreen.hide();
	}, []);

	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name="Login"
					component={Login}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Home"
					component={Home}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name={Constants.screenName.SampleCollector}
					component={SampleCollector}
					options={{ headerShown: false }}
				/>

				<Stack.Screen
					name={Constants.screenName.SampleTransporter}
					component={SampleTransporter}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name={Constants.screenName.SampleAcceptance}
					component={SampleTransporter}
					options={{ headerShown: false }}
				/>

				<Stack.Screen
					name={Constants.screenName.SamplesList}
					component={SampleList}
					options={{ headerShown: false }}
				/>

				<Stack.Screen
					name={Constants.screenName.SiteSurvey}
					component={SiteSurvey}
					options={{ headerShown: false }}
				/>

				<Stack.Screen
					name={Constants.screenName.Inventory}
					component={Inventory}
					options={{ headerShown: false }}
				/>

				<Stack.Screen
					name={Constants.screenName.SiteSurveyList}
					component={SiteSurveyList}
					options={{ headerShown: false }}
				/>

				<Stack.Screen
					name={Constants.screenName.collectionPoints}
					component={CollectionPoints}
					options={{ headerShown: false }}
				/>

				<Stack.Screen
					name={Constants.screenName.Schedule}
					component={Schedules}
					options={{ headerShown: false }}
				/>

				<Stack.Screen
					name={Constants.screenName.ChooseLocale}
					component={ChooseLocale}
					options={{ headerShown: false }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
