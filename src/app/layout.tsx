import { FC, ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MidiSounds } from "@/lib/MidiSounds";
import { cx } from "@/utils";
import "./globals.css";
import { Layout } from "@/features/rsc";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "dunsy.app",
  description:
    "Listen to groovy loops of West African dundun drums and enjoy your drumming practice. Wasa wasa!",
  openGraph: {
    images: ["/og.png"],
  },
  icons: [
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicons/fav-32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "64x64",
      url: "/favicons/fav-64.png",
    },
  ],
};

const RootLayout: FC<{ children: ReactNode }> = async (props) => {
  return (
    <html lang="en">
      <body
        className={cx([
          inter.className,
          "md:bg-[url('/bg.jpg')] bg-cover bg-center bg-fixed text-whitey bg-greeny-darkest",
        ])}
      >
        <MidiSounds>
          <Layout {...props} />
        </MidiSounds>
      </body>
    </html>
  );
};

export default RootLayout;
