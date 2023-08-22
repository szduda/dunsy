import { FormEvent, useState } from "react";
import { addSnippet } from "..";
import { Snippet } from "./types";

const swings = {
  "": "none",
  ">": "4/4",
  ">>": "6/8 tiriba, djaa",
  "<<": "6/8 soli, dunumba",
};

const defaultFormData: Snippet = {
  title: "",
  description: "",
  tags: "",
  swing: "",
  tempo: "",
  signal: "",
  patterns: {
    dundunba: "",
    sangban: "",
    kenkeni: "",
    kenkeni2: "",
    bell: "",
  },
};

export type FormData = typeof defaultFormData;

export const useSnippetForm = (initialData: Partial<FormData> = {}) => {
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    ...defaultFormData,
    ...initialData,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await addSnippet(formData);
      if (res.ok) {
        setSuccess(true);
        setErrors([]);
      } else {
        setErrors(res.messages);
      }
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (partial: Record<string, unknown>) =>
    setFormData({ ...formData, ...partial });

  const resetForm = () => {
    setFormData(defaultFormData);
    setLoading(false);
    setSuccess(false);
    setErrors([]);
  };

  return {
    handleSubmit,
    loading,
    errors,
    success,
    swings,
    formData,
    updateFormData,
    resetForm,
  };
};
