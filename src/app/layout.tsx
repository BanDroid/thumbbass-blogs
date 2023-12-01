import Script from "next/script";
import { Navbar } from "@/components/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { mainFont, openSans } from "@/config/fonts";
import Drawer from "@/components/Drawer";
import connectDB from "@/app/api/connect";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "ThumbBass",
  description: "Professional Music Producer",
  icons: [
    { rel: "icon", url: "/logo.png", media: "(prefers-color-scheme: light)" },
    {
      rel: "icon",
      url: "/logo-dark.png",
      media: "(prefers-color-scheme: dark)",
    },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // await connectDB();
  return (
    <html lang="en">
      <body
        data-theme="cmyk"
        className={`${openSans.className} min-h-screen bg-base-100`}
      >
        <Navbar />
        <Drawer>{children}</Drawer>
        <Footer />
        <Script src="https://unpkg.com/@gabrielfins/ripple-effect@latest/dist/ripples.js"></Script>
      </body>
    </html>
  );
}
