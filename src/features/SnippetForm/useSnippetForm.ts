import { FormEvent, useState } from "react";
import { addSnippet } from "..";

const swings = {
  "": "none",
  ">": "4/4 standard",
  ">>": "6/8 tiriba, djaa",
  "<<": "6/8 soli, dunumba",
};

const defaultFormData = {
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

export const useSnippetForm = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(defaultFormData);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await addSnippet(formData);
      if (res.ok) {
        setSuccess(true);
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

  return {
    handleSubmit,
    loading,
    errors,
    success,
    swings,
    formData,
    updateFormData,
  };
};
