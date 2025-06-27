import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { PageNavBar } from "@/components/PageNavBar";
import { PagesProvider } from "@/hooks/usePages";
import { AddPageModalProvider } from "@/hooks/useAddPageModal";
import AddPageModal from "@/components/AddPageModal";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const blMelodyMedium = localFont({
  variable: "--font-blMelody",
  src: "./BLMelody-Medium.otf",
});

export const metadata: Metadata = {
  title: "Fillout Assessment",
  description: "Fillout Assessment by André Lima",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${blMelodyMedium.variable} antialiased w-screen h-screen bg-[#F9FAFB]`}
      >
        <PagesProvider>
          <AddPageModalProvider>
            <div className="bg-[#444444] text-white font-medium h-[calc(100%-72px)] w-[calc(100%-32px)] rounded-b-[12px] m-auto">
              {children}
            </div>
            <PageNavBar />
            <AddPageModal />
          </AddPageModalProvider>
        </PagesProvider>
      </body>
    </html>
  );
}
