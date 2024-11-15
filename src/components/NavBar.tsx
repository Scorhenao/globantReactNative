import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme} from '../theme/ThemeContext';
import ColorsDarkMode from '../theme/ColorsDarkMode';
import ColorsLightMode from '../theme/ColorsLightMode';

const NavBar: React.FC<{navigation: any}> = ({navigation}) => {
    const {darkMode, setDarkMode} = useTheme();
    const colors = darkMode ? ColorsDarkMode : ColorsLightMode;

    // Handle logout functionality
    const handleLogout = async () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to log out?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: async () => {
                        await AsyncStorage.removeItem('userToken'); // Remove token
                        navigation.replace('Login'); // Redirect to login
                    },
                },
            ],
            {cancelable: false},
        );
    };

    return (
        <View style={[styles.navbarContainer, {backgroundColor: colors.navBackground}]}>
            <Text style={[styles.navTitle, {color: colors.text}]}>Belatix SA</Text>
            <View style={styles.iconGroup}>
                {/* Dark mode toggle */}
                <TouchableOpacity style={styles.iconButton} onPress={() => setDarkMode(!darkMode)}>
                    <FontAwesome
                        name={darkMode ? 'sun-o' : 'moon-o'}
                        size={24}
                        color={colors.text}
                    />
                </TouchableOpacity>
                {/* Logout button */}
                <TouchableOpacity style={styles.iconButton} onPress={handleLogout}>
                    <FontAwesome name="sign-out" size={24} color={colors.text} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    navbarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        height: 64,
        width: '100%',
        zIndex: 1,
    },
    navTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    iconGroup: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        padding: 4,
        marginLeft: 12,
    },
});

export default NavBar;
