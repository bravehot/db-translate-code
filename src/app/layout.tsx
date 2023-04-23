"use client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ConfigProvider } from "antd";

import Background from "./components/Background";
import Header from "./components/Header";

import "./globals.css";
import theme from "./utils/theme";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={new QueryClient()}>
          <ConfigProvider theme={theme}>
            <main className="max-w-5xl h-screen mx-auto flex flex-col relative z-10 overflow-hidden pb-4">
              <Header />
              {children}
            </main>
            <Background />
            <ReactQueryDevtools />
          </ConfigProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
