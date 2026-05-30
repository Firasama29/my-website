import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Firas Ahmed | Software Engineer",
  description:
    "Portfolio of Firas Ahmed — backend software engineer specializing in Java, Spring Boot, and cloud-native development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-slate-800">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-slate-100 py-6 text-center text-sm text-slate-400">
          © {new Date().getFullYear()} Firas Ahmed. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
