import AddMaintenanceScreen from '../AddMaintenanceScreen';
export type RootStackParamList = {
    AuthLoadingScreen: undefined;
    Home: undefined;
    AppContainer: undefined;
    Login: undefined;
    Register: undefined;
    VehiclesScreen: {token: string};
    AddVehicleScreen: undefined;
    EditVehicleScreen: {vehicleId: string};
    AddMaintenanceScreen: {vehicleId: string};
};
