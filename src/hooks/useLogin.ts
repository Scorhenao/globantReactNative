import {useState} from 'react';
import axios from 'axios';

// Adjusted interface to match the API response structure
interface LoginResponse {
    data: {
        access_token: string; // The token is inside 'data'
        user: {
            email: string;
            id: number;
        };
    };
    message: string;
}

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const login = async (email: string, password: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post<LoginResponse>(
                'https://maintenancesystembc-production.up.railway.app/api/v1/auth/login',
                {
                    email,
                    password,
                },
            );
            const accessToken = response.data.data.access_token; // Correctly access the token
            setToken(accessToken); // Store the token
            setLoading(false);
            return accessToken; // Return the token after successful login
        } catch (err: any) {
            setLoading(false);
            setError(err.response?.data?.message || 'An error occurred');
            return null;
        }
    };

    return {login, loading, error, token};
};

export default useLogin;
