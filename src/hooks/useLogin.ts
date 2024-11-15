import {useState} from 'react';
import axios from 'axios';

interface LoginResponse {
    token: string;
    message: string;
}

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const login = async (username: string, password: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post<LoginResponse>(
                'https://maintenancesystembc-production.up.railway.app/api/v1/auth/login',
                {
                    username,
                    password,
                },
            );
            setToken(response.data.token); // Store the token
            setLoading(false);
            return response.data.token; // Return the token after successful login
        } catch (err: any ) {
            setLoading(false);
            setError(error.response?.data?.message || 'An error occurred');
            return null;
        }
    };

    return {login, loading, error, token};
};

export default useLogin;
