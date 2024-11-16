import React, {useState} from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ActivityIndicator,
    Alert,
    TouchableOpacity,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import useAddMaintenance from '../hooks/useAddMaintenance';
import {useTheme} from '../theme/ThemeContext';
import ColorsDarkMode from '../theme/ColorsDarkMode';
import ColorsLightMode from '../theme/ColorsLightMode';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddMaintenanceScreen = ({route, navigation}: any) => {
    const {vehicleId} = route.params;
    const [type, setType] = useState('');
    const [date, setDate] = useState('');
    const [mileage, setMileage] = useState('');
    const [notes, setNotes] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const {addMaintenance, loading, error} = useAddMaintenance();

    const darkMode = useTheme().darkMode;
    const colors = darkMode ? ColorsDarkMode : ColorsLightMode;

    const handleAddMaintenance = async () => {
        if (!type || !date || !mileage || !notes) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        const maintenanceData = {
            type,
            date,
            mileage: parseInt(mileage),
            notes,
        };

        try {
            const token = await AsyncStorage.getItem('userToken'); // Replace 'userToken' with your key for token

            if (!token) {
                Alert.alert('Error', 'You must be logged in');
                return;
            }

            const result = await addMaintenance(vehicleId, token, maintenanceData);

            if (result) {
                Alert.alert('Success', 'Maintenance record added successfully');
                navigation.goBack(); // Navigate back to the previous screen
            } else {
                Alert.alert('Error', error || 'Something went wrong');
            }
        } catch (err) {
            Alert.alert('Error', 'Failed to retrieve token');
        }
    };

    const handleConfirmDate = (date: Date) => {
        const formattedDate = date.toISOString().split('T')[0]; // Format as yyyy-mm-dd
        setDate(formattedDate);
        setDatePickerVisibility(false);
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={[styles.container, {backgroundColor: colors.background}]}>
            <Text style={[styles.title, {color: colors.text}]}>Add Maintenance</Text>

            <TextInput
                style={[styles.input, {borderColor: colors.text, color: colors.text}]}
                placeholder="Maintenance Type"
                placeholderTextColor={colors.placeHolder}
                value={type}
                onChangeText={setType}
            />
            <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
                <TextInput
                    style={[styles.input, {borderColor: colors.text, color: colors.text}]}
                    placeholder="Date (YYYY-MM-DD)"
                    placeholderTextColor={colors.placeHolder}
                    value={date}
                    editable={false}
                />
            </TouchableOpacity>
            <TextInput
                style={[styles.input, {borderColor: colors.text, color: colors.text}]}
                placeholder="Mileage"
                placeholderTextColor={colors.placeHolder}
                value={mileage}
                onChangeText={setMileage}
                keyboardType="numeric"
            />
            <TextInput
                style={[styles.input, {borderColor: colors.text, color: colors.text}]}
                placeholder="Notes"
                placeholderTextColor={colors.placeHolder}
                value={notes}
                onChangeText={setNotes}
            />

            <TouchableOpacity
                style={[styles.button, {backgroundColor: colors.link}]}
                onPress={handleAddMaintenance}
                disabled={loading}>
                <Text>{loading ? 'Adding...' : 'Add Maintenance'}</Text>
            </TouchableOpacity>

            {error && <Text style={styles.error}>{error}</Text>}

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirmDate}
                onCancel={() => setDatePickerVisibility(false)}
                date={new Date()}
            />
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
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
    },
    button: {
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    error: {
        color: 'red',
        marginTop: 10,
    },
});

export default AddMaintenanceScreen;
