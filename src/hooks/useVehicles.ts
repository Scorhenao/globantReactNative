import {useState, useCallback} from 'react';
import axios from 'axios';

interface Vehicle {
    id: number;
    make: string;
    model: string;
    year: number;
    licensePlate: string;
    photo: string;
}

const useVehicles = () => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchVehicles = useCallback(async (token: string) => {
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
        } catch (err: any) {
            console.error('Error fetching vehicles:', err.response ? err.response.data : err);
            setError('Failed to fetch vehicles');
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        vehicles,
        loading,
        error,
        refetchVehicles: fetchVehicles,
    };
};

export default useVehicles;
