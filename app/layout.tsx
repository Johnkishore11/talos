import type { Metadata } from "next";
import { Zen_Dots, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/_core/navbar/Navbar";
import Footer from "@/components/_core/footer/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import Ribbons from "@/components/ui/Ribbons";
import CustomCursor from "@/components/ui/CustomCursor";

// Only load most essential fonts - reduced from 5 to 2
const zenDots = Zen_Dots({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-zen-dots",
  display: "swap", // Ensure text is visible while font loads
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "College Symposium 2025",
  description: "Official website for College Symposium 2025",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`min-h-screen flex flex-col ${zenDots.variable} ${ibmPlexMono.variable}`}>
        <CustomCursor />
        <Ribbons
          baseThickness={10}
          colors={['#ff0000']}
          speedMultiplier={1.0}
          maxAge={400}
          pointCount={25}
          enableFade={false}
          enableShaderEffect={false}
        />
        <SmoothScroll>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}