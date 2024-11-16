import {useState} from 'react';
import axios from 'axios';

const useAddMaintenance = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [maintenanceData, setMaintenanceData] = useState<any>(null);

    const addMaintenance = async (
        vehicleId: number,
        token: string,
        data: {type: string; date: string; mileage: number; notes: string},
    ) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(
                `https://maintenancesystembc-production.up.railway.app/api/v1/vehicles/${vehicleId}/maintenance`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                },
            );

            if (response.status === 201) {
                setMaintenanceData(response.data.data);
                return response.data.data;
            }
        } catch (err: any) {
            // Handle error response if fields are missing or invalid
            if (err.response) {
                const errorMessage = err.response.data.message || 'An error occurred';
                setError(errorMessage);
            } else {
                setError('Unexpected error occurred!');
            }
            return null;
        } finally {
            setLoading(false);
        }
    };

    return {addMaintenance, loading, error, maintenanceData};
};

export default useAddMaintenance;
