import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import useVehicles from '../hooks/useVehicles';
import {useTheme} from '../theme/ThemeContext';
import ColorsDarkMode from '../theme/ColorsDarkMode';
import ColorsLightMode from '../theme/ColorsLightMode';

const VehiclesScreen = ({navigation}: any) => {
    const [token, setToken] = useState<string | null>(null);
    const {vehicles, loading, error, refetchVehicles} = useVehicles();

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

    const {darkMode} = useTheme();
    const colors = darkMode ? ColorsDarkMode : ColorsLightMode;

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text>{error}</Text>;
    }

    return (
        <View style={[styles.container, {backgroundColor: colors.background}]}>
            <FlatList
                data={vehicles}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                    <View style={[styles.vehicleCard, {borderColor: colors.border}]}>
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
                <Icon name="plus" size={24} color="#fff" />
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
});

export default VehiclesScreen;
