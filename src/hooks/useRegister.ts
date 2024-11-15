import {useState} from 'react';
import {Alert} from 'react-native';

const useRegister = () => {
    const [loading, setLoading] = useState(false);

    const register = async (username: string, email: string, password: string) => {
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
                // Check if the message is an array
                const message = Array.isArray(data.message)
                    ? data.message.join(', ')
                    : data.message;
                Alert.alert('Error', message || 'Registration failed');
                return {success: false, message};
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
