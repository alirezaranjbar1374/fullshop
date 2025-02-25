import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';

import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from '@emotion/cache';
import { MainLayout } from "./MainLayout";

// import { prefixer } from "stylis";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
// const theme = mode === "dark" ? darkTheme : lightTheme;


const cache = createCache({ key: 'css' });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa">
      <body dir="rtl"
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
                

        <AppRouterCacheProvider options={{ enableCssLayer: true }}>

   


          <MainLayout>

        {children}
        </MainLayout>

   

        </AppRouterCacheProvider>

      </body>
    </html>
  );
}
