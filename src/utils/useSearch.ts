import { SnippetCard, getSnippets } from "@/features/SnippetApi";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [term, setTerm] = useState(searchQuery);
  const [searchResults, setSearchResults] = useState<SnippetCard[] | null>();

  useEffect(() => {
    setTerm(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    if (!term) {
      setSearchResults(null);
    } else if (term && term.length > 2) {
      const asyncEffect = async () => {
        const snippets = await getSnippets(term, { limit: 50 });
        setSearchResults(snippets || []);
      };
      asyncEffect();
    }
  }, [term]);

  const search = (newTerm?: string) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    const _term = typeof newTerm === "undefined" ? term : newTerm;

    if (!_term) {
      params.delete("search");
    } else {
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
  };
};
