interface IColorsDark {
    background: string;
    text: string;
    link: string;
    hover: string;
    navBackground: string;
    placeHolder: string;
    inputBackground: string;
    warning: string;
    error: string;
    success: string;
}
const ColorsDarkMode: IColorsDark = {
    background: '#121212', // Fondo general
    text: '#FFFFFF', // Texto principal
    link: '#FF9800', // Enlaces
    hover: '#FFC107', // Hover sobre enlaces/botones
    navBackground: '#1E1E1E', // Fondo de la barra de navegación
    placeHolder: '#757575', // Texto de marcador de posición
    inputBackground: '#1F1F1F', // Fondo de los inputs
    warning: '#FFCA28', // Advertencias
    error: '#FF5252', // Errores
    success: '#4CAF50', // Éxitos
};

export default ColorsDarkMode;
