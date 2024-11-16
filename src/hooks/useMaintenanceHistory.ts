import {useState, useEffect} from 'react';

interface MaintenanceData {
    id: number;
    type: string;
    date: string;
    mileage: number;
    notes: string;
}

interface UseMaintenanceHistoryResponse {
    maintenanceData: MaintenanceData[] | null;
    loading: boolean;
    error: string | null;
}

const useMaintenanceHistory = (
    vehicleId: number,
    token: string | null,
): UseMaintenanceHistoryResponse => {
    const [maintenanceData, setMaintenanceData] = useState<MaintenanceData[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (vehicleId && token) {
            const fetchMaintenanceHistory = async () => {
                setLoading(true);
                setError(null);

                try {
                    const response = await fetch(
                        `https://maintenancesystembc-production.up.railway.app/api/v1/vehicles/${vehicleId}/maintenance`,
                        {
                            method: 'GET',
                            headers: {
                                Authorization: `Bearer ${token}`,
                                'Content-Type': 'application/json',
                            },
                        },
                    );

                    const data = await response.json();

                    if (response.status === 200) {
                        setMaintenanceData(data.data);
                    } else {
                        setError(data.message || 'Unknown error');
                    }
                } catch (err) {
                    setError('Error fetching maintenance history');
                } finally {
                    setLoading(false);
                }
            };

            fetchMaintenanceHistory();
        }
    }, [vehicleId, token]);

    return {
        maintenanceData,
        loading,
        error,
    };
};

export default useMaintenanceHistory;
