import type { Metadata } from "next";
import "./globals.css";
import 'primereact/resources/primereact.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primeicons/primeicons.css';

import { PrimeReactProvider } from 'primereact/api';

export const metadata: Metadata = {
  title: "Imgur Search",
  description: "Search for images and gifs using Imgur's API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PrimeReactProvider value={{ unstyled: false }}>
      <html lang="en">
        <body className="min-h-screen h-screen flex flex-col">{children}</body>
      </html>
    </PrimeReactProvider>
  );
}
