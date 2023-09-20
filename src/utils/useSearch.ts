"use client";

import { SnippetCard, getSnippets } from "@/features/SnippetApi";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState<SnippetCard[] | null>();
  const [lastQuery, setLastQuery] = useState("");

  useEffect(() => {
    if (searchQuery === lastQuery) {
      return;
    }

    if (searchQuery.length < 3) {
      document.body.classList.remove("overflow-y-hidden");
      setSearchResults(null);
      setLastQuery("");
      search("");
      return;
    }

    if (["all", "grooves", "groves"].includes(searchQuery)) {
      router.push("/grooves");
    } else if (["help", "learn", "contact"].includes(searchQuery)) {
      router.push("/help");
    } else if (["story", "about", "clickbait"].includes(searchQuery)) {
      router.push("/story");
    } else {
      const asyncEffect = async () => {
        const snippets = await getSnippets(searchQuery, { limit: 50 });
        setSearchResults(snippets || []);
        setLoading(false);
        setLastQuery(searchQuery);
      };

      setLoading(true);
      document.body.classList.add("overflow-y-hidden");
      asyncEffect();
    }
  }, [searchQuery]);

  const search = (term?: string) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));

    if (!term) {
      params.delete("search");
    } else if (term.length > 2) {
      params.set("search", term);
    }

    const query = params ? `?${params}` : "";
    router.push(`${pathname}${query}`);
  };

  return {
    search,
    clearSearch: () => search(""),
    searchQuery,
    searchResults,
    loading,
  };
};
