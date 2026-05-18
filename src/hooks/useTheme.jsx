import { useEffect, useState } from 'react';

export const useTheme = () => {
    // Check localStorage first, default to 'light' if nothing is saved
    const [theme, setTheme] = useState(
        localStorage.getItem('theme') || 'light'
    );

    // Whenever the theme changes, update localStorage AND the HTML data-theme attribute
    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return { theme, toggleTheme };
};
