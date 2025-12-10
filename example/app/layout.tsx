import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "koin.js Demo — Browser Retro Game Emulation",
  description: "Demo for koin.js — the drop-in React component for browser-based retro game emulation.",
  keywords: ["retro gaming", "emulator", "web assembly", "nostalgist", "nextjs", "react", "koin.js"],
  openGraph: {
    title: "koin.js Demo — Browser Retro Game Emulation",
    description: "Play retro games directly in the browser with koin.js.",
    type: "website",
    siteName: "koin.js",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@theretrosaga",
    title: "koin.js Demo",
    description: "Browser Retro Game Emulation by The Retro Saga",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
