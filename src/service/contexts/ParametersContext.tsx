import { destroyCookie, parseCookies, setCookie } from "nookies";
import { createContext, ReactNode, useEffect, useState } from "react";

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


    const [preferencesData, setPreferencesData] = useState<PreferencesData>({workJourney: 8, breakTime: 90, extraTime: 0} as PreferencesData);


    useEffect(() => {
        const { 'workjourneycontroller.preferences': preferences } = parseCookies();

        if (preferences) {
            const data = JSON.parse(preferences);
            setPreferencesData(data);
        }

    }, [])


    async function saveParametersData(workJouney: number, breakTime: number, extraTime: number) {
        

        const data = { workJourney: workJouney, breakTime: breakTime, extraTime: extraTime }
        setPreferencesData(data);
        const { 'workjourneycontroller.preferences': preferences } = parseCookies();

        if (preferences) {
            destroyCookie(undefined, 'workjourneycontroller.preferences');
        }
        setCookie(undefined, 'workjourneycontroller.preferences', JSON.stringify(data), {
            maxAge: 60 * 60 * 24 * 30, //30 days
            path: '/'
        });
    }

    function getSavedPreferences(){
        const { 'workjourneycontroller.preferences': preferences } = parseCookies();
        if(preferences) {
            return JSON.parse(preferences);
        }
    }




    return (
        <ParametersContext.Provider value={{ preferencesData, saveParametersData, getSavedPreferences }}>
            {children}
        </ParametersContext.Provider>
    );
}