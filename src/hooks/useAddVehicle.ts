import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

interface AddVehicleResponse {
    success: boolean;
    message: string;
    data?: any;
}

const useAddVehicle = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const addVehicle = async (vehicleData: {
        make: string;
        model: string;
        year: string;
        licensePlate: string;
        photo: string | null;
    }): Promise<AddVehicleResponse> => {
        setLoading(true);
        setError(null);

        try {
            const token = await AsyncStorage.getItem('userToken');
            if (!token) {
                Alert.alert('Error', 'No token found. Please login again.');
                return {success: false, message: 'No token found'};
            }

            const response = await fetch(
                'https://maintenancesystembc-production.up.railway.app/api/v1/vehicles',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(vehicleData),
                },
            );

            const result = await response.json();

            if (response.ok) {
                return {
                    success: true,
                    message: 'Vehicle added successfully!',
                    data: result.data,
                };
            } else {
                setError(result.message || 'An error occurred');
                return {
                    success: false,
                    message: result.message || 'An error occurred',
                };
            }
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred');
            return {
                success: false,
                message: err.message || 'An unexpected error occurred',
            };
        } finally {
            setLoading(false);
        }
    };

    return {addVehicle, loading, error};
};

export default useAddVehicle;
