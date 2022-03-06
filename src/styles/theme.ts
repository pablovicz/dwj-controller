import { extendTheme } from '@chakra-ui/react';

const grayColors = {
    "900": "#181b23",
    "800": "#1f2029",
    "700": "#353646",
    "600": "#4b4d63",
    "500": "#616480",
    "400": "#797D9A",
    "300": "#9699B0",
    "200": "#B3B5C6",
    "100": "#D1D2DC",
    "50": "#EEEEF2"
}

const fonts = {
    heading: 'Roboto',
    body: 'Roboto'
}


export const themeDark = extendTheme({
    colors: {
        gray: grayColors,
        modalBackground: "#1f2029"
    },
    fonts: fonts,
    styles: {
        global: {
            body: {
                bg: 'gray.900',
                color: 'gray.50'
            }
        }
    }
});


export const themeLight = extendTheme({
    colors: {
        gray: grayColors,
        modalBackground: "#D1D2DC"
    },
    fonts: fonts,
    styles: {
        global: {
            body: {
                bg: 'gray.50',
                color: 'gray.900'
            }
        }
    }
});