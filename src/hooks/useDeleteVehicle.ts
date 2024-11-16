import {useState} from 'react';
import axios from 'axios';

const useDeleteVehicle = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const deleteVehicle = async (vehicleId: number, token: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.delete(
                `https://maintenancesystembc-production.up.railway.app/api/v1/vehicles/${vehicleId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            if (response.status === 200) {
                console.log('Vehicle deleted successfully:', response.data);
                return true;
            }
        } catch (err: any) {
            setError(err.message || 'Something went wrong!');
            return false;
        } finally {
            setLoading(false);
        }
    };

    return {deleteVehicle, loading, error};
};

export default useDeleteVehicle;
