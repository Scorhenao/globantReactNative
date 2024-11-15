import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from './types/NavigationTypes';
import HomeScreen from './HomeScreen';
import AppContainer from './AppContainer';
import {NavigationContainer} from '@react-navigation/native';
import VehiclesScreen from './VehicleScreen';

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    options={{headerShown: false}}
                    name="Home"
                    component={HomeScreen}
                />
                <Stack.Screen
                    options={{headerShown: false}}
                    name="AppContainer"
                    component={AppContainer}
                />
                <Stack.Screen
                    options={{headerShown: false}}
                    name="VehiclesScreen"
                    component={VehiclesScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
