import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { NavVisibilityProvider } from "@/components/shared/NavVisibilityProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VIJAKO - Verified Hyperlocal Platform",
  description: "One app for high-value services: Doctor, Events, Education, Business, Travel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <AuthProvider>
          <NavVisibilityProvider>
            {children}
          </NavVisibilityProvider>
        </AuthProvider>
      </body>
    </html>
  );
}