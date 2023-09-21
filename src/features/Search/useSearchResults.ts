"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearch } from "@/features";
import { SnippetCard, getSnippets } from "@/features/SnippetApi";

export const useSearchResults = () => {
  const router = useRouter();
  const { clearSearch, searchQuery } = useSearch();
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState<SnippetCard[] | null>();

  useEffect(() => {
    if (searchQuery.length < 3) {
      document.body.classList.remove("overflow-y-hidden");
      setSearchResults(null);
      clearSearch();
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
        const snippets = await getSnippets(searchQuery.toLowerCase(), {
          limit: 50,
        });
        setSearchResults(snippets || []);
        setLoading(false);
      };

      setLoading(true);
      document.body.classList.add("overflow-y-hidden");
      asyncEffect();
    }
  }, [searchQuery]);

  return {
    searchResults,
    loading,
  };
};
