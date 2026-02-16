import type { Metadata, Viewport } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";

// 1. Optimized Font Loading
// Google Fonts are hosted locally by Next.js automatically
const manrope = Manrope({ 
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["300", "400", "500", "600", "700"],
  display: 'swap',
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "700"], 
  style: ["normal", "italic"],
  display: 'swap',
});

// 2. Separate Viewport Export (Fixes the Next.js warning)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff", // Good for mobile browser branding
};

// 3. SEO Metadata
export const metadata: Metadata = {
  title: "Shape Wellness | Premium Aesthetic Clinic Chennai",
  description: "Advanced Skin Care, Slimming, Hair Restoration, and Laser Technology at Kolapakkam, Chennai. Transform your beauty with science-backed treatments.",
  keywords: ["Aesthetic Clinic Chennai", "Skin Care Kolapakkam", "Slimming Treatment Chennai", "Hair Restoration", "Shape Wellness"],
  authors: [{ name: "Shape Wellness Team" }],
  // viewport is removed from here
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${playfair.variable}`}>
      <head>
        {/* Preconnect to FontAwesome CDN for faster discovery */}
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
        
        {/* Optimization: 'media="print" onload="this.media=\'all\'"' 
          This is a trick to load CSS asynchronously. It prevents the 
          icon stylesheet from blocking the initial page render.
        */}
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" 
          integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg==" 
          crossOrigin="anonymous" 
          referrerPolicy="no-referrer"
          media="print"
          // @ts-ignore
          onLoad="this.media='all'"
        />
      </head>
      <body className="antialiased font-manrope bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}