import { destroyCookie, parseCookies, setCookie } from "nookies";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useCookies } from "../hooks/useCookies";

type PreferencesData = {
    workJourney: number;
    breakTime: number;
    extraTime: number;
}


type ParametersContextData = {
    preferencesData: PreferencesData;
    saveParametersData: (workJouney: number, breakTime: number, extraTime: number) => void;
    getSavedPreferences: () => PreferencesData;
};

export const ParametersContext = createContext({} as ParametersContextData);


type ParametersProviderProps = {
    children: ReactNode;
}

export function ParametersProvider({ children }: ParametersProviderProps) {

    const { getCookieData, updateCookieData } = useCookies();

    const [preferencesData, setPreferencesData] = useState<PreferencesData>({ workJourney: 8, breakTime: 90, extraTime: 0 } as PreferencesData);

    const defaultPreferences = { workJourney: 8, breakTime: 90, extraTime: 0 };

    const cookieIsAllowed = getCookieData('allowcookieuse');

    useEffect(() => {

        if (cookieIsAllowed) {
            const preferences = getCookieData('preferences');
            if (preferences) {
                setPreferencesData(preferences);
            }
        }

    }, [])


    async function saveParametersData(workJouney: number, breakTime: number, extraTime: number) {

        if (cookieIsAllowed) {
            const data = { workJourney: workJouney, breakTime: breakTime, extraTime: extraTime }
            setPreferencesData(data);
            updateCookieData('preferences', 60 * 60 * 24 * 30, data);
        }
    }

    function getSavedPreferences() {
        if (cookieIsAllowed) {
            const preferences = getCookieData('preferences');
            if (preferences) {
                return preferences;
            }
        } else {
            return defaultPreferences;
        }
    }




    return (
        <ParametersContext.Provider value={{ preferencesData, saveParametersData, getSavedPreferences }}>
            {children}
        </ParametersContext.Provider>
    );
}