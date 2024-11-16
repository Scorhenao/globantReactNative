import {useState} from 'react';
import axios from 'axios';

const useEditVehicle = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [vehicle, setVehicle] = useState<any>(null);

    const editVehicle = async (vehicleId: number, vehicleData: any, token: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.patch(
                `https://maintenancesystembc-production.up.railway.app/api/v1/vehicles/${vehicleId}`,
                vehicleData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                },
            );

            setVehicle(response.data);
            setLoading(false);
            return response.data;
        } catch (err: any) {
            setLoading(false);
            if (err.response && err.response.data) {
                setError(err.response.data.message || err.response.data.error);
            } else {
                setError('Something went wrong, please try again later.');
            }
        }
    };

    return {editVehicle, loading, error, vehicle};
};

export default useEditVehicle;
