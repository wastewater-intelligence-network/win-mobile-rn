import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './screens/Login/Login';
import Constants from './screens/constants';
import Home from './screens/Home/Home';
import SampleList from './screens/SampleList/SampleList';
import SampleCollector from './screens/SampleCollector/SampleCollector';
import SampleTransporter from './screens/SampleTransporter/SampleTransporter';

const Stack = createNativeStackNavigator();

export default function App() {
	
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name="Login"
					component={Login}
					options={{headerShown: false}}
				/>
				<Stack.Screen
					name="Home"
					component={Home}
					options={{headerShown: false}}
				/>
				<Stack.Screen
					name={Constants.screenName.SampleCollector}
					component={SampleCollector}
					options={{headerShown: false}}
				/>

				<Stack.Screen
					name={Constants.screenName.SampleTransporter}
					component={SampleTransporter}
					options={{headerShown: false}}
				/>
				<Stack.Screen
					name={Constants.screenName.SampleAcceptance}
					component={SampleTransporter}
					options={{headerShown: false}}
				/>
				
				<Stack.Screen
					name={Constants.screenName.SamplesList}
					component={SampleList}
					options={{headerShown: false}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}