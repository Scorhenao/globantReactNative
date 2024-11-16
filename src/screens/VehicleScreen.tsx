import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import useVehicles from '../hooks/useVehicles';
import useDeleteVehicle from '../hooks/useDeleteVehicle'; // Import your custom hook
import {useTheme} from '../theme/ThemeContext';
import ColorsDarkMode from '../theme/ColorsDarkMode';
import ColorsLightMode from '../theme/ColorsLightMode';

const VehiclesScreen = ({navigation}: any) => {
    const [token, setToken] = useState<string | null>(null);
    const {vehicles, loading, error, refetchVehicles} = useVehicles();
    const {deleteVehicle, loading: deleteLoading, error: deleteError} = useDeleteVehicle();

    useEffect(() => {
        const fetchToken = async () => {
            const storedToken = await AsyncStorage.getItem('userToken');
            if (storedToken) {
                setToken(storedToken);
            } else {
                navigation.navigate('Login');
            }
        };

        fetchToken();
    }, [navigation]);

    useFocusEffect(
        React.useCallback(() => {
            if (token) {
                refetchVehicles(token);
            }
        }, [token]),
    );

    // Handle unauthorized errors and navigate to Home or Login
    useEffect(() => {
        if (error && error === 'Unauthorized') {
            Alert.alert('Unauthorized', 'Session expired. Redirecting to Home...', [
                {
                    text: 'OK',
                    onPress: () => navigation.navigate('Home'), // Navigate to Home
                },
            ]);
        }
    }, [error, navigation]);

    const {darkMode} = useTheme();
    const colors = darkMode ? ColorsDarkMode : ColorsLightMode;

    const handleEditVehicle = (vehicleId: number) => {
        navigation.navigate('EditVehicleScreen', {vehicleId});
    };

    const handleDeleteVehicle = (vehicleId: number) => {
        Alert.alert('Delete Vehicle', 'Are you sure you want to delete this vehicle?', [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'Delete',
                onPress: async () => {
                    if (token) {
                        const success = await deleteVehicle(vehicleId, token);
                        if (success) {
                            refetchVehicles(token); // Refetch vehicles after deletion
                        }
                    }
                },
            },
        ]);
    };

    if (loading || deleteLoading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error || deleteError) {
        return <Text>{error || deleteError}</Text>;
    }

    return (
        <View style={[styles.container, {backgroundColor: colors.background}]}>
            <FlatList
                data={vehicles}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                    <View style={[styles.vehicleCard, {borderColor: colors.text}]}>
                        <View style={styles.iconsContainer}>
                            {/* Edit Icon */}
                            <TouchableOpacity onPress={() => handleEditVehicle(item.id)}>
                                <Icon name="pencil" size={20} color={colors.text} />
                            </TouchableOpacity>

                            {/* Delete Icon */}
                            <TouchableOpacity
                                style={styles.iconDelete}
                                onPress={() => handleDeleteVehicle(item.id)}>
                                <Icon name="trash" size={20} color="red" />
                            </TouchableOpacity>

                            {/* Maintenance Icon */}
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate('AddMaintenanceScreen', {
                                        vehicleId: item.id,
                                    })
                                }>
                                <Icon name="wrench" size={20} color={colors.text} />
                            </TouchableOpacity>

                            {/* Maintenance History Icon */}
                            <TouchableOpacity
                                style={styles.iconHistory}
                                onPress={() =>
                                    navigation.navigate('MaintenanceHistoryScreen', {
                                        vehicleId: item.id,
                                    })
                                }>
                                <Icon name="history" size={20} color={colors.text} />
                            </TouchableOpacity>
                        </View>
                        <Image
                            source={{
                                uri:
                                    item.photo ||
                                    'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png',
                            }}
                            style={styles.vehicleImage}
                        />
                        <Text style={[styles.vehicleText, {color: colors.text}]}>
                            {item.make} {item.model} ({item.year})
                        </Text>
                        <Text style={[styles.vehicleText, {color: colors.text}]}>
                            License Plate: {item.licensePlate}
                        </Text>
                    </View>
                )}
            />
            <TouchableOpacity
                style={[styles.floatingButton, {backgroundColor: colors.link}]}
                onPress={() => navigation.navigate('AddVehicleScreen')}>
                <Icon name="plus" size={24} color={colors.text} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    vehicleCard: {
        marginBottom: 20,
        padding: 20,
        borderWidth: 1,
        borderRadius: 10,
        alignItems: 'center',
    },
    vehicleImage: {
        width: 200,
        height: 100,
        borderRadius: 10,
    },
    vehicleText: {
        fontSize: 16,
        marginTop: 5,
    },
    floatingButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    iconsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 10,
    },
    iconDelete: {
        position: 'absolute',
        bottom: -165,
        left: 0,
    },
    iconHistory: {
        position: 'absolute',
        bottom: -165,
        right: 0,
    },
});

export default VehiclesScreen;
