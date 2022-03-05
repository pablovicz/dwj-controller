import { destroyCookie, parseCookies, setCookie } from "nookies";


export function useCookies() {

    function getTransformedData(data: Object | string) {
        return  typeof data === 'object' ? JSON.stringify(data) : data;
    }

    function getTransformCookieData(data: string){
        try {
            const dataAsObj = JSON.parse(data)
            return dataAsObj
        } catch (err) {
            return data;
        }
    }

    function createCookie(cookieKey: string, data: Object | string, maxAge: number) {
        setCookie(undefined, cookieKey, getTransformedData(data), {
            maxAge: maxAge,
            path: '/'
        });
    }

    function getKeyName(cookieName: string){
        return `workjourneycontroller.${cookieName.toLowerCase()}`;
    }


    function updateCookieData(cookieName: string, maxAge: number = 60 * 60 * 24 * 30, data: Object | string) {
        
        const cookieKey = getKeyName(cookieName);
        const cookieData = getCookieData(cookieName);
        
        if (cookieData) {
            destroyCookie(undefined, cookieKey);
        }
        createCookie(cookieKey, data, maxAge);
    }


    function saveCookie(cookieName: string, maxAge: number = 60 * 60 * 24 * 30, data: Object | string) {
        const cookieKey = getKeyName(cookieName);
        createCookie(cookieKey, data, maxAge);
    }

    function deleteCookie(cookieName: string){
        const cookieData = getCookieData(cookieName);
        const cookieKey = getKeyName(cookieName);
        if (cookieData) {
            destroyCookie(undefined, cookieKey);
        }
    }

    function getCookieData(cookieName: string){
        const cookieKey = getKeyName(cookieName);
        const cookies = parseCookies();
        
        if(cookies){
            const cookieExists = Object.keys(cookies).filter(c => (c === cookieKey)).length > 0
            if(cookieExists) {
                const cookieData = cookies[cookieKey]
                return getTransformCookieData(cookieData)
            }
            return false
            
        }
    }


    return { updateCookieData, saveCookie, deleteCookie, getCookieData };
}