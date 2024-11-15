interface IColorsLight {
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

const ColorsLightMode: IColorsLight = {
    background: '#fff8E1', // Fondo general
    text: '#000000', // Texto principal
    link: '#ff8F00', // Enlaces
    hover: '#FFB300', // Hover sobre enlaces/botones
    navBackground: '#FF6F00', // Fondo de la barra de navegación
    placeHolder: '#ff8F00', // Texto de marcador de posición
    inputBackground: '#fff5E8', // Fondo de los inputs
    warning: '#FFC107', // Advertencias
    error: '#FF4900', // Errores
    success: '#009920', // Éxitos
};

export default ColorsLightMode;
