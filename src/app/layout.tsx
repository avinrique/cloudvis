import type { Metadata } from "next";
import { Space_Mono, Outfit, Fira_Code } from "next/font/google";
import "./globals.css";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cloud Computing — Session 2: Deep Dive",
  description: "An interactive visual deep dive into cloud service models, virtualization, storage, scaling, and serverless architecture",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceMono.variable} ${outfit.variable} ${firaCode.variable} font-body antialiased bg-void text-primary`}
      >
        {children}
      </body>
    </html>
  );
}
