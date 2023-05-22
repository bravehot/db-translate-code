"use client";
import Script from "next/script";
import { ConfigProvider } from "antd";
import Background from "../components/Background";
import Header from "../components/Header";

import "./globals.css";
import theme from "../utils/theme";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("process.env.NODE_ENV: ", process.env.NODE_ENV);
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <title>Tutu Code</title>
      </head>
      <body>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', ${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID});
          `}
        </Script>

        <ConfigProvider theme={theme}>
          <main className="max-w-screen-xl h-screen mx-auto flex flex-col relative z-10 overflow-hidden pb-4">
            <Header />
            {children}
          </main>
          <Background />
        </ConfigProvider>
      </body>
    </html>
  );
}
