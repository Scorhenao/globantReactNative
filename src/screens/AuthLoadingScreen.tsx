import React, {useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthLoadingScreen = ({navigation}: any) => {
    useEffect(() => {
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('userToken');
            if (token) {
                navigation.replace('VehiclesScreen'); // Navega directamente a vehículos si hay token
            } else {
                navigation.replace('Login'); // Redirige al login si no hay token
            }
        };

        checkToken();
    }, [navigation]);

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );
};

export default AuthLoadingScreen;
