import React from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import useVehicles from '../hooks/useVehicles';

const VehiclesScreen = ({token}: {token: string}) => {
    const {vehicles, loading, error} = useVehicles(token);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text>{error}</Text>;
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={vehicles}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                    <View style={styles.vehicleCard}>
                        <Image
                            source={{uri: item.photo}}
                            style={styles.vehicleImage}
                        />
                        <Text style={styles.vehicleText}>
                            {item.make} {item.model} ({item.year})
                        </Text>
                        <Text style={styles.vehicleText}>
                            License Plate: {item.licensePlate}
                        </Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    vehicleCard: {
        marginBottom: 20,
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
    },
    vehicleImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    vehicleText: {
        fontSize: 16,
        marginTop: 5,
    },
});

export default VehiclesScreen;
