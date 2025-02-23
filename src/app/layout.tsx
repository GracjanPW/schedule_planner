import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cookies } from "next/headers";
import { GetSession } from "@/db/session";
import { Auth } from "@/features/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Schedule",
  description: "Schedule your day with ease",
};

export default async function RootLayout({
  auth,
  children,
}: Readonly<{
  children: React.ReactNode;
  auth: React.ReactNode;
}>) {
  const session = await Auth();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        {!session && auth}
      </body>
    </html>
  );
}
