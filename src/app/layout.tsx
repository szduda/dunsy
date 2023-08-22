import { AuthContextProvider } from "@/features";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Edundytor",
  description: "Allows to CRUD rhythm snippets",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <header className="flex justify-center items-center pt-14 pb-8 px-4 w-full">
            <Image
              src="logo.svg"
              alt="logo"
              width={80}
              height={36}
              className="animate-bounce"
            />
            <h1 className="font-black p-4 text-3xl text-orange-600 hidden md:block">
              edundytor
            </h1>
          </header>
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
