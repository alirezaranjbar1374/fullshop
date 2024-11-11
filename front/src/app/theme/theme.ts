'use client';

import { createTheme } from "@mui/material/styles";
declare module '@mui/material/styles' {
    interface Palette {
        customColor: Palette['primary']; // تعریف نوع جدید
    }
    interface PaletteOptions {
        customColor?: PaletteOptions['primary']; // تعریف نوع جدید
    }
}
export const lightTheme = createTheme({
    direction: "rtl",
    palette: {
        mode: "light",
        primary: {
            main: "#8be9fd",
        },
        secondary: {
            main: "#bd93f9",
        },
      
        
        customColor: { // اضافه کردن رنگ سفارشی
            main: "#bbd91a", // رنگ اصلی سفارشی
            
        },
        
    },
    typography: {
        fontFamily: "tanha, vazir, roboto",
    },
});

export const darkTheme = createTheme({
    direction: "rtl",
    palette: {
        mode: "dark",
        primary: {
            main: "#8be9fd",
        },
        secondary: {
            main: "#bd93f9",
        },
    },
    typography: {
        fontFamily: "tanha, vazir, roboto",
    },
});
