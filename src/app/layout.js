import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Cleanboosts #1",
  description: "Affordable and discounted Discord boosts for your server.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Cleanboosts #1",
    description: "Affordable and discounted Discord boosts for your server.",
    url: "https://cleanboosts.com",
    siteName: "Cleanboosts",
    images: [
      {
        url: "/image/header.gif",
        width: 1280,
        height: 720,
        type: "image/gif",
        alt: "Cleanboosts animated preview",
      }
    ],
    videos: [
      {
        url: "/image/header.mp4",
        width: 1280,
        height: 720,
        type: "video/mp4",
        alt: "Cleanboosts promotional video",
      }
    ],
    locale: "en_US",
    type: "website",
  },
  
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>

      <Script type="module" src="https://public.sellhub.cx/embeds.js"/>
      <meta property="og:title" content="Cleanboosts #1" />
        <meta property="og:description" content="Affordable and discounted Discord boosts for your server." />
        <meta property="og:url" content="https://cleanboosts.com" />
        <meta property="og:site_name" content="Cleanboosts" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://cleanboosts.com/image/header.gif" />
        <meta property="og:image:type" content="image/gif" />
        <meta property="og:image:width" content="1280" />
        <meta property="og:image:height" content="720" />
        <meta property="og:image:alt" content="Cleanboosts animated preview" />

      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
