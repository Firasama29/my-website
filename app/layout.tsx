import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
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
