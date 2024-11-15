import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {RootStackParamList} from './types/NavigationTypes';
import HomeScreen from './HomeScreen';
import AppContainer from './AppContainer';
import VehiclesScreen from './VehicleScreen';
import RegisterScreen from './RegisterScreen';
import LoginScreen from './LoginScreen';
import AuthLoadingScreen from './AuthLoadingScreen';
import NavBar from '../components/NavBar';
import AddVehicleScreen from './AddVehicleScreen';

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="AuthLoadingScreen">
                {/* Auth Loading Screen */}
                <Stack.Screen
                    name="AuthLoadingScreen"
                    component={AuthLoadingScreen}
                    options={{headerShown: false}}
                />

                {/* Home Screen */}
                <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />

                {/* Register Screen */}
                <Stack.Screen
                    name="Register"
                    component={RegisterScreen}
                    options={{headerShown: false}}
                />

                {/* Login Screen */}
                <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />

                {/* App Container */}
                <Stack.Screen
                    name="AppContainer"
                    component={AppContainer}
                    options={{headerShown: false}}
                />

                {/* Vehicles Screen with NavBar */}
                <Stack.Screen
                    name="VehiclesScreen"
                    component={VehiclesScreen}
                    options={({navigation}) => ({
                        header: () => <NavBar navigation={navigation} />,
                    })}
                />

                {/* Add Vehicle Screen */}
                <Stack.Screen name="AddVehicleScreen" component={AddVehicleScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
