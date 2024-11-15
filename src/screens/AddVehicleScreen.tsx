import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image} from 'react-native';
import {useTheme} from '../theme/ThemeContext';
import ColorsDarkMode from '../theme/ColorsDarkMode';
import ColorsLightMode from '../theme/ColorsLightMode';
import useAddVehicle from '../hooks/useAddVehicle';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const AddVehicleScreen = ({navigation}: any) => {
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [licensePlate, setLicensePlate] = useState('');
    const [photo, setPhoto] = useState<string | null>(null);

    const {darkMode} = useTheme();
    const colors = darkMode ? ColorsDarkMode : ColorsLightMode;

    const {addVehicle, loading} = useAddVehicle();

    const handleAddVehicle = async () => {
        const vehicleData = {make, model, year, licensePlate, photo};
        const response = await addVehicle(vehicleData);

        if (response.success) {
            Alert.alert('Success', response.message);
            navigation.navigate('VehiclesScreen');
        } else {
            Alert.alert('Error', response.message);
        }
    };

    const handleSelectPhoto = () => {
        launchImageLibrary(
            {
                mediaType: 'photo',
                quality: 0.8,
            },
            response => {
                if (response.assets && response.assets.length > 0) {
                    setPhoto(response.assets[0].uri || null);
                }
            },
        );
    };

    const handleTakePhoto = () => {
        launchCamera(
            {
                mediaType: 'photo',
                quality: 0.8,
            },
            response => {
                if (response.assets && response.assets.length > 0) {
                    setPhoto(response.assets[0].uri || null);
                }
            },
        );
    };

    return (
        <View style={[styles.container, {backgroundColor: colors.background}]}>
            <Text style={[styles.title, {color: colors.text}]}>Add New Vehicle</Text>
            <TextInput
                style={[styles.input, {borderColor: colors.text, color: colors.text}]}
                placeholder="Make"
                placeholderTextColor={colors.placeHolder}
                value={make}
                onChangeText={setMake}
            />
            <TextInput
                style={[styles.input, {borderColor: colors.text, color: colors.text}]}
                placeholder="Model"
                placeholderTextColor={colors.placeHolder}
                value={model}
                onChangeText={setModel}
            />
            <TextInput
                style={[styles.input, {borderColor: colors.text, color: colors.text}]}
                placeholder="Year"
                keyboardType="numeric"
                placeholderTextColor={colors.placeHolder}
                value={year}
                onChangeText={setYear}
            />
            <TextInput
                style={[styles.input, {borderColor: colors.text, color: colors.text}]}
                placeholder="License Plate"
                placeholderTextColor={colors.placeHolder}
                value={licensePlate}
                onChangeText={setLicensePlate}
            />
            {/* Display selected photo */}
            {photo && <Image source={{uri: photo}} style={styles.previewImage} />}
            <View style={styles.photoButtonsContainer}>
                <TouchableOpacity
                    style={[styles.button, {backgroundColor: colors.link}]}
                    onPress={handleSelectPhoto}>
                    <Text style={styles.buttonText}>Select Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, {backgroundColor: colors.link}]}
                    onPress={handleTakePhoto}>
                    <Text style={styles.buttonText}>Take Photo</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={[styles.submitButton, {backgroundColor: colors.link}]}
                onPress={handleAddVehicle}
                disabled={loading}>
                <Text style={[styles.buttonText, {color: colors.text}]}>
                    {loading ? 'Adding...' : 'Add Vehicle'}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
    },
    previewImage: {
        width: 320,
        height: 200,
        borderRadius: 10,
        marginVertical: 15,
    },
    photoButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    button: {
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 5,
    },
    submitButton: {
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default AddVehicleScreen;
