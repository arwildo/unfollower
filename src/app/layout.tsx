import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Unfollower",
  description: "Liat orang yang tidak follow kita dan juga orang yang unfollow kita di Instagram ✌",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "apple-touch-icon.png",
  },
  openGraph: {
    title: "Unfollower",
    description: "Liat orang yang tidak follow kita dan juga orang yang unfollow kita di Instagram ✌",
    url: "https://arwildo.com/unfollower",
    siteName: "Unfollower",
    images: [
      {
        url: "https://arwildo.com/unfollower/unfollower-preview.webp",
        width: 1200,
        height: 630,
        alt: "Unfollower preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Unfollower",
    description: "Liat orang yang tidak follow kita dan juga orang yang unfollow kita di Instagram ✌",
    images: ["https://arwildo.com/unfollower/unfollower-preview.webp"],
  },
};

// Separate viewport export
export const viewport = {
  width: "device-width",
  initialScale: 1,
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#FFC0CB" />
        <meta name="robots" content="index, follow" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}