import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, FlatList, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useMaintenanceHistory from '../hooks/useMaintenanceHistory';
import {useTheme} from '@react-navigation/native'; // To get the current theme
import ColorsDarkMode from '../theme/ColorsDarkMode';
import ColorsLightMode from '../theme/ColorsLightMode';

const MaintenanceHistoryScreen = ({route}: any) => {
    const {vehicleId} = route.params; // Get the vehicleId from the route
    const [token, setToken] = useState<string | null>(null);

    // Get the current theme (light or dark) for styling
    const darkMode = useTheme();
    const colors = darkMode ? ColorsDarkMode : ColorsLightMode;
    // Fetch the token from AsyncStorage
    useEffect(() => {
        const fetchToken = async () => {
            const storedToken = await AsyncStorage.getItem('userToken');
            setToken(storedToken);
        };

        fetchToken();
    }, []);

    const {maintenanceData, loading, error} = useMaintenanceHistory(vehicleId, token);

    // Show a loading indicator while data is being fetched
    if (loading) {
        return <ActivityIndicator size="large" color={colors.error} />;
    }

    // Handle error responses (including unauthorized errors)
    if (error) {
        if (error === 'Unauthorized') {
            return (
                <Text style={[styles.errorText, {color: colors.error}]}>
                    Unauthorized. Please log in again.
                </Text>
            );
        }
        return <Text style={[styles.errorText, {color: colors.error}]}>{error}</Text>;
    }

    return (
        <View style={[styles.container, {backgroundColor: colors.background}]}>
            <FlatList
                data={maintenanceData}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                    <View style={[styles.item, {backgroundColor: colors.background}]}>
                        <Text style={[styles.type, {color: colors.text}]}>{item.type}</Text>
                        <Text style={[styles.date, {color: colors.text}]}>{item.date}</Text>
                        <Text style={[styles.mileage, {color: colors.text}]}>
                            Mileage: {item.mileage}
                        </Text>
                        <Text style={[styles.notes, {color: colors.text}]}>{item.notes}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    item: {
        marginBottom: 20,
        padding: 16,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#ddd',
    },
    type: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    date: {
        fontSize: 14,
    },
    mileage: {
        fontSize: 14,
    },
    notes: {
        fontSize: 14,
        marginTop: 5,
    },
    errorText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default MaintenanceHistoryScreen;
