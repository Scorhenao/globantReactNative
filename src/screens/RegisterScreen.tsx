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
import useRegister from '../hooks/useRegister';

const RegisterScreen = ({navigation}: any) => {
    const {darkMode} = useTheme();
    const colors = darkMode ? colorsDarkMode : colorsLightMode;

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {register, loading} = useRegister();

    const handleRegister = async () => {
        const {success, data, message} = await register(
            username,
            email,
            password,
        );
        if (success) {
            navigation.navigate('Home'); // Navigate to HomeScreen after successful registration
        } else {
            console.log(message); // Optionally handle the error message further
        }
    };

    return (
        <View style={[styles.container, {backgroundColor: colors.background}]}>
            <NavBar />
            <View style={styles.formContainer}>
                <Text style={[styles.title, {color: colors.text}]}>
                    Register
                </Text>
                <TextInput
                    style={[styles.input, {borderColor: colors.text}]}
                    placeholder="Username"
                    placeholderTextColor={colors.text}
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput
                    style={[styles.input, {borderColor: colors.text}]}
                    placeholder="Email"
                    placeholderTextColor={colors.text}
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={[styles.input, {borderColor: colors.text}]}
                    placeholder="Password"
                    placeholderTextColor={colors.text}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity
                    style={[styles.button, {backgroundColor: colors.link}]}
                    onPress={handleRegister}
                    disabled={loading}>
                    {loading ? (
                        <ActivityIndicator
                            size="small"
                            color={colors.background}
                        />
                    ) : (
                        <Text style={[styles.buttonText, {color: colors.text}]}>
                            Register
                        </Text>
                    )}
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.linkButton, {borderColor: colors.text}]}
                    onPress={() => navigation.navigate('Login')}>
                    <Text style={[styles.linkText, {color: colors.text}]}>
                        Already have an account? Login
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
});

export default RegisterScreen;
