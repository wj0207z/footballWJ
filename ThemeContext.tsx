import { createContext, useState } from 'react';

// Define the colors for your themes
export const themes = {
    light: { background: '#f5f5f5', text: '#333', card: '#fff' },
    dark: { background: '#121212', text: '#ffffff', card: '#1e1e1e' },
    };

    export const ThemeContext = createContext<any>(null);

    export const ThemeProvider = ({ children }: any) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const theme = isDarkMode ? themes.dark : themes.light;

    return (
        <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode, theme }}>
        {children}
        </ThemeContext.Provider>
    );
};