import { ComponentProps, FC } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Layout } from "@/features";
import { MidiSounds } from "@/lib/MidiSounds";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "dunsy.app",
  description: "Phrases, patterns and arranges for West African dundun drums",
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

const RootLayout: FC<ComponentProps<typeof Layout>> = (props) => (
  <html lang="en">
    <body
      className={inter.className}
      style={{
        backgroundImage: `url('/bg.jpg')`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <MidiSounds>
        <Layout {...props} />
      </MidiSounds>
    </body>
  </html>
);

export default RootLayout;
