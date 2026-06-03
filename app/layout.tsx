import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import OfflineBanner from "@/components/OfflineBanner";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
 });

export const metadata: Metadata = {
  title: "Salon Rewards",
  description: "Reward your regulars — salon loyalty made simple",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "icon", url: "/android-chrome-192x192.png", sizes: "192x192" },
      { rel: "icon", url: "/android-chrome-512x512.png", sizes: "512x512" },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F8FAFC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-dvh flex flex-col font-sans bg-bg text-text">
        <OfflineBanner />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
