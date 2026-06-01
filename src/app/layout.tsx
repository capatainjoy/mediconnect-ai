import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "MediConnect AI – Smart Hospital & Blood Bank Management",
    template: "%s | MediConnect AI",
  },
  description:
    "AI-powered hospital management platform connecting patients, hospitals, doctors, and blood banks. Book appointments, scan medical reports with AI, find nearby hospitals, and access blood bank services.",
  keywords: [
    "hospital management",
    "blood bank",
    "appointment booking",
    "AI medical reports",
    "healthcare platform",
    "doctor appointment",
    "MediConnect AI",
  ],
  authors: [{ name: "MediConnect AI" }],
  openGraph: {
    title: "MediConnect AI – Smart Hospital & Blood Bank Management",
    description:
      "AI-powered hospital management platform connecting patients, hospitals, doctors, and blood banks.",
    type: "website",
    locale: "en_IN",
  },
};

import { LanguageProvider } from "@/context/LanguageContext";
import SidebarLayout from "@/components/shared/SidebarLayout";
import { ThemeProvider } from "@/components/shared/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full font-sans">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <TooltipProvider>
            <LanguageProvider>
              <SidebarLayout>
                {children}
              </SidebarLayout>
            </LanguageProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
