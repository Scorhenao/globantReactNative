import {useState} from 'react';
import {Alert} from 'react-native';

const useRegister = () => {
    const [loading, setLoading] = useState(false);

    const register = async (
        username: string,
        email: string,
        password: string,
    ) => {
        const requestBody = {
            email,
            password,
            name: username,
        };

        try {
            setLoading(true);
            const response = await fetch(
                'https://maintenancesystembc-production.up.railway.app/api/v1/auth/register',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                },
            );

            const data = await response.json();

            if (response.ok) {
                Alert.alert('Success', 'Registration successful!');
                return {success: true, data: data.data};
            } else {
                Alert.alert('Error', data.message || 'Registration failed');
                return {success: false, message: data.message};
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Something went wrong. Please try again.');
            return {success: false, message: 'Network error'};
        } finally {
            setLoading(false);
        }
    };

    return {register, loading};
};

export default useRegister;
