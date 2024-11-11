'use client';
import { CssBaseline } from "@mui/material";
import React, { PropsWithChildren } from "react";
import { CacheProvider } from "@emotion/react";
import createCache from '@emotion/cache';
import rtlPlugin from "stylis-plugin-rtl";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "./theme/theme";
import { prefixer } from 'stylis';


const cacheRTL = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });
  const theme =  lightTheme;

export const MainLayout: React.FC<PropsWithChildren> = ({ children }) => (
    
  <React.Fragment>
            <CacheProvider value={cacheRTL}>
            <ThemeProvider theme={theme}>



    <CssBaseline />
    {children}
    </ThemeProvider>

    </CacheProvider>

  </React.Fragment>
)