import React from 'react';
import AppNavigator from './src/screens/AppNavigator';
import { ThemeProvider } from './src/theme/ThemeContext';

function App(): React.JSX.Element {
    return (
        <ThemeProvider>
            <AppNavigator />
        </ThemeProvider>
    );
}

export default App;
