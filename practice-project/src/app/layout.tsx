import type { Metadata } from "next";
import "./globals.css";
import ClientProvider from "../ClientProvider";


export const metadata: Metadata = {
  title: "My First Full Stack Project Using Next.js",
  description: "this is my first project of backend in next js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientProvider>
        {children}
        </ClientProvider>
      </body>
    </html>
  );
}
