import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import SocialFloat from "@/components/SocialFloat";

const manrope = Manrope({ 
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["300", "400", "600"],
  display: 'swap', // Optimization for performance
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "700"], 
  style: ["normal", "italic"],
  display: 'swap', // Optimization for performance
});

export const metadata: Metadata = {
  title: "Contact Us | Shape Wellness",
  description: "Aesthetic Clinic Contact Page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
      </head>
      <body className={`${manrope.className} ${playfair.variable}`}>
        {children}
        
        {/* Floating elements visible on all pages */}
        <SocialFloat />
        
      </body>
    </html>
  );
}