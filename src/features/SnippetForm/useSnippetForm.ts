import { FormEvent, useState } from "react";
import { addSnippet } from "..";

const swings = {
  "": "none",
  ">": "4/4 standard",
  ">>": "6/8 tiriba, djaa",
  "<<": "6/8 soli, dunumba",
};

const defaultFormData = {
  title: "Test",
  description: "",
  tags: "4/4, dundun, test",
  swing: "",
  tempo: "",
  signal: "",
  patterns: {
    dundunba: "o-----o-",
    sangban: "",
    kenkeni: "",
    kenkeni2: "",
    bell: "",
  },
};

export const useSnippetForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(defaultFormData);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await addSnippet(formData);
      console.log("res", res);
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (partial: Record<string, unknown>) =>
    setFormData({ ...formData, ...partial });

  return { handleSubmit, loading, swings, formData, updateFormData };
};
