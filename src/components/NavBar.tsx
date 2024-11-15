import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colorsDarkMode from '../theme/colorsDarkMode';
import colorsLightMode from '../theme/colorsLightMode';
import {useTheme} from '../theme/ThemeContext';

const NavBar: React.FC = () => {
    const {darkMode, setDarkMode} = useTheme();
    const colors = darkMode ? colorsDarkMode : colorsLightMode;

    return (
        <View
            style={[
                styles.navbarContainer,
                {backgroundColor: colors.navBackground},
            ]}>
            <Text style={[styles.navTitle, {color: colors.text}]}>
                Belatix SA
            </Text>
            <TouchableOpacity
                style={styles.iconButton}
                onPress={() => setDarkMode(!darkMode)}>
                <FontAwesome
                    name={darkMode ? 'sun-o' : 'moon-o'}
                    size={24}
                    color={colors.text}
                />
            </TouchableOpacity>
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
    iconButton: {
        padding: 8,
    },
});

export default NavBar;
