import React, {useState} from 'react';
import {View, TextInput, Text, TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native';
import NavBar from '../components/NavBar';
import {useTheme} from '../theme/ThemeContext';
import useLogin from '../hooks/useLogin';
import ColorsDarkMode from '../theme/ColorsDarkMode';
import ColorsLightMode from '../theme/ColorsLightMode';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const LoginScreen = ({navigation}: any) => {
    const {darkMode} = useTheme();
    const colors = darkMode ? ColorsDarkMode : ColorsLightMode;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const {login, loading, error} = useLogin();

    const handleLogin = async () => {
        const token = await login(username, password);
        console.log('Login token:', token);
        if (token) {
            await AsyncStorage.setItem('userToken', token);
            navigation.navigate('VehiclesScreen', {token});
        } else {
            console.log('Login failed, no token returned');
        }
    };

    return (
        <View style={[styles.container, {backgroundColor: colors.background}]}>
            <NavBar />
            <View style={styles.formContainer}>
                <Text style={[styles.title, {color: colors.text}]}>Login</Text>
                <TextInput
                    style={[styles.input, {borderColor: colors.text, color: colors.text}]}
                    placeholder="Username"
                    placeholderTextColor={colors.text}
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput
                    style={[styles.input, {borderColor: colors.text, color: colors.text}]}
                    placeholder="Password"
                    placeholderTextColor={colors.text}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                {error && <Text style={styles.errorText}>{error}</Text>}
                <TouchableOpacity
                    style={[styles.button, {backgroundColor: colors.link}]}
                    onPress={handleLogin}>
                    {loading ? (
                        <ActivityIndicator size="small" color={colors.text} />
                    ) : (
                        <Text style={[styles.buttonText, {color: colors.text}]}>Log In</Text>
                    )}
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.linkButton, {borderColor: colors.text}]}
                    onPress={() => navigation.navigate('Register')}>
                    <Text style={[styles.linkText, {color: colors.text}]}>
                        Don't have an account? Register
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 10,
        marginBottom: 15,
    },
    button: {
        width: '100%',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    linkButton: {
        marginTop: 10,
        borderBottomWidth: 1,
    },
    linkText: {
        fontSize: 16,
        textAlign: 'center',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
});

export default LoginScreen;
