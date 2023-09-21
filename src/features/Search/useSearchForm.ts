import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useSearch } from "@/features";
import { useGrooves } from "../Layout/GroovyContext";

export const useSearchForm = () => {
  const { search, searchQuery } = useSearch();

  const { cards } = useGrooves();

  const [term, setTerm] = useState(searchQuery.length > 2 ? searchQuery : "");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (term?.length > 1) {
      const newSuggestions = [
        ...new Set(
          cards.flatMap((card) => card.tags).filter((tag) => tag.includes(term))
        ),
      ].sort(byIndexOf(term));
      setSuggestions(newSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [term]);

  const submitSearch = (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    search(term);
  };

  return { suggestions, term, setTerm, submitSearch, search };
};

const byIndexOf = (term: string) => (s1: string, s2: string) => {
  const idx1 = s1.indexOf(term);
  const idx2 = s2.indexOf(term);
  if (idx1 > idx2) {
    return 1;
  } else if (idx1 === idx2) {
    return s1 > s2 ? 1 : -1;
  }
  return -1;
};
