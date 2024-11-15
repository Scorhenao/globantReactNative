import {useEffect, useState} from 'react';
import axios from 'axios';

interface Vehicle {
    id: number;
    make: string;
    model: string;
    year: number;
    licensePlate: string;
    photo: string;
}

const useVehicles = (token: string) => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchVehicles = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    'https://maintenancesystembc-production.up.railway.app/api/v1/vehicles',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );
                if (response.status === 200) {
                    setVehicles(response.data.data);
                }
            } catch (err) {
                setError('Failed to fetch vehicles');
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchVehicles();
        }
    }, [token]);

    return {vehicles, loading, error};
};

export default useVehicles;
