import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LearntoDig",
  description: "Neft-qaz sahəsi üçün interaktiv öyrənmə platformu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="az">
      <body className={`${geistSans.variable} antialiased`}>
        <Navbar />
        <div className="pt-16">{children}</div>
      </body>
    </html>
  );
}