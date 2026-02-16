import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";

/** * Optimized Font Loading:
 * We use 'display: swap' to ensure text is visible immediately.
 * Variables are used to sync with your globals.css.
 */
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

export const metadata: Metadata = {
  title: "Shape Wellness | Premium Aesthetic Clinic Chennai",
  description: "Advanced Skin Care, Slimming, Hair Restoration, and Laser Technology at Kolapakkam, Chennai. Transform your beauty with science-backed treatments.",
  keywords: ["Aesthetic Clinic Chennai", "Skin Care Kolapakkam", "Slimming Treatment Chennai", "Hair Restoration", "Shape Wellness"],
  authors: [{ name: "Shape Wellness Team" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${playfair.variable}`}>
      <head>
        {/* Preconnecting to FontAwesome speeds up the icon load.
            We use Next.js Script component for better performance.
        */}
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" 
          integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg==" 
          crossOrigin="anonymous" 
          referrerPolicy="no-referrer" 
        />
      </head>
      <body className="antialiased font-manrope bg-white text-gray-900">
        {/* The 'antialiased' class makes the fonts look smoother on macOS/iOS devices,
            which fits the premium look of your wellness clinic.
        */}
        {children}
      </body>
    </html>
  );
}