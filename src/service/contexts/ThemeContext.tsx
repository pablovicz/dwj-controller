import { useTheme } from "@chakra-ui/react";
import { createContext, ReactNode, useEffect, useState } from "react";
import { themeDark, themeLight } from "../../styles/theme";
import { useCookies } from "../hooks/useCookies";


type ThemeContextData = {
    theme: any;
    isDarkTheme: boolean;
    handleThemeToggle: () => void;
}

type ThemeProviderProps = {
    children: ReactNode;
}


export const ThemeContext = createContext({} as ThemeContextData);

export function ThemeProvider({ children }: ThemeProviderProps) {

    const { getCookieData, updateCookieData } = useCookies();

    const hasThemeSaved = getCookieData('theme');

    const [isDarkTheme, setIsDarkTheme] = useState(() => {
        if(hasThemeSaved){
            return hasThemeSaved.isDark;
        } else {
            return true;
        }
    });
    const [theme, setTheme] = useState(themeDark);

    useEffect(() => {
        if (isDarkTheme) {
            setTheme(themeDark);
        } else {
            setTheme(themeLight);
        }
    }, [isDarkTheme]);



    function handleThemeToggle(){
        const isDark = !isDarkTheme;
        setIsDarkTheme(isDark);
        updateCookieData('theme', 60 * 60 * 24 * 30, {isDark: isDark});
    }


    return (
        <ThemeContext.Provider value={{ theme, handleThemeToggle, isDarkTheme}}>
            {children}
        </ThemeContext.Provider>
    );


}


