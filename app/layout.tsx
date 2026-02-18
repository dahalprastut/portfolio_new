import type { Metadata } from "next";
import { Syne, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { RegionProvider } from "@/lib/region-context";
import { SmoothScrollProvider } from "@/lib/smooth-scroll";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import Footer from "@/components/Footer";
import TransitionCurtain from "@/components/TransitionCurtain";
import LoadingScreen from "@/components/LoadingScreen";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Prastut Dahal — Front End Developer",
  description:
    "Portfolio of Prastut Dahal, a multidisciplinary web developer specializing in React, Next.js, and modern front-end development.",
  keywords: [
    "Prastut Dahal",
    "Front End Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Portfolio",
  ],
  authors: [{ name: "Prastut Dahal" }],
  openGraph: {
    title: "Prastut Dahal — Front End Developer",
    description:
      "Multidisciplinary web developer specializing in React, Next.js, and modern front-end development.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased">
        <RegionProvider>
          <SmoothScrollProvider>
            <LoadingScreen />
            <CustomCursor />
            <ScrollProgress />
            <Navbar />
            <main>{children}</main>
            <Footer />
            <TransitionCurtain />
          </SmoothScrollProvider>
        </RegionProvider>
      </body>
    </html>
  );
}
