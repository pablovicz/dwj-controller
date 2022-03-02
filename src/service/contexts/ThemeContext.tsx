import { destroyCookie, parseCookies, setCookie } from "nookies";
import { createContext, ReactNode, useEffect, useState } from "react";
import { themeDark, themeLight } from "../../styles/theme";


type ThemeContextData = {
    theme: any;
    saveTheme: (theme: 'dark' | 'light') => void;
    //getSavedTheme: () => any;
}

type ThemeProviderProps = {
    children: ReactNode;
}


export const ThemeContext = createContext({} as ThemeContextData);

export function ThemeProvider({ children }: ThemeProviderProps) {

    const [theme, setTheme] = useState(themeDark);

    useEffect(() => {
        const { 'workjourneycontroller.theme': savedTheme } = parseCookies();
        if (savedTheme) {
            const extendedTheme = getExtendedTheme(savedTheme);
            setTheme(extendedTheme);
        }
    }, [])

    function getExtendedTheme(theme: string) {
        if (theme === 'light') {
            return themeLight;
        }
        else if (theme === 'dark') {
            return themeDark;
        } else {
            return themeDark;
        }
    }

    async function saveTheme(theme: 'dark' | 'light') {
        const extendedTheme = getExtendedTheme(theme);
        setTheme(extendedTheme);
        const { 'workjourneycontroller.theme': savedTheme } = parseCookies();

        if (savedTheme) {
            destroyCookie(undefined, 'workjourneycontroller.theme');
        }
        setCookie(undefined, 'workjourneycontroller.theme', theme, {
            maxAge: 60 * 60 * 24 * 30, //30 days
            path: '/'
        });
    }

    return (
        <ThemeContext.Provider value={{ theme, saveTheme }}>
            {children}
        </ThemeContext.Provider>
    );


}


