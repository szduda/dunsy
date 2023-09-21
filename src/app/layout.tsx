import { FC, ReactNode } from "react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Inter } from "next/font/google";
import { Layout } from "@/features";
import { SnippetCard, getSnippets } from "@/features/SnippetApi";
import { MidiSounds } from "@/lib/MidiSounds";
import { cx } from "@/utils";
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

const RootLayout: FC<{ children: ReactNode }> = async (props) => {
  const biscuits = cookies();
  const lastFetchAt = biscuits.has("lastFetchAt")
    ? Number(biscuits.get("lastFetchAt"))
    : -1;
  const needRefetch = Date.now() > lastFetchAt + 24 * 3600 * 1000;

  const fetchedSnippets = needRefetch
    ? await getSnippets(undefined, { limit: 1000 })
    : null;

  console.log(fetchedSnippets?.length, "grooves fetched");

  return (
    <html lang="en">
      <body
        className={cx([
          inter.className,
          "bg-[url('/bg_mobile.jpg')] md:bg-[url('/bg.jpg')] bg-cover bg-fixed",
        ])}
      >
        <MidiSounds>
          <Layout {...props} data={fetchedSnippets} />
        </MidiSounds>
      </body>
    </html>
  );
};

export default RootLayout;
