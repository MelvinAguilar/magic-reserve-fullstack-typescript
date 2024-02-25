import { AuthProvider } from "@/context/AuthContext";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import "./globals.css";

const polySans = localFont({
  src: "../public/fonts/PolySans-Slim.woff2",
  variable: "--font-poly-sans",
  display: "block",
});

const monaSans = localFont({
  src: [
    {
      path: "../public/fonts/MonaSans-Regular.woff2",
      style: "normal",
      weight: "400",
    },
    {
      path: "../public/fonts/MonaSans-Medium.woff2",
      style: "normal",
      weight: "500",
    },
  ],
  variable: "--font-mona-sans",
  display: "block",
  declarations: [
    {
      prop: "font-stretch",
      value: "75% 125%",
    },
  ],
});

export const metadata: Metadata = {
  title: "Magic Reserve",
  description: "Full stack application for reserving a tour",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${monaSans.variable} ${polySans.variable}`}>
        <AuthProvider>{children}</AuthProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
