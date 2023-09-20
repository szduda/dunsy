"use client";

import { SnippetCard, getSnippets } from "@/features/SnippetApi";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [term, setTerm] = useState(searchQuery);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState<SnippetCard[] | null>();

  useEffect(() => {}, [searchQuery]);

  useEffect(() => {
    setTerm(searchQuery);
    if (searchQuery.length < 3) {
      search("");
    }
    document.body.classList.toggle("overflow-y-hidden", searchQuery.length > 2);
  }, [searchQuery]);

  useEffect(() => {
    if (!term) {
      setSearchResults(null);
    } else {
      const asyncEffect = async () => {
        const snippets = await getSnippets(term, { limit: 50 });
        setSearchResults(snippets || []);
        setLoading(false);
      };
      setLoading(true);
      asyncEffect();
    }
  }, [term]);

  const search = (newTerm?: string) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    const _term = typeof newTerm === "undefined" ? term : newTerm;

    if (!_term) {
      params.delete("search");
    } else if (_term.length > 2) {
      params.set("search", _term);
    }

    const query = params ? `?${params}` : "";
    router.push(`${pathname}${query}`);
  };

  return {
    search,
    clearSearch: () => search(""),
    searchQuery,
    searchResults,
    term,
    setTerm,
    loading,
  };
};
