import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import NavBar from '../components/NavBar';
import {useTheme} from '../theme/ThemeContext';
import ColorsDarkMode from '../theme/ColorsDarkMode';
import ColorsLightMode from '../theme/ColorsLightMode';

const HomeScreen = ({navigation}: any) => {
    const {darkMode} = useTheme();
    const colors = darkMode ? ColorsDarkMode : ColorsLightMode;

    return (
        <View style={[styles.supContainer, {backgroundColor: colors.background}]}>
            <NavBar />
            <View style={[styles.container]}>
                <Image source={require('../assets/logo.png')} style={styles.logo} />
                <Text style={[{color: colors.text}]}>Welcome to Belatrix S.A manager</Text>
                <Text style={styles.subText}>
                    Manage your vehicles efficiently and effortlessly
                </Text>

                <TouchableOpacity
                    style={[styles.button, {backgroundColor: colors.link}]}
                    onPress={() => navigation.navigate('Login')}>
                    <Text style={[styles.buttonText, {color: colors.text}]}>Log In</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.registerButton]}
                    onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    supContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center', // Centramos verticalmente
        alignItems: 'center',
        paddingHorizontal: 20, // Añadir espacio lateral
        paddingTop: 20, // Evitar que el contenido se solape con el NavBar
    },
    logo: {
        width: 300,
        height: 200,
        marginBottom: 20,
        borderRadius: 8,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff', // El color del texto se ajustará al modo oscuro
        textAlign: 'center',
        marginBottom: 10,
    },
    subText: {
        fontSize: 16,
        color: '#aaa', // Texto más claro en modo oscuro
        textAlign: 'center',
        marginBottom: 30,
    },
    button: {
        width: '80%',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 15,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    registerButton: {
        backgroundColor: '#28a745',
    },
});

export default HomeScreen;
