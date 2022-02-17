import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './screens/Login/Login';
import Constants from './screens/constants';
import Home from './screens/Home/Home';

const Stack = createNativeStackNavigator();

export default function App() {
	// const [loaded] = useFonts({
	// 	QuicksandLight: require('./assets/fonts/Quicksand-Light.ttf'),
	// 	Quicksand: require('./assets/fonts/Quicksand-Regular.ttf'),
	// 	QuicksandMedium: require('./assets/fonts/Quicksand-Medium.ttf'),
	// 	QuicksandBold: require('./assets/fonts/Quicksand-Bold.ttf'),
	// 	Consolas: require('./assets/fonts/Consolas.ttf'),
	// });
	
	// if (!loaded) {
	// 	return null;
	// }
	
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
			</Stack.Navigator>
		</NavigationContainer>
	);
}