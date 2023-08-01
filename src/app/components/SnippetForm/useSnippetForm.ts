import { FormEvent, useState } from "react";

const swings = {
  "": "none",
  ">": "4/4 standard",
  ">>": "6/8 tiriba, djaa",
  "<<": "6/8 soli, dunumba",
};

export const useSnippetForm = () => {
  const [loading, setLoading] = useState(false);
  const formData = {
    author: "Szdun Dudumba",
    title: "Kudani",
    description: "A modern rhythm composed by Mamady Keita",
    tags: "kudani, 4/4, dundun",
    swing: "",
    signal: "",
    patterns: {
      dundunba: "o-----o-",
      sangban: "---o-o-o--o---o-",
      kenkeni: "oo-x-x--oo--x---",
    },
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/snippet", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      const body = await res.json();
      console.log("res", body);
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return { handleSubmit, loading, swings, formData };
};
