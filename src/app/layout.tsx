"use client";
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
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="./favicon.ico" />
        <title>Tutu Code</title>
      </head>
      <body>
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
