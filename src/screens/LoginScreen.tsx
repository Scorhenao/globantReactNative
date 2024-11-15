// src/screens/Login.tsx
import React, {useState} from 'react';
import {
    View,
    TextInput,
    Text,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import NavBar from '../components/NavBar';
import colorsDarkMode from '../theme/colorsDarkMode';
import colorsLightMode from '../theme/colorsLightMode';
import {useTheme} from '../theme/ThemeContext';
import useLogin from '../hooks/useLogin'; // Importar el hook

const LoginScreen = ({navigation}: any) => {
    const {darkMode} = useTheme();
    const colors = darkMode ? colorsDarkMode : colorsLightMode;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const {login, loading, error} = useLogin(); // Usar el hook

    const handleLogin = async () => {
        const token = await login(username, password);
        if (token) {
            navigation.navigate('Home'); // Navegar a HomeScreen si el login es exitoso
        }
    };

    return (
        <View style={[styles.container, {backgroundColor: colors.background}]}>
            <NavBar />
            <View style={styles.formContainer}>
                <Text style={[styles.title, {color: colors.text}]}>Login</Text>
                <TextInput
                    style={[styles.input, {borderColor: colors.text}]}
                    placeholder="Username"
                    placeholderTextColor={colors.text}
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput
                    style={[styles.input, {borderColor: colors.text}]}
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
                        <Text style={[styles.buttonText, {color: colors.text}]}>
                            Log In
                        </Text>
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
