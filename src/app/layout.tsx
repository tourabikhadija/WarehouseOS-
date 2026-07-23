import type { Metadata } from "next";
import { Geist, Geist_Mono, Iceland } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/SessionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const iceland = Iceland({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "WarehouseOS",
  description: "Warehouse Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className={`${iceland.className} min-h-full flex flex-col`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}