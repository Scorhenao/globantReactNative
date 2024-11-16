import React, {useState, useEffect} from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    Alert,
    ActivityIndicator,
    TouchableOpacity,
    Text,
    Image,
} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import useEditVehicle from '../hooks/useEditVehicle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme} from '../theme/ThemeContext';
import ColorsDarkMode from '../theme/ColorsDarkMode';
import ColorsLightMode from '../theme/ColorsLightMode';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { RootStackParamList } from './types/NavigationTypes';

const EditVehicleScreen = ({navigation}: any) => {
    const [token, setToken] = useState<string | null>(null);
    const [make, setMake] = useState<string>('');
    const [model, setModel] = useState<string>('');
    const [year, setYear] = useState<string>('');
    const [licensePlate, setLicensePlate] = useState<string>('');
    const [file, setFile] = useState<any>(null); // Placeholder for the image file
    const { vehicleId } = useRoute<RouteProp<RootStackParamList, 'EditVehicleScreen'>>().params;

    const {editVehicle, loading, error} = useEditVehicle();
    const {darkMode} = useTheme();
    const colors = darkMode ? ColorsDarkMode : ColorsLightMode;

    // Fetch token only once when the component is mounted
    useEffect(() => {
        const fetchToken = async () => {
            const storedToken = await AsyncStorage.getItem('userToken');
            if (storedToken) {
                setToken(storedToken);
            } else {
                navigation.navigate('Login'); // If no token, navigate to login screen
            }
        };
        fetchToken();
    }, [navigation]);

    // Fetch vehicle details once the token is available
    useEffect(() => {
        const fetchVehicleDetails = async () => {
            if (!token || !vehicleId) return; // Don't fetch if token or vehicleId is not available
            try {
                const response = await axios.get(
                    `https://maintenancesystembc-production.up.railway.app/api/v1/vehicles/${vehicleId}`,
                    {
                        headers: {Authorization: `Bearer ${token}`},
                    },
                );
                const vehicle = response.data;
                setMake(vehicle.make);
                setModel(vehicle.model);
                setYear(vehicle.year);
                setLicensePlate(vehicle.licensePlate);
                setFile(vehicle.file); // Assuming 'file' contains the image URL or file data
            } catch (err) {
                console.error('Failed to fetch vehicle details:', err);
                Alert.alert('Error', 'Failed to fetch vehicle details.');
            }
        };
        if (token) {
            fetchVehicleDetails(); // Fetch details if the token is set
        }
    }, [token, vehicleId]); // Only re-run when token or vehicleId changes

    const handleSave = async () => {
        if (!make || !model || !year || !licensePlate) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }

        // Prepare vehicle data (only the fields that are not null/empty will be sent)
        const vehicleData: any = {};
        if (make) {
            vehicleData.make = make;
        }
        if (model) {
            vehicleData.model = model;
        }
        if (year) {
            vehicleData.year = year;
        }
        if (licensePlate) {
            vehicleData.licensePlate = licensePlate;
        }
        if (file) {
            vehicleData.file = file;
        } // Include the image file if it's changed

        try {
            await editVehicle(vehicleId, vehicleData, token!);
            Alert.alert('Success', 'Vehicle updated successfully!');
            navigation.goBack();
        } catch (err) {
            Alert.alert('Error', error || 'Failed to update vehicle');
        }
    };

    const handleImagePick = () => {
        launchImageLibrary(
            {mediaType: 'photo', quality: 0.5}, // Configure options here
            response => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.errorMessage) {
                    console.log('ImagePicker Error: ', response.errorMessage);
                } else {
                    setFile(response.assets?.[0]?.uri); // Update file state with the image URI
                }
            },
        );
    };

    const handleCameraPick = () => {
        launchCamera(
            {mediaType: 'photo', quality: 0.5}, // Configure options here
            response => {
                if (response.didCancel) {
                    console.log('User cancelled camera');
                } else if (response.errorMessage) {
                    console.log('Camera Error: ', response.errorMessage);
                } else {
                    setFile(response.assets?.[0]?.uri); // Update file state with the image URI
                }
            },
        );
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={[styles.container, {backgroundColor: colors.background}]}>
            <TextInput
                style={[styles.input, {color: colors.text}]}
                placeholder="Make"
                placeholderTextColor={colors.placeHolder}
                value={make}
                onChangeText={setMake}
            />
            <TextInput
                style={[styles.input, {color: colors.text}]}
                placeholder="Model"
                placeholderTextColor={colors.placeHolder}
                value={model}
                onChangeText={setModel}
            />
            <TextInput
                style={[styles.input, {color: colors.text}]}
                placeholder="Year"
                placeholderTextColor={colors.placeHolder}
                value={year}
                onChangeText={setYear}
            />
            <TextInput
                style={[styles.input, {color: colors.text}]}
                placeholder="License Plate"
                placeholderTextColor={colors.placeHolder}
                value={licensePlate}
                onChangeText={setLicensePlate}
            />

            {/* Change Image Button with Icon */}
            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <TouchableOpacity
                    style={[styles.button, {backgroundColor: colors.link}]}
                    onPress={handleImagePick}>
                    <Icon name="photo" size={20} color={colors.text} />
                    <Text style={{color: colors.text}}>Gallery</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, {backgroundColor: colors.link}]}
                    onPress={handleCameraPick}>
                    <Icon name="camera" size={20} color={colors.text} />
                    <Text style={{color: colors.text}}>Camera</Text>
                </TouchableOpacity>
            </View>

            {/* Display selected image */}
            {file && (
                <View style={styles.imageContainer}>
                    <Image source={{uri: file}} style={styles.image} />
                </View>
            )}

            {/* Save Vehicle Button with Icon */}
            <TouchableOpacity
                style={[styles.button, {backgroundColor: colors.link}]}
                onPress={handleSave}>
                <Icon name="save" size={20} color={colors.text} />
                <Text style={{color: colors.text}}>Save Vehicle</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 10,
        borderRadius: 5,
    },
    button: {
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
        flexDirection: 'row', // Align icon and text in a row
        justifyContent: 'center',
        gap: 10,
    },
    imageContainer: {
        marginTop: 15,
        alignItems: 'center',
    },
    image: {
        width: 320,
        height: 200,
        borderRadius: 8,
        marginBottom: 10,
    },
});

export default EditVehicleScreen;
